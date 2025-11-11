/**
 * Модуль для работы со статистикой треков
 * Лайки, дизлайки, прослушивания
 */

class TrackStatsManager {
    constructor() {
        this.currentTrackId = null;
        this.userReaction = null;
        this.viewTracked = false;

        console.log('📊 TrackStatsManager инициализирован');
        this.initEventListeners();
    }

    // Инициализация обработчиков событий
    initEventListeners() {
        // Кнопки лайков/дизлайков
        document.querySelector('.like-btn')?.addEventListener('click', () => {
            this.handleReaction('like');
        });

        document.querySelector('.dislike-btn')?.addEventListener('click', () => {
            this.handleReaction('dislike');
        });
    }

    // Установка текущего трека
    async setCurrentTrack(trackId) {
        if (!trackId) return;

        this.currentTrackId = trackId;
        this.viewTracked = false;

        // Загружаем статистику
        await this.loadStats();
    }

    // Загрузка статистики трека
    async loadStats() {
        if (!this.currentTrackId) return;

        try {
            const response = await fetch(`/api/player/track-stats.php?track_id=${this.currentTrackId}`);
            const data = await response.json();

            if (data.success) {
                this.updateStatsUI(data);
                this.userReaction = data.user_reaction;
                this.updateReactionButtons();
            }
        } catch (error) {
            console.error('❌ Ошибка загрузки статистики:', error);
        }
    }

    // Обновление UI статистики
    updateStatsUI(data) {
        const likesEl = document.getElementById('likes-count');
        const dislikesEl = document.getElementById('dislikes-count');
        const viewsEl = document.getElementById('views-count');

        if (likesEl) likesEl.textContent = this.formatNumber(data.likes);
        if (dislikesEl) dislikesEl.textContent = this.formatNumber(data.dislikes);
        if (viewsEl) viewsEl.textContent = this.formatNumber(data.views);
    }

    // Форматирование числа (1000 -> 1K)
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    // Обновление состояния кнопок реакций
    updateReactionButtons() {
        const likeBtn = document.querySelector('.like-btn');
        const dislikeBtn = document.querySelector('.dislike-btn');

        if (!likeBtn || !dislikeBtn) return;

        // Убираем активные классы
        likeBtn.classList.remove('active');
        dislikeBtn.classList.remove('active');

        // Устанавливаем активный класс
        if (this.userReaction === 'like') {
            likeBtn.classList.add('active');
        } else if (this.userReaction === 'dislike') {
            dislikeBtn.classList.add('active');
        }
    }

    // Обработка реакции (лайк/дизлайк)
    async handleReaction(reactionType) {
        if (!this.currentTrackId) {
            console.warn('⚠️ Нет активного трека');
            return;
        }

        try {
            const response = await fetch('/api/player/track-reaction.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    track_id: this.currentTrackId,
                    reaction: reactionType
                })
            });

            const data = await response.json();

            if (data.success) {
                // Обновляем статистику
                document.getElementById('likes-count').textContent = this.formatNumber(data.likes);
                document.getElementById('dislikes-count').textContent = this.formatNumber(data.dislikes);

                // Обновляем состояние кнопок
                if (data.action === 'removed') {
                    this.userReaction = null;
                } else {
                    this.userReaction = reactionType;
                }
                this.updateReactionButtons();

                // Показываем уведомление
                this.showNotification(data.action, reactionType);
            } else {
                console.error('❌ Ошибка реакции:', data.error);
            }
        } catch (error) {
            console.error('❌ Ошибка при отправке реакции:', error);
        }
    }

    // Трекинг прослушивания
    async trackView() {
        if (!this.currentTrackId || this.viewTracked) return;

        try {
            const response = await fetch('/api/player/track-view.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    track_id: this.currentTrackId
                })
            });

            const data = await response.json();

            if (data.success) {
                this.viewTracked = true;
                document.getElementById('views-count').textContent = this.formatNumber(data.views);
                console.log('✅ Прослушивание засчитано');
            }
        } catch (error) {
            console.error('❌ Ошибка трекинга просмотра:', error);
        }
    }

    // Показать уведомление
    showNotification(action, reactionType) {
        let message = '';

        if (action === 'added') {
            message = reactionType === 'like' ? '👍 Лайк!' : '👎 Дизлайк!';
        } else if (action === 'removed') {
            message = reactionType === 'like' ? 'Лайк убран' : 'Дизлайк убран';
        } else if (action === 'changed') {
            message = reactionType === 'like' ? '👍 Изменено на лайк' : '👎 Изменено на дизлайк';
        }

        // Используем встроенную систему уведомлений, если есть
        if (typeof showToast === 'function') {
            showToast(message, 'success');
        } else {
            console.log(message);
        }
    }

    // Сброс статистики
    reset() {
        this.currentTrackId = null;
        this.userReaction = null;
        this.viewTracked = false;

        document.getElementById('likes-count').textContent = '0';
        document.getElementById('dislikes-count').textContent = '0';
        document.getElementById('views-count').textContent = '0';

        document.querySelector('.like-btn')?.classList.remove('active');
        document.querySelector('.dislike-btn')?.classList.remove('active');
    }
}

// Создаем глобальный экземпляр
window.trackStatsManager = new TrackStatsManager();

// Интеграция с EpicPlayer
document.addEventListener('DOMContentLoaded', () => {
    // Подписываемся на событие смены трека
    window.addEventListener('trackChanged', (event) => {
        const trackId = event.detail?.trackId || event.detail?.id;
        if (trackId) {
            window.trackStatsManager.setCurrentTrack(trackId);
        }
    });

    // Подписываемся на событие начала воспроизведения
    window.addEventListener('trackPlaying', () => {
        // Засчитываем просмотр через 30 секунд воспроизведения
        setTimeout(() => {
            window.trackStatsManager.trackView();
        }, 30000);
    });
});
