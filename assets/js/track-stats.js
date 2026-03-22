/**
 * Модуль для работы со статистикой треков
 * Лайки, дизлайки, прослушивания
 *
 * Исправления:
 * - Убран DOMContentLoaded: скрипт грузится в header.php глобально,
 *   поэтому DOM всегда готов, а слушатели window-событий регистрируются сразу.
 * - Добавлен clearTimeout чтобы не засчитывать просмотр предыдущего трека.
 */

class TrackStatsManager {
    constructor() {
        this.currentTrackId  = null;
        this.userReaction    = null;
        this.viewTracked     = false;
        this._viewTimer      = null; // таймер для засчёта просмотра
        this._playStartTime  = null; // когда начали играть (для накопительного счёта)
        this._playedSeconds  = 0;    // накопленное время воспроизведения
        this._VIEW_THRESHOLD = 10;   // секунд прослушивания для засчёта просмотра

        this._bindLikeButtons(); // вешаем кнопки если уже в DOM

        // Перевешиваем кнопки при AJAX-навигации (новый контент = новые кнопки)
        window.addEventListener('ajaxContentLoaded', () => this._bindLikeButtons());
    }

    // ── Кнопки лайка/дизлайка ────────────────────────────────────────
    _bindLikeButtons() {
        document.querySelector('.like-btn')?.removeEventListener('click', this._likeHandler);
        document.querySelector('.dislike-btn')?.removeEventListener('click', this._dislikeHandler);

        this._likeHandler    = () => this.handleReaction('like');
        this._dislikeHandler = () => this.handleReaction('dislike');

        document.querySelector('.like-btn')?.addEventListener('click', this._likeHandler);
        document.querySelector('.dislike-btn')?.addEventListener('click', this._dislikeHandler);
    }

    // ── Смена трека ───────────────────────────────────────────────────
    async setCurrentTrack(trackId) {
        if (!trackId) return;

        // Отменяем предыдущий таймер и сбрасываем накопленное время
        clearTimeout(this._viewTimer);
        this._playedSeconds  = 0;
        this._playStartTime  = null;

        this.currentTrackId = String(trackId);
        this.viewTracked     = false;

        await this.loadStats();
    }

    // ── Начало воспроизведения (фиксируем момент) ─────────────────────
    onPlayStart() {
        this._playStartTime = Date.now();
        // Запускаем таймер-страховку: если пользователь не остановит плеер,
        // засчитываем просмотр через _VIEW_THRESHOLD секунд от накопленного времени
        clearTimeout(this._viewTimer);
        const remaining = (this._VIEW_THRESHOLD - this._playedSeconds) * 1000;
        if (remaining > 0) {
            this._viewTimer = setTimeout(() => this._checkAndTrackView(), remaining);
        } else {
            this._checkAndTrackView();
        }
    }

    // ── Пауза/стоп — накапливаем сыгранное время ─────────────────────
    onPlayStop() {
        if (this._playStartTime !== null) {
            this._playedSeconds += (Date.now() - this._playStartTime) / 1000;
            this._playStartTime  = null;
        }
        clearTimeout(this._viewTimer);
    }

    // ── Проверка порога и засчёт просмотра ───────────────────────────
    _checkAndTrackView() {
        // Добавляем время которое идёт прямо сейчас
        if (this._playStartTime !== null) {
            this._playedSeconds += (Date.now() - this._playStartTime) / 1000;
            this._playStartTime  = Date.now(); // сброс точки отсчёта
        }
        if (this._playedSeconds >= this._VIEW_THRESHOLD) {
            this.trackView();
        }
    }

    // ── Загрузка статистики из API ────────────────────────────────────
    async loadStats() {
        if (!this.currentTrackId) return;

        try {
            const response = await fetch(`/api/player/track-stats.php?track_id=${this.currentTrackId}`);
            if (!response.ok) return;
            const data = await response.json();

            if (data.success) {
                this._updateStatsUI(data);
                this.userReaction = data.user_reaction;
                this._updateReactionButtons();
            }
        } catch (e) {
            // Сеть недоступна — молча пропускаем
        }
    }

    // ── Обновление элементов счётчиков ────────────────────────────────
    _updateStatsUI(data) {
        const set = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = this.formatNumber(val ?? 0);
        };
        set('likes-count',    data.likes);
        set('dislikes-count', data.dislikes);
        set('views-count',    data.views);
    }

    // ── Форматирование числа (1000 → 1K) ─────────────────────────────
    formatNumber(num) {
        num = parseInt(num, 10) || 0;
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000)    return (num / 1000).toFixed(1) + 'K';
        return String(num);
    }

    // ── Состояние кнопок реакций ─────────────────────────────────────
    _updateReactionButtons() {
        document.querySelector('.like-btn')?.classList.toggle('active', this.userReaction === 'like');
        document.querySelector('.dislike-btn')?.classList.toggle('active', this.userReaction === 'dislike');
    }

    // ── Лайк / дизлайк ───────────────────────────────────────────────
    async handleReaction(reactionType) {
        if (!this.currentTrackId) return;

        try {
            const response = await fetch('/api/player/track-reaction.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ track_id: this.currentTrackId, reaction: reactionType })
            });
            const data = await response.json();

            if (data.success) {
                const set = (id, val) => {
                    const el = document.getElementById(id);
                    if (el) el.textContent = this.formatNumber(val ?? 0);
                };
                set('likes-count',    data.likes);
                set('dislikes-count', data.dislikes);

                this.userReaction = data.action === 'removed' ? null : reactionType;
                this._updateReactionButtons();

                const messages = {
                    like:    { added: '👍 Лайк!',    removed: 'Лайк убран',    changed: '👍 Изменено на лайк' },
                    dislike: { added: '👎 Дизлайк!', removed: 'Дизлайк убран', changed: '👎 Изменено на дизлайк' }
                };
                const msg = messages[reactionType]?.[data.action] ?? '';
                if (msg && typeof showToast === 'function') showToast(msg, 'success');
            }
        } catch (e) { /* сеть */ }
    }

    // ── Засчитываем просмотр (вызывается плеером через событие) ──────
    async trackView() {
        if (!this.currentTrackId || this.viewTracked) return;

        try {
            const response = await fetch('/api/player/track-view.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ track_id: this.currentTrackId })
            });
            const data = await response.json();

            if (data.success) {
                this.viewTracked = true;
                const el = document.getElementById('views-count');
                if (el) el.textContent = this.formatNumber(data.views);
            }
        } catch (e) { /* сеть */ }
    }

    // ── Сброс при смене страницы ─────────────────────────────────────
    reset() {
        clearTimeout(this._viewTimer);
        this.currentTrackId = null;
        this.userReaction    = null;
        this.viewTracked     = false;

        ['likes-count', 'dislikes-count', 'views-count'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = '0';
        });

        document.querySelector('.like-btn')?.classList.remove('active');
        document.querySelector('.dislike-btn')?.classList.remove('active');
    }
}

// ── Создаём глобальный экземпляр ─────────────────────────────────────
window.trackStatsManager = new TrackStatsManager();

// ── Подписываемся на события плеера ──────────────────────────────────
// Эти слушатели на window — работают при любой навигации, включая AJAX.

window.addEventListener('trackChanged', (event) => {
    const trackId = event.detail?.trackId ?? event.detail?.id;
    if (trackId) {
        window.trackStatsManager.setCurrentTrack(trackId);
    }
});

// Плеер начал воспроизведение
window.addEventListener('trackPlaying', () => {
    window.trackStatsManager.onPlayStart();
});

// Плеер поставлен на паузу
window.addEventListener('trackPaused', () => {
    window.trackStatsManager.onPlayStop();
});

// Трек закончился — засчитываем просмотр немедленно (песня прослушана до конца)
window.addEventListener('trackEnded', () => {
    window.trackStatsManager.onPlayStop();
    window.trackStatsManager._checkAndTrackView();
});
