<?php
/**
 * Файл: include_config/AudioDuration.php
 * Вычисление длительности аудиофайла (MP3/WAV) в секундах.
 * Используется при загрузке и редактировании трека (admin/add_track.php, admin/edit_track.php).
 */

if (!function_exists('calculateAudioDuration')) {

function calculateAudioDuration($filePath) {
    if (!file_exists($filePath)) {
        return 0;
    }

    $fileSize = @filesize($filePath);
    if ($fileSize < 1000) {
        return 0;
    }

    // Попытка 1: ffprobe (самый надёжный способ, если установлен на сервере)
    if (function_exists('shell_exec') && @shell_exec('which ffprobe') !== null) {
        $cmd = "ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 " . escapeshellarg($filePath) . " 2>/dev/null";
        $output = @shell_exec($cmd);

        if ($output) {
            $duration = (int)floatval(trim($output));
            if ($duration > 0) {
                return $duration;
            }
        }
    }

    // Попытка 2: ffmpeg
    if (function_exists('shell_exec') && @shell_exec('which ffmpeg') !== null) {
        $cmd = "ffmpeg -i " . escapeshellarg($filePath) . " 2>&1 | grep Duration 2>/dev/null";
        $output = @shell_exec($cmd);

        if ($output && preg_match('/Duration: (\d+):(\d+):(\d+)/', $output, $matches)) {
            $duration = ((int)$matches[1]) * 3600 + ((int)$matches[2]) * 60 + (int)$matches[3];
            if ($duration > 0) {
                return $duration;
            }
        }
    }

    $ext = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));

    if ($ext === 'mp3') {
        $duration = extractMP3Duration($filePath);
        if ($duration > 0) return $duration;
    }

    if ($ext === 'wav') {
        $duration = extractWAVDuration($filePath);
        if ($duration > 0) return $duration;
    }

    return 0;
}

/**
 * Парсер WAV — читает реальную структуру RIFF-чанков вместо того, чтобы
 * предполагать фиксированный 44-байтный заголовок (что ломается на файлах
 * с доп. чанками LIST/bext/fact из Audacity/Reaper/FL Studio и т.п.).
 */
function extractWAVDuration($filePath) {
    $fp = @fopen($filePath, 'rb');
    if (!$fp) return 0;

    $riffHeader = @fread($fp, 12);
    if (strlen($riffHeader) < 12 || substr($riffHeader, 0, 4) !== 'RIFF' || substr($riffHeader, 8, 4) !== 'WAVE') {
        fclose($fp);
        return 0;
    }

    $sampleRate = 0;
    $channels = 0;
    $bitsPerSample = 0;
    $dataSize = 0;
    $fileSize = @filesize($filePath);

    while (!feof($fp)) {
        $chunkHeader = @fread($fp, 8);
        if (strlen($chunkHeader) < 8) break;

        $chunkId   = substr($chunkHeader, 0, 4);
        $chunkSize = unpack('V', substr($chunkHeader, 4, 4))[1];

        if ($chunkId === 'fmt ') {
            $fmtData = @fread($fp, $chunkSize);
            if (strlen($fmtData) < 16) break;
            $channels      = unpack('v', substr($fmtData, 2, 2))[1];
            $sampleRate    = unpack('V', substr($fmtData, 4, 4))[1];
            $bitsPerSample = unpack('v', substr($fmtData, 14, 2))[1];
            if ($chunkSize % 2 === 1) @fseek($fp, 1, SEEK_CUR);
        } elseif ($chunkId === 'data') {
            $pos = ftell($fp);
            // Некоторые энкодеры (потоковая запись) пишут 0 или 0xFFFFFFFF
            // в размер data-чанка, т.к. не знали итоговый размер заранее —
            // в этом случае берём фактический остаток файла.
            if ($chunkSize === 0 || $chunkSize === 0xFFFFFFFF || $pos + $chunkSize > $fileSize) {
                $dataSize = $fileSize - $pos;
            } else {
                $dataSize = $chunkSize;
            }
            break;
        } else {
            @fseek($fp, $chunkSize + ($chunkSize % 2), SEEK_CUR);
        }
    }

    fclose($fp);

    if ($sampleRate <= 0 || $channels <= 0 || $bitsPerSample <= 0 || $dataSize <= 0) {
        return 0;
    }

    $byteRate = $channels * $sampleRate * $bitsPerSample / 8;
    if ($byteRate <= 0) return 0;

    return (int)($dataSize / $byteRate);
}

/**
 * Парсер MP3. Сначала пытается прочитать Xing/Info или VBRI заголовок
 * (пишется энкодерами в VBR-файлы и содержит точное число фреймов) —
 * без этого длительность VBR-файлов, посчитанная по битрейту первого
 * фрейма, была бы сильно неверной. Если заголовка нет (CBR) — считает
 * средний битрейт по нескольким фреймам.
 */
function extractMP3Duration($filePath) {
    $fp = @fopen($filePath, 'rb');
    if (!$fp) return 0;

    $header = @fread($fp, 10);
    $offset = 0;
    if ($header && substr($header, 0, 3) === 'ID3') {
        $size = ((ord($header[6]) & 0x7F) << 21) | ((ord($header[7]) & 0x7F) << 14) |
                ((ord($header[8]) & 0x7F) << 7) | (ord($header[9]) & 0x7F);
        $offset = $size + 10;
    }
    @fseek($fp, $offset, SEEK_SET);

    $data = @fread($fp, 200000);
    @fclose($fp);
    if (!$data) return 0;

    $pos = 0;
    $len = strlen($data);

    while ($pos < $len - 4) {
        if (ord($data[$pos]) !== 0xFF || (ord($data[$pos + 1]) & 0xE0) !== 0xE0) {
            $pos++;
            continue;
        }

        $byte1 = ord($data[$pos + 1]);
        $byte2 = ord($data[$pos + 2]);

        $versionBits = ($byte1 >> 3) & 0x03; // 00=2.5, 10=2, 11=1
        if ($versionBits === 1) { $pos++; continue; } // reserved

        $layerBits = ($byte1 >> 1) & 0x03;
        if ($layerBits !== 1) { $pos++; continue; } // мы поддерживаем только Layer III

        $bitrateIdx = ($byte2 >> 4) & 0x0F;
        $sampleRateIdx = ($byte2 >> 2) & 0x03;
        if ($bitrateIdx === 0 || $bitrateIdx === 15 || $sampleRateIdx === 3) { $pos++; continue; }

        $isMpeg1 = $versionBits === 3;
        $bitrates = $isMpeg1
            ? [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, -1]
            : [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, -1];
        $sampleRates = $isMpeg1 ? [44100, 48000, 32000] : [22050, 24000, 16000];
        if ($versionBits === 0) { // MPEG 2.5
            $sampleRates = [11025, 12000, 8000];
        }

        $bitrate = $bitrates[$bitrateIdx] * 1000;
        $sampleRate = $sampleRates[$sampleRateIdx];
        if ($bitrate <= 0 || $sampleRate <= 0) { $pos++; continue; }

        $channelMode = ($byte2 >> 6) & 0x03; // 3 = mono
        $padding = ($byte2 >> 1) & 0x01;
        $samplesPerFrame = $isMpeg1 ? 1152 : 576;
        $frameSize = (int)(($samplesPerFrame / 8) * $bitrate / $sampleRate) + $padding;
        if ($frameSize <= 4) { $pos++; continue; }

        // Ищем Xing/Info/VBRI заголовок внутри этого фрейма — если он там есть,
        // в нём указано точное количество фреймов (актуально для VBR).
        $sideInfoSize = $isMpeg1 ? ($channelMode === 3 ? 17 : 32) : ($channelMode === 3 ? 9 : 17);
        $vbrHeaderOffset = $pos + 4 + $sideInfoSize;

        if ($vbrHeaderOffset + 8 < $len) {
            $tag = substr($data, $vbrHeaderOffset, 4);
            if ($tag === 'Xing' || $tag === 'Info') {
                $flags = unpack('N', substr($data, $vbrHeaderOffset + 4, 4))[1];
                if ($flags & 0x01) {
                    $frames = unpack('N', substr($data, $vbrHeaderOffset + 8, 4))[1];
                    if ($frames > 0) {
                        $duration = (int)(($frames * $samplesPerFrame) / $sampleRate);
                        if ($duration > 0) return $duration;
                    }
                }
            }
        }

        $vbriOffset = $pos + 4 + 32;
        if ($vbriOffset + 26 < $len && substr($data, $vbriOffset, 4) === 'VBRI') {
            $frames = unpack('N', substr($data, $vbriOffset + 14, 4))[1];
            if ($frames > 0) {
                $duration = (int)(($frames * $samplesPerFrame) / $sampleRate);
                if ($duration > 0) return $duration;
            }
        }

        // Ни Xing, ни VBRI — усредняем битрейт по нескольким последующим
        // фреймам вместо того, чтобы доверять только первому (даёт более
        // честную оценку на реальных VBR-файлах без заголовка).
        $bitrateSum = $bitrate;
        $frameCount = 1;
        $scanPos = $pos + $frameSize;
        while ($frameCount < 30 && $scanPos < $len - 4) {
            if (ord($data[$scanPos]) === 0xFF && (ord($data[$scanPos + 1]) & 0xE0) === 0xE0) {
                $b2 = ord($data[$scanPos + 2]);
                $bIdx = ($b2 >> 4) & 0x0F;
                if ($bIdx > 0 && $bIdx < 15) {
                    $br = $bitrates[$bIdx] * 1000;
                    if ($br > 0) {
                        $bitrateSum += $br;
                        $frameCount++;
                        $pad = ($b2 >> 1) & 0x01;
                        $scanPos += (int)(($samplesPerFrame / 8) * $br / $sampleRate) + $pad;
                        continue;
                    }
                }
            }
            break;
        }

        $avgBitrate = $bitrateSum / $frameCount;
        $fileSize = @filesize($filePath);
        $duration = (int)(($fileSize - $pos) * 8 / $avgBitrate);
        return max(0, $duration);
    }

    return 0;
}

}
