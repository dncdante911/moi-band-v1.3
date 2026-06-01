# Руководство по переносу сайта на Vite + PHP API

## Структура после миграции

```
moi-band-v1.3/
├── frontend/          ← Vite + Vue 3 SPA (этот репозиторий)
│   ├── src/           ← Исходный код Vue
│   ├── public/        ← Статика (manifest.json, robots.txt)
│   └── package.json
│
├── api/               ← PHP REST API (остаётся без изменений)
├── include_config/    ← PHP хелперы (без изменений)
├── public/            ← Загружаемые файлы (uploads, музыка)
│   └── uploads/
│       ├── full/      ← MP3/WAV/FLAC файлы
│       ├── album_covers/
│       └── gallery/
│
└── public_html/       ← Сюда Vite собирает фронтенд (npm run build)
```

---

## Шаг 1 — Запуск в режиме разработки

### Требования
- PHP 7.4+ с расширениями: pdo_mysql, json, mbstring
- MySQL/MariaDB 10.4+
- Node.js 18+
- Apache/Nginx

### Настройка бэкенда
```bash
# 1. Скопируй .env.example → .env и заполни данные БД
cp .env.example .env
nano .env

# 2. Запусти PHP сервер (для разработки)
php -S localhost:8080 -t /path/to/moi-band-v1.3

# Или настрой Apache/Nginx virtual host на /moi-band-v1.3
```

### Настройка фронтенда
```bash
cd frontend

# 1. Скопируй .env.example → .env
cp .env.example .env
# Укажи URL PHP бэкенда:
echo "VITE_API_BASE_URL=http://localhost:8080" > .env

# 2. Установи зависимости
npm install

# 3. Запусти dev-сервер
npm run dev
# Фронтенд: http://localhost:5173
# API запросы проксируются на http://localhost:8080
```

---

## Шаг 2 — Перенос базы данных

### Вариант A: Перенос на тот же сервер (рекомендуется)

```bash
# Дамп текущей БД
mysqldump -u moi-band -p moi-band > backup_$(date +%Y%m%d).sql

# Восстановление на новом сервере
mysql -u moi-band -p moi-band < backup_$(date +%Y%m%d).sql
```

### Вариант B: Перенос на новый хост

```bash
# 1. Создать БД на новом сервере
mysql -u root -p << EOF
CREATE DATABASE \`moi-band\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'moi-band'@'localhost' IDENTIFIED BY 'ВАШ_НОВЫЙ_ПАРОЛЬ';
GRANT ALL PRIVILEGES ON \`moi-band\`.* TO 'moi-band'@'localhost';
FLUSH PRIVILEGES;
EOF

# 2. Импортировать структуру
mysql -u moi-band -p moi-band < moi-band.sql

# 3. Применить миграции (если есть новые)
mysql -u moi-band -p moi-band < database_migration.sql
mysql -u moi-band -p moi-band < migrations/add_track_reactions.sql
```

### Обновить .env после переноса

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=moi-band
DB_USER=moi-band
DB_PASS=ВАШ_НОВЫЙ_ПАРОЛЬ
DB_CHARSET=utf8mb4
```

### Проверка подключения

```bash
# Проверить что БД работает
php -r "
require 'include_config/config.php';
require 'include_config/db_connect.php';
\$r = \$pdo->query('SELECT COUNT(*) FROM Albums')->fetchColumn();
echo 'Альбомов в БД: ' . \$r . PHP_EOL;
"
```

---

## Шаг 3 — Перенос музыкальных файлов

### Текущее расположение файлов
```
public/uploads/
├── full/           ← Аудиофайлы (MP3, WAV, FLAC)
├── album_covers/   ← Обложки альбомов (JPG, PNG, WebP)
├── gallery/        ← Фотографии галереи
└── videos/         ← Видеоклипы (MP4, WebM)
```

### Перенос через rsync (рекомендуется для больших объёмов)

```bash
# Синхронизация uploads на новый сервер
rsync -avz --progress \
  /path/to/moi-band-v1.3/public/uploads/ \
  user@new-server:/path/to/moi-band-v1.3/public/uploads/

# Или с SSH ключом
rsync -avz -e "ssh -i ~/.ssh/id_rsa" \
  ./public/uploads/ \
  user@new-server:/var/www/moi-band/public/uploads/
```

### Перенос через scp

```bash
scp -r ./public/uploads user@new-server:/var/www/moi-band/public/
```

### После переноса — проверь права
```bash
# На новом сервере
chmod -R 755 /var/www/moi-band/public/uploads/
chown -R www-data:www-data /var/www/moi-band/public/uploads/
```

### Проверка что пути в БД верные

```sql
-- Проверить пути к трекам
SELECT id, title, filePath FROM Track LIMIT 10;

-- Пути должны быть относительными:
-- /public/uploads/full/track_name.mp3
-- НЕ: /var/www/old-server/public/uploads/full/track_name.mp3

-- Исправить абсолютные пути (если нужно)
UPDATE Track 
SET filePath = REPLACE(filePath, '/var/www/old-path/', '/') 
WHERE filePath LIKE '/var/www/old-path/%';

UPDATE Albums 
SET coverImagePath = REPLACE(coverImagePath, '/var/www/old-path/', '/') 
WHERE coverImagePath LIKE '/var/www/old-path/%';
```

---

## Шаг 4 — Продакшн сборка

```bash
cd frontend

# Сборка (результат → /moi-band-v1.3/public_html/)
npm run build

# Проверить результат
ls -la ../public_html/
```

### Настройка Apache для SPA (public_html/.htaccess)

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /

    # API запросы идут к PHP бэкенду (не к фронту)
    RewriteRule ^api/ - [L]

    # Статические файлы отдаются напрямую
    RewriteCond %{REQUEST_FILENAME} -f [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]

    # Всё остальное → index.html (Vue Router)
    RewriteRule ^ index.html [L]
</IfModule>

# Кэш для статики
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/webp "access plus 1 month"
    ExpiresByType audio/mpeg "access plus 1 month"
</IfModule>
```

### Настройка Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/moi-band/public_html;

    # Фронтенд SPA
    location / {
        try_files $uri $uri/ /index.html;
    }

    # PHP API
    location /api/ {
        root /var/www/moi-band;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }

    # Загружаемые файлы (музыка, обложки)
    location /public/uploads/ {
        root /var/www/moi-band;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## Шаг 5 — Полная структура Vite проекта

```
frontend/
├── src/
│   ├── main.js                    ← Точка входа (Vue app)
│   ├── App.vue                    ← Корневой компонент
│   ├── router/
│   │   └── index.js               ← Vue Router (все маршруты)
│   ├── store/
│   │   ├── auth.js                ← Аутентификация (Pinia)
│   │   ├── player.js              ← Музыкальный плеер (Pinia)
│   │   ├── theme.js               ← Тема сайта (Pinia)
│   │   └── toast.js               ← Toast уведомления (Pinia)
│   ├── api/
│   │   └── index.js               ← Все API вызовы (Axios)
│   ├── views/                     ← Страницы (загружаются лениво)
│   │   ├── HomeView.vue
│   │   ├── AlbumsView.vue
│   │   ├── AlbumDetailView.vue
│   │   ├── PlayerView.vue
│   │   ├── AboutView.vue
│   │   ├── NewsView.vue
│   │   ├── NewsDetailView.vue
│   │   ├── GalleryView.vue
│   │   ├── ChatView.vue
│   │   ├── NotFoundView.vue
│   │   └── auth/
│   │       ├── LoginView.vue
│   │       ├── RegisterView.vue
│   │       └── ProfileView.vue
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TheHeader.vue      ← Шапка + меню + переключатель тем
│   │   │   └── TheFooter.vue      ← Подвал
│   │   ├── player/                ← Компоненты плеера
│   │   └── ui/
│   │       └── ToastContainer.vue ← Toast уведомления
│   └── assets/
│       └── css/
│           ├── main.css           ← Основные стили (импортирует остальные)
│           ├── responsive.css
│           ├── header-epic.css
│           ├── auth.css
│           ├── chat.css
│           ├── albums.css
│           └── themes/
│               ├── power-metal/
│               ├── gothic-metal/
│               ├── literary-dark/
│               └── punk-rock/
├── public/
│   ├── manifest.json
│   └── particles-config.json
├── .env.example
├── index.html
├── package.json
└── vite.config.js
```

---

## Шаг 6 — Добавленные PHP API эндпоинты

| Файл | Метод | Описание |
|------|-------|----------|
| `api/albums.php` | GET | Список/деталь альбомов + треки |
| `api/news.php` | GET | Список/деталь новостей |
| `api/gallery.php` | GET | Список изображений галереи |
| `api/hero-settings.php` | GET | Настройки hero-секции |
| `api/user/login.php` | POST | Вход (возвращает JWT) |
| `api/user/register.php` | POST | Регистрация (возвращает JWT) |
| `api/user/logout.php` | POST | Выход (stateless) |

---

## Шаг 7 — Команды разработки

```bash
# Разработка
cd frontend && npm run dev       # Vite dev server + proxy → PHP

# Сборка продакшн
cd frontend && npm run build     # → ../public_html/

# Превью сборки
cd frontend && npm run preview   # Локальный просмотр build

# Линтинг
cd frontend && npm run lint      # ESLint проверка
```

---

## Частые проблемы

### CORS ошибки
Убедись что PHP API отдаёт заголовки:
```php
header('Access-Control-Allow-Origin: http://localhost:5173');
// или для всех:
header('Access-Control-Allow-Origin: *');
```

### 404 на обновление страницы (F5)
Настрой сервер (Apache/Nginx) на перенаправление всех запросов к `index.html` — см. Шаг 4.

### Музыка не стримится
Проверь что `/api/player/stream.php` корректно отдаёт заголовок `Accept-Ranges: bytes` для поддержки перемотки.

### JWT токен устарел
Токен хранится в `localStorage`. При 401 ответе от API — фронт автоматически перенаправит на `/login`.
