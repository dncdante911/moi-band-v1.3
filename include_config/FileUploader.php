<?php
/**
 * Файл: include_config/FileUploader.php
 * НОВЫЙ КЛАСС - Безопасная загрузка файлов
 * 
 * Использование:
 * $uploader = new FileUploader('album_covers');
 * $result = $uploader->upload($_FILES['cover'], 'image');
 */

class FileUploader {
    private $upload_dir;
    private $allowed_types = [];
    private $max_size = 0;
    private $errors = [];
    
    // MIME типы для различных категорий
    private static $mime_types = [
        'image' => [
            'image/jpeg' => 'jpg',
            'image/png' => 'png',
            'image/webp' => 'webp',
            'image/gif' => 'gif'
        ],
        'audio' => [
            'audio/mpeg' => 'mp3',
            'audio/wav' => 'wav',
            'audio/flac' => 'flac',
            'audio/ogg' => 'ogg'
        ],
        'video' => [
            'video/mp4' => 'mp4',
            'video/webm' => 'webm',
            'video/quicktime' => 'mov'
        ],
        'document' => [
            'text/plain' => 'txt',
            'application/pdf' => 'pdf'
        ]
    ];
    
    public function __construct($subfolder, $type = 'image') {
        $this->upload_dir = UPLOAD_PATH . '/' . preg_replace('/[^a-z0-9_-]/i', '', $subfolder);
        
        // Устанавливаем параметры в зависимости от типа
        switch($type) {
            case 'image':
                $this->allowed_types = self::$mime_types['image'];
                $this->max_size = MAX_IMAGE_SIZE;
                break;
            case 'audio':
                $this->allowed_types = self::$mime_types['audio'];
                $this->max_size = MAX_AUDIO_SIZE;
                break;
            case 'video':
                $this->allowed_types = self::$mime_types['video'];
                $this->max_size = MAX_VIDEO_SIZE;
                break;
            default:
                $this->allowed_types = self::$mime_types['image'];
                $this->max_size = MAX_IMAGE_SIZE;
        }
        
        // Создаем директорию если ее нет
        if (!is_dir($this->upload_dir)) {
            @mkdir($this->upload_dir, 0755, true);
        }
    }
    
    /**
     * Загружает файл с полной валидацией
     * 
     * @param array $file - $_FILES['field']
     * @return array - ['success' => bool, 'path' => string, 'error' => string]
     */
    public function upload($file) {
        $this->errors = [];
        
        // ========== ПРОВЕРКА 1: Был ли загружен файл ==========
        if (empty($file['name']) || $file['error'] !== UPLOAD_ERR_OK) {
            return $this->error('Файл не был загружен или произошла ошибка загрузки');
        }
        
        // ========== ПРОВЕРКА 2: Размер файла ==========
        if ($file['size'] > $this->max_size) {
            $max_mb = round($this->max_size / (1024 * 1024), 2);
            return $this->error("Файл слишком большой. Максимум: $max_mb MB");
        }
        
        if ($file['size'] === 0) {
            return $this->error('Файл пуст');
        }
        
        // ========== ПРОВЕРКА 3: MIME тип (из функции finfo) ==========
        $mime_type = mime_content_type($file['tmp_name']);
        
        if (!isset($this->allowed_types[$mime_type])) {
            write_log("Попытка загрузки файла с недопустимым MIME типом: $mime_type", 'warning');
            return $this->error('Недопустимый тип файла');
        }
        
        // ========== ПРОВЕРКА 4: Расширение файла ==========
        $original_ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        $safe_ext = $this->allowed_types[$mime_type];
        
        // Убеждаемся, что расширение соответствует MIME типу
        if ($original_ext !== $safe_ext && !in_array($original_ext, [$safe_ext])) {
            // Используем безопасное расширение из MIME типа
            write_log("Исправлено расширение файла: $original_ext -> $safe_ext", 'info');
        }
        
        // ========== ПРОВЕРКА 5: Дополнительная проверка изображений ==========
        if (strpos($mime_type, 'image/') === 0) {
            if (@getimagesize($file['tmp_name']) === false) {
                return $this->error('Поврежденное изображение');
            }
        }
        
        // ========== ГЕНЕРИРУЕМ БЕЗОПАСНОЕ ИМЯ ФАЙЛА ==========
        // Используем hash для предотвращения коллизий
        $filename_hash = hash('sha256', uniqid() . time() . $file['tmp_name']);
        $new_filename = substr($filename_hash, 0, 16) . '.' . $safe_ext;
        $new_path = $this->upload_dir . '/' . $new_filename;
        $public_path = '/public/uploads/' . basename($this->upload_dir) . '/' . $new_filename;
        
        // ========== ПЕРЕМЕЩАЕМ ФАЙЛ ==========
        if (!move_uploaded_file($file['tmp_name'], $new_path)) {
            write_log("Не удалось переместить файл: {$file['tmp_name']} -> $new_path", 'error');
            return $this->error('Ошибка при сохранении файла на сервер');
        }
        
        // ========== УСТАНАВЛИВАЕМ ПРАВИЛЬНЫЕ ПРАВА ДОСТУПА ==========
        @chmod($new_path, 0644);
        
        write_log("Файл успешно загружен: $public_path", 'info');
        
        return [
            'success' => true,
            'path' => $public_path,
            'filename' => $new_filename,
            'mime_type' => $mime_type,
            'size' => $file['size']
        ];
    }
    
    /**
     * Возвращает ошибку в стандартном формате
     */
    private function error($message) {
        write_log("Ошибка загрузки файла: $message", 'warning');
        return [
            'success' => false,
            'path' => null,
            'error' => $message
        ];
    }
    
    /**
     * Получить список ошибок
     */
    public function getErrors() {
        return $this->errors;
    }
    
    /**
     * Удалить файл
     */
    public static function delete($file_path) {
        $full_path = $_SERVER['DOCUMENT_ROOT'] . $file_path;
        
        // Санитизируем путь - только файлы из uploads
        if (strpos(realpath($full_path), realpath(UPLOAD_PATH)) !== 0) {
            write_log("Попытка удалить файл вне директории uploads: $file_path", 'error');
            return false;
        }
        
        if (file_exists($full_path) && is_file($full_path)) {
            if (@unlink($full_path)) {
                write_log("Файл удален: $file_path", 'info');
                return true;
            }
        }
        
        return false;
    }
}

// ============================================
// УТИЛИТА: Определение MIME типа
// ============================================

if (!function_exists('mime_content_type')) {
    function mime_content_type($file) {
        // Используем fileinfo если доступно
        if (function_exists('finfo_file')) {
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mime = finfo_file($finfo, $file);
            finfo_close($finfo);
            return $mime;
        }
        
        // Fallback для старых версий PHP
        $mime_types = [
            'txt' => 'text/plain',
            'htm' => 'text/html',
            'html' => 'text/html',
            'php' => 'text/html',
            'css' => 'text/css',
            'js' => 'application/javascript',
            'json' => 'application/json',
            'xml' => 'application/xml',
            'swf' => 'application/x-shockwave-flash',
            'flv' => 'video/x-flv',
            'png' => 'image/png',
            'jpe' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'jpg' => 'image/jpeg',
            'gif' => 'image/gif',
            'bmp' => 'image/bmp',
            'webp' => 'image/webp',
            'ico' => 'image/vnd.microsoft.icon',
            'tiff' => 'image/tiff',
            'tif' => 'image/tiff',
            'svg' => 'image/svg+xml',
            'svgz' => 'image/svg+xml',
            'zip' => 'application/zip',
            'rar' => 'application/x-rar-compressed',
            'msi' => 'application/x-msdownload',
            'cab' => 'application/vnd.ms-cab-compressed',
            'mp3' => 'audio/mpeg',
            'wav' => 'audio/wav',
            'flac' => 'audio/flac',
            'ogg' => 'audio/ogg',
            'm4a' => 'audio/mp4',
            'mp4' => 'video/mp4',
            'webm' => 'video/webm',
            'mov' => 'video/quicktime'
        ];
        
        $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        return $mime_types[$ext] ?? 'application/octet-stream';
    }
}

?>