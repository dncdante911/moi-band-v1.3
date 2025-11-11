<?php
/**
 * Модернизированная страница чата
 * Версия 2.0 - Полное переписывание
 */

// Конфигурация и подключения
$page_css = '/assets/css/chat.css';
$page_title = 'Power Metal Chat';
$page_js = '/assets/js/chat-v2.js';

require_once __DIR__ . '/../include_config/config.php';
require_once __DIR__ . '/../include_config/db_connect.php';
require_once __DIR__ . '/../include_config/Auth.php';

// Инициализация аутентификации
$auth = new Auth($pdo);

// Проверка авторизации
if (!$auth->isLoggedIn()) {
    header('Location: /pages/auth/login.php');
    exit;
}

// Получение данных пользователя
$currentUser = $auth->getCurrentUser();
$roomSlug = filter_input(INPUT_GET, 'room', FILTER_SANITIZE_STRING) ?: 'general';

// Загрузка текущей комнаты
try {
    $roomStmt = $pdo->prepare("
        SELECT id, name, slug, description, icon, is_private 
        FROM Rooms 
        WHERE slug = :slug 
        LIMIT 1
    ");
    $roomStmt->execute(['slug' => $roomSlug]);
    $currentRoom = $roomStmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$currentRoom) {
        header('Location: /pages/chat.php?room=general');
        exit;
    }
} catch (PDOException $e) {
    error_log("Chat room error: " . $e->getMessage());
    die("Ошибка загрузки комнаты");
}

// Загрузка всех доступных комнат
try {
    $roomsStmt = $pdo->query("
        SELECT id, name, slug, icon, description 
        FROM Rooms 
        WHERE is_private = 0 
        ORDER BY name ASC
    ");
    $availableRooms = $roomsStmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    error_log("Rooms list error: " . $e->getMessage());
    $availableRooms = [];
}

// Загрузка начальных сообщений
try {
    $messagesStmt = $pdo->prepare("
        SELECT 
            rm.id,
            rm.user_id,
            rm.message,
            rm.created_at,
            rm.is_edited,
            u.username,
            u.display_name,
            u.avatar_path,
            u.status
        FROM RoomMessages rm
        INNER JOIN Users u ON rm.user_id = u.id
        WHERE rm.room_id = :room_id 
            AND rm.is_deleted = 0
        ORDER BY rm.created_at DESC
        LIMIT 50
    ");
    $messagesStmt->execute(['room_id' => $currentRoom['id']]);
    $initialMessages = array_reverse($messagesStmt->fetchAll(PDO::FETCH_ASSOC));
} catch (PDOException $e) {
    error_log("Messages load error: " . $e->getMessage());
    $initialMessages = [];
}

// Подключение header
require_once '../include_config/header.php';
?>

<!-- Основной контейнер чата -->
<div class="container chat-container" data-user-id="<?= htmlspecialchars($currentUser['id']) ?>">
    <div class="chat-wrapper">
        
        <!-- Боковая панель с комнатами -->
        <aside class="chat-sidebar" id="roomsSidebar">
            <div class="sidebar-header">
                <h3>💬 Комнаты чата</h3>
                <button class="sidebar-toggle" id="sidebarToggle" aria-label="Скрыть панель">
                    <span>◀</span>
                </button>
            </div>
            
            <div class="rooms-list" id="roomsList">
                <?php foreach ($availableRooms as $room): ?>
                    <a href="?room=<?= htmlspecialchars($room['slug']) ?>" 
                       class="room-link <?= ($room['id'] === $currentRoom['id']) ? 'active' : '' ?>"
                       data-room-id="<?= htmlspecialchars($room['id']) ?>"
                       data-room-slug="<?= htmlspecialchars($room['slug']) ?>">
                        <span class="room-icon"><?= htmlspecialchars($room['icon'] ?? '💬') ?></span>
                        <div class="room-info">
                            <span class="room-name"><?= htmlspecialchars($room['name']) ?></span>
                            <?php if ($room['description']): ?>
                                <span class="room-desc"><?= htmlspecialchars(mb_substr($room['description'], 0, 50)) ?></span>
                            <?php endif; ?>
                        </div>
                        <span class="room-unread" id="unread-<?= $room['id'] ?>" style="display: none;">0</span>
                    </a>
                <?php endforeach; ?>
            </div>
            
            <div class="sidebar-footer">
                <button class="btn-create-room" id="createRoomBtn" style="display: none;">
                    ➕ Создать комнату
                </button>
            </div>
        </aside>
        
        <!-- Основная область чата -->
        <main class="chat-main">
            <!-- Заголовок чата -->
            <header class="chat-header">
                <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Меню">
                    ☰
                </button>
                <div class="room-title">
                    <h2>
                        <span class="room-icon"><?= htmlspecialchars($currentRoom['icon'] ?? '🎸') ?></span>
                        <?= htmlspecialchars($currentRoom['name']) ?>
                    </h2>
                    <?php if ($currentRoom['description']): ?>
                        <p class="room-description"><?= htmlspecialchars($currentRoom['description']) ?></p>
                    <?php endif; ?>
                </div>
                <div class="header-actions">
                    <button class="btn-room-info" id="roomInfoBtn" aria-label="Информация о комнате">
                        ℹ️
                    </button>
                    <button class="btn-search" id="searchBtn" aria-label="Поиск">
                        🔍
                    </button>
                </div>
            </header>
            
            <!-- Контейнер сообщений -->
            <div class="chat-messages" id="messagesContainer" 
                 data-room-id="<?= htmlspecialchars($currentRoom['id']) ?>"
                 data-room-slug="<?= htmlspecialchars($currentRoom['slug']) ?>">
                
                <!-- Индикатор загрузки -->
                <div class="loading-indicator" id="loadingIndicator" style="display: none;">
                    <div class="spinner"></div>
                    <span>Загрузка сообщений...</span>
                </div>
                
                <!-- Сообщения будут здесь -->
                <div class="messages-wrapper" id="messagesWrapper">
                    <?php foreach ($initialMessages as $msg): ?>
                        <?php 
                            $displayName = $msg['display_name'] ?: $msg['username'];
                            $avatarLetter = mb_strtoupper(mb_substr($displayName, 0, 1));
                            $messageTime = date('H:i', strtotime($msg['created_at']));
                            $messageDate = date('d.m.Y', strtotime($msg['created_at']));
                        ?>
                        <div class="message <?= ($msg['user_id'] == $currentUser['id']) ? 'own-message' : '' ?>" 
                             data-message-id="<?= $msg['id'] ?>"
                             data-user-id="<?= $msg['user_id'] ?>">
                            
                            <div class="message-avatar">
                                <?php if ($msg['avatar_path']): ?>
                                    <img src="<?= htmlspecialchars($msg['avatar_path']) ?>" 
                                         alt="<?= htmlspecialchars($displayName) ?>"
                                         loading="lazy"
                                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                    <div class="avatar-placeholder" style="display:none;"><?= $avatarLetter ?></div>
                                <?php else: ?>
                                    <div class="avatar-placeholder"><?= $avatarLetter ?></div>
                                <?php endif; ?>
                                <span class="user-status-dot status-<?= htmlspecialchars($msg['status']) ?>"></span>
                            </div>
                            
                            <div class="message-content">
                                <div class="message-header">
                                    <span class="username"><?= htmlspecialchars($displayName) ?></span>
                                    <span class="timestamp" 
                                          title="<?= $messageDate ?> <?= $messageTime ?>"
                                          data-timestamp="<?= $msg['created_at'] ?>">
                                        <?= $messageTime ?>
                                    </span>
                                    <?php if ($msg['is_edited']): ?>
                                        <span class="edited-badge" title="Сообщение отредактировано">✏️</span>
                                    <?php endif; ?>
                                </div>
                                <div class="message-text"><?= nl2br(htmlspecialchars($msg['message'])) ?></div>
                                
                                <?php if ($msg['user_id'] == $currentUser['id']): ?>
                                <div class="message-actions">
                                    <button class="btn-edit-msg" data-msg-id="<?= $msg['id'] ?>" title="Редактировать">
                                        ✏️
                                    </button>
                                    <button class="btn-delete-msg" data-msg-id="<?= $msg['id'] ?>" title="Удалить">
                                        🗑️
                                    </button>
                                </div>
                                <?php endif; ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
                
                <!-- Индикатор "печатает" -->
                <div class="typing-indicator" id="typingIndicator" style="display: none;">
                    <span class="typing-dots">
                        <span></span><span></span><span></span>
                    </span>
                    <span class="typing-users" id="typingUsers"></span>
                </div>
            </div>
            
            <!-- Форма отправки сообщения -->
            <div class="chat-input-area">
                <form class="message-form" id="messageForm">
                    <div class="input-actions">
                        <button type="button" class="btn-emoji" id="emojiBtn" title="Эмодзи">
                            😊
                        </button>
                        <button type="button" class="btn-attach" id="attachBtn" title="Прикрепить файл">
                            📎
                        </button>
                    </div>
                    
                    <div class="input-wrapper">
                        <textarea 
                            class="message-input" 
                            id="messageInput"
                            placeholder="Введите сообщение... (Enter для отправки, Shift+Enter для новой строки)"
                            rows="1"
                            maxlength="5000"
                            required
                            autocomplete="off"></textarea>
                        <span class="char-counter" id="charCounter">0/5000</span>
                    </div>
                    
                    <button type="submit" class="send-button" id="sendButton" title="Отправить">
                        <span class="send-icon">📤</span>
                        <span class="send-text">Отправить</span>
                    </button>
                </form>
            </div>
        </main>
        
        <!-- Панель онлайн пользователей -->
        <aside class="chat-users" id="usersPanel">
            <div class="users-header">
                <h3>👥 Онлайн</h3>
                <span class="online-count" id="onlineCount">0</span>
            </div>
            
            <div class="users-list" id="usersContainer">
                <!-- Пользователи будут загружены через API -->
                <div class="loading-users">
                    <span>Загрузка...</span>
                </div>
            </div>
            
            <div class="users-footer">
                <button class="btn-invite" id="inviteBtn" style="display: none;">
                    Пригласить
                </button>
            </div>
        </aside>
    </div>
</div>

<!-- Модальные окна -->
<div class="modal" id="editMessageModal" style="display: none;">
    <div class="modal-content">
        <div class="modal-header">
            <h3>Редактировать сообщение</h3>
            <button class="modal-close" id="closeEditModal">✖</button>
        </div>
        <div class="modal-body">
            <textarea id="editMessageText" class="edit-textarea" rows="4"></textarea>
        </div>
        <div class="modal-footer">
            <button class="btn-cancel" id="cancelEdit">Отмена</button>
            <button class="btn-save" id="saveEdit">Сохранить</button>
        </div>
    </div>
</div>

<!-- Скрипт инициализации -->
<script>
// Передача начальных данных в JavaScript
window.ChatConfig = {
    currentUser: {
        id: <?= json_encode($currentUser['id']) ?>,
        username: <?= json_encode($currentUser['username']) ?>,
        isAdmin: <?= json_encode($currentUser['is_admin'] ?? false) ?>
    },
    currentRoom: {
        id: <?= json_encode($currentRoom['id']) ?>,
        slug: <?= json_encode($currentRoom['slug']) ?>,
        name: <?= json_encode($currentRoom['name']) ?>
    },
    apiEndpoints: {
        messages: '/api/chat/messages-v2.php',
        send: '/api/chat/send-v2.php',
        edit: '/api/chat/edit-v2.php',
        delete: '/api/chat/delete-v2.php',
        online: '/api/user/online-v2.php',
        typing: '/api/chat/typing-v2.php',
        rooms: '/api/chat/rooms-v2.php'
    },
    settings: {
        pollInterval: 2000,
        typingTimeout: 3000,
        maxMessageLength: 5000,
        reconnectDelay: 5000
    }
};
</script>

<?php require_once '../include_config/footer.php'; ?>