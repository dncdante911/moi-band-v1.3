<?php
/**
 * Класс для стандартизации API ответов
 */
class APIResponse {

    /**
     * Успешный ответ
     */
    public static function success($data = [], $message = 'Success', $code = 200) {
        http_response_code($code);
        header('Content-Type: application/json; charset=utf-8');

        echo json_encode([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

        exit;
    }

    /**
     * Ответ с ошибкой
     */
    public static function error($message = 'Error', $code = 400, $details = null) {
        http_response_code($code);
        header('Content-Type: application/json; charset=utf-8');

        $response = [
            'success' => false,
            'error' => $message
        ];

        if ($details !== null && DEBUG_MODE) {
            $response['details'] = $details;
        }

        echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

        exit;
    }
}
