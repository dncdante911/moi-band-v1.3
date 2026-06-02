<?php
/**
 * Link preview proxy — fetches og/meta tags from a URL
 */

header('Content-Type: application/json');
header('Cache-Control: max-age=3600');
header('Access-Control-Allow-Origin: *');

$url = isset($_GET['url']) ? trim($_GET['url']) : '';

if (!$url || !filter_var($url, FILTER_VALIDATE_URL)) {
    echo json_encode(['success' => false, 'error' => 'Invalid URL']);
    exit;
}

$scheme = parse_url($url, PHP_URL_SCHEME);
if (!in_array($scheme, ['http', 'https'])) {
    echo json_encode(['success' => false, 'error' => 'Invalid scheme']);
    exit;
}

$context = stream_context_create([
    'http' => [
        'timeout' => 5,
        'user_agent' => 'Mozilla/5.0 (compatible; LinkPreviewBot/1.0)',
        'follow_location' => 1,
        'max_redirects' => 3,
        'ignore_errors' => true,
    ],
    'ssl' => [
        'verify_peer' => false,
        'verify_peer_name' => false,
    ]
]);

$html = @file_get_contents($url, false, $context);

if (!$html) {
    echo json_encode(['success' => false]);
    exit;
}

$html = mb_convert_encoding($html, 'UTF-8', 'auto');

function extractMeta(string $html, string $property): string {
    // og property
    if (preg_match('/<meta[^>]+property=["\']' . preg_quote($property, '/') . '["\'][^>]+content=["\']([^"\']*)["\'][^>]*>/i', $html, $m)) {
        return html_entity_decode(trim($m[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }
    // reversed attribute order
    if (preg_match('/<meta[^>]+content=["\']([^"\']*)["\'][^>]+property=["\']' . preg_quote($property, '/') . '["\'][^>]*>/i', $html, $m)) {
        return html_entity_decode(trim($m[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }
    return '';
}

function extractMetaName(string $html, string $name): string {
    if (preg_match('/<meta[^>]+name=["\']' . preg_quote($name, '/') . '["\'][^>]+content=["\']([^"\']*)["\'][^>]*>/i', $html, $m)) {
        return html_entity_decode(trim($m[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }
    if (preg_match('/<meta[^>]+content=["\']([^"\']*)["\'][^>]+name=["\']' . preg_quote($name, '/') . '["\'][^>]*>/i', $html, $m)) {
        return html_entity_decode(trim($m[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }
    return '';
}

$title = extractMeta($html, 'og:title');
if (!$title && preg_match('/<title[^>]*>(.*?)<\/title>/is', $html, $m)) {
    $title = html_entity_decode(strip_tags($m[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

$description = extractMeta($html, 'og:description') ?: extractMetaName($html, 'description');
$image = extractMeta($html, 'og:image');

// Resolve relative image URLs
if ($image && !preg_match('/^https?:\/\//', $image)) {
    $parts = parse_url($url);
    $base = $parts['scheme'] . '://' . $parts['host'];
    $image = $image[0] === '/' ? $base . $image : $base . '/' . $image;
}

echo json_encode([
    'success' => true,
    'title'       => mb_substr(trim($title), 0, 200),
    'description' => mb_substr(trim($description), 0, 300),
    'image'       => $image,
], JSON_UNESCAPED_UNICODE);
