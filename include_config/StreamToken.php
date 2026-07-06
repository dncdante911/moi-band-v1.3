<?php
/**
 * Файл: include_config/StreamToken.php
 *
 * Подписанные, ограниченные по времени ссылки на стриминг трека.
 *
 * Раньше плеер получал сырой путь к файлу (fullAudioPath) и подставлял
 * его напрямую в audio.src. Такую ссылку можно было один раз скопировать
 * (например из вкладки Network) и потом пользоваться ей бесконечно —
 * скачивать трек напрямую или расшарить как постоянную прямую ссылку,
 * в обход сайта.
 *
 * Теперь вместо сырого пути отдаётся URL вида
 *   /api/player/stream.php?id=ID&expires=UNIX_TS&token=HMAC
 * Токен — HMAC-SHA256 от "ID:expires" на секрете JWT_SECRET из .env.
 * Ссылка перестаёт работать после истечения expires — украденная или
 * зашаренная ссылка "протухнет" сама, обычно в течение часа.
 *
 * Это НЕ делает скачивание трека физически невозможным — то, что играет
 * в браузере, всегда можно перехватить (запись экрана/звука, самая
 * грубая атака). Но это устраняет самый простой и массовый способ —
 * скопировать статичный URL и качать/шарить его когда угодно.
 */

if (!function_exists('stream_token_secret')) {
    function stream_token_secret() {
        $secret = get_env('JWT_SECRET');
        if (empty($secret) || $secret === 'change_me') {
            // Не должно происходить в правильно настроенном .env, но не
            // даём треку остаться вообще без подписи — используем что-то
            // отличное от пустой строки, чтобы hash_hmac не выродился.
            $secret = 'insecure-fallback-set-JWT_SECRET-in-env';
        }
        return $secret;
    }
}

// 4 часа — с запасом на долгую прослушку альбома и на то, что ссылка на
// странице сгенерирована при загрузке (SSR), а трек может быть запущен
// далеко не сразу. При этом это НЕ постоянная ссылка — через 4 часа
// скопированный/расшаренный URL перестанет работать.
const STREAM_TOKEN_DEFAULT_TTL = 14400;

if (!function_exists('generate_stream_token')) {
    /**
     * @return array{expires:int, token:string}
     */
    function generate_stream_token($trackId, $ttlSeconds = STREAM_TOKEN_DEFAULT_TTL) {
        $expires = time() + $ttlSeconds;
        $token   = hash_hmac('sha256', $trackId . ':' . $expires, stream_token_secret());
        return ['expires' => $expires, 'token' => $token];
    }
}

if (!function_exists('build_stream_url')) {
    function build_stream_url($trackId, $ttlSeconds = STREAM_TOKEN_DEFAULT_TTL) {
        $t = generate_stream_token($trackId, $ttlSeconds);
        return '/api/player/stream.php?id=' . (int)$trackId . '&expires=' . $t['expires'] . '&token=' . $t['token'];
    }
}

if (!function_exists('verify_stream_token')) {
    function verify_stream_token($trackId, $expires, $token) {
        if (empty($token) || empty($expires)) return false;
        $expires = (int)$expires;
        if ($expires < time()) return false;

        $expected = hash_hmac('sha256', $trackId . ':' . $expires, stream_token_secret());
        return hash_equals($expected, (string)$token);
    }
}
