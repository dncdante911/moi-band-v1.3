/**
 * ═══════════════════════════════════════════════════════════════
 * TOAST NOTIFICATIONS v1.0
 * ═══════════════════════════════════════════════════════════════
 * 
 * Использование:
 * showToast('Сообщение', 'success'); // success, error, warning, info
 * 
 * ═══════════════════════════════════════════════════════════════
 */

class ToastNotifications {
    constructor() {
        this.container = null;
        this.init();
    }
    
    init() {
        // Создаем контейнер для toast
        this.container = document.createElement('div');
        this.container.id = 'toast-container';
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
        
        // Инжектим стили
        this.injectStyles();
    }
    
    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .toast-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 99999;
                display: flex;
                flex-direction: column;
                gap: 10px;
                pointer-events: none;
            }
            
            .toast {
                background: rgba(26, 20, 16, 0.95);
                border: 2px solid #FFD700;
                border-radius: 8px;
                padding: 15px 20px;
                min-width: 300px;
                max-width: 400px;
                color: #fff;
                font-weight: 500;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3);
                transform: translateX(400px);
                transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55),
                            opacity 0.3s ease;
                opacity: 0;
                pointer-events: all;
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .toast.show {
                transform: translateX(0);
                opacity: 1;
            }
            
            .toast-icon {
                font-size: 24px;
                flex-shrink: 0;
            }
            
            .toast-message {
                flex: 1;
            }
            
            .toast-close {
                background: none;
                border: none;
                color: #fff;
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.2s;
                flex-shrink: 0;
            }
            
            .toast-close:hover {
                background: rgba(255, 255, 255, 0.1);
            }
            
            /* Типы */
            .toast.success {
                border-color: #4CAF50;
                background: rgba(20, 50, 20, 0.95);
            }
            
            .toast.error {
                border-color: #F44336;
                background: rgba(50, 20, 20, 0.95);
            }
            
            .toast.warning {
                border-color: #FF9800;
                background: rgba(50, 40, 20, 0.95);
            }
            
            .toast.info {
                border-color: #2196F3;
                background: rgba(20, 30, 50, 0.95);
            }
            
            /* Мобилка */
            @media (max-width: 768px) {
                .toast-container {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                }
                
                .toast {
                    min-width: auto;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    show(message, type = 'success', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.success}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close" aria-label="Закрыть">×</button>
        `;
        
        this.container.appendChild(toast);
        
        // Анимация появления
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Кнопка закрытия
        toast.querySelector('.toast-close').addEventListener('click', () => {
            this.hide(toast);
        });
        
        // Автоскрытие
        if (duration > 0) {
            setTimeout(() => this.hide(toast), duration);
        }
        
        return toast;
    }
    
    hide(toast) {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }
}

// Инициализация
const toastSystem = new ToastNotifications();

// Глобальная функция
window.showToast = (message, type = 'success', duration = 3000) => {
    return toastSystem.show(message, type, duration);
};

console.log('✅ Toast Notifications loaded');