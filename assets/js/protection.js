/**
 * ═══════════════════════════════════════════════════════════════
 * MASTER OF ILLUSION - PROTECTION SYSTEM v1.0
 * ═══════════════════════════════════════════════════════════════
 * 
 * 🔒 Базовая защита от копирования кода
 * ⚠️ Блокировка: F12, ПКМ, Ctrl+U, Ctrl+Shift+I/J/C
 * 🎨 Красивые предупреждения в консоли
 * 📜 Копирайт уведомление
 * 
 * © 2025 Master of Illusion | moi-band.com.ua
 * Все права защищены
 * 
 * ═══════════════════════════════════════════════════════════════
 */

(function() {
    'use strict';
    
    // ═══════════════════════════════════════════════════════════════
    // 🎨 КРАСИВОЕ ПРЕДУПРЕЖДЕНИЕ В КОНСОЛИ
    // ═══════════════════════════════════════════════════════════════
    
    function showConsoleWarning() {
        // Очищаем консоль
        console.clear();
        
        // Огромное предупреждение
        console.log(
            '%c⚠️ ВНИМАНИЕ! ⚠️',
            'color: #ff0000; font-size: 50px; font-weight: bold; text-shadow: 3px 3px 0 #000, -1px -1px 0 #FFD700;'
        );
        
        console.log(
            '%c🔒 ЗАЩИЩЕННАЯ ЗОНА',
            'color: #FFD700; font-size: 30px; font-weight: bold; font-family: "Cinzel Decorative", serif;'
        );
        
        console.log(
            '%cЭтот сайт защищен авторским правом!',
            'color: #FFA500; font-size: 20px; font-weight: bold; margin-top: 10px;'
        );
        
        console.log(
            '%c© 2025 Master of Illusion\n' +
            '🎸 Power Metal Project\n' +
            '🌐 https://moi-band.com.ua',
            'color: #ccc; font-size: 16px; line-height: 1.8; margin-top: 15px;'
        );
        
        console.log(
            '%c⚖️ ПРАВОВАЯ ИНФОРМАЦИЯ:',
            'color: #ff6b6b; font-size: 18px; font-weight: bold; margin-top: 20px;'
        );
        
        console.log(
            '%c• Несанкционированное копирование кода запрещено\n' +
            '• Использование материалов только с разрешения автора\n' +
            '• Нарушение авторских прав преследуется по закону\n' +
            '• Все попытки взлома логируются и отслеживаются',
            'color: #fff; font-size: 14px; line-height: 2; background: rgba(255, 0, 0, 0.1); padding: 10px; border-left: 4px solid #ff0000;'
        );
        
        console.log(
            '%c💡 Хочешь что-то подобное?\n' +
            'Свяжись с разработчиком!',
            'color: #00ff00; font-size: 16px; font-weight: bold; margin-top: 20px;'
        );
        
        console.log(
            '%c═══════════════════════════════════════════════════════',
            'color: #FFD700; font-size: 12px;'
        );
    }
    
    // Показываем предупреждение при загрузке
    showConsoleWarning();
    
    // ═══════════════════════════════════════════════════════════════
    // 🚫 БЛОКИРОВКА КОНТЕКСТНОГО МЕНЮ (ПКМ)
    // ═══════════════════════════════════════════════════════════════
    
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showAlert('⛔ Контекстное меню отключено!');
        return false;
    });
    
    // ═══════════════════════════════════════════════════════════════
    // ⌨️ БЛОКИРОВКА ГОРЯЧИХ КЛАВИШ
    // ═══════════════════════════════════════════════════════════════
    
    document.addEventListener('keydown', function(e) {
        // F12 - DevTools
        if (e.key === 'F12') {
            e.preventDefault();
            showAlert('⚠️ Инструменты разработчика отключены!');
            return false;
        }
        
        // Ctrl+Shift+I - Инспектор
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            showAlert('⚠️ Инспектор элементов отключен!');
            return false;
        }
        
        // Ctrl+Shift+J - Консоль
        if (e.ctrlKey && e.shiftKey && e.key === 'J') {
            e.preventDefault();
            showAlert('⚠️ Консоль отключена!');
            return false;
        }
        
        // Ctrl+Shift+C - Выбор элемента
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            showAlert('⚠️ Выбор элемента отключен!');
            return false;
        }
        
        // Ctrl+U - Просмотр кода страницы
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            showAlert('⚠️ Просмотр кода страницы отключен!');
            return false;
        }
        
        // Ctrl+S - Сохранение страницы
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            showAlert('⚠️ Сохранение страницы отключено!');
            return false;
        }
        
        // Ctrl+Shift+K - Консоль Firefox
        if (e.ctrlKey && e.shiftKey && e.key === 'K') {
            e.preventDefault();
            showAlert('⚠️ Консоль Firefox отключена!');
            return false;
        }
    });
    
    // ═══════════════════════════════════════════════════════════════
    // 🎯 ДЕТЕКТ ОТКРЫТИЯ DEVTOOLS (Опционально)
    // ═══════════════════════════════════════════════════════════════
    
    let devtoolsOpen = false;
    const threshold = 160; // Разница в пикселях
    
    function detectDevTools() {
        const widthDiff = window.outerWidth - window.innerWidth;
        const heightDiff = window.outerHeight - window.innerHeight;
        
        if (widthDiff > threshold || heightDiff > threshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                showConsoleWarning(); // Показываем предупреждение снова
            }
        } else {
            devtoolsOpen = false;
        }
    }
    
    // Проверяем каждую секунду
    setInterval(detectDevTools, 1000);
    
    // ═══════════════════════════════════════════════════════════════
    // 🔍 БЛОКИРОВКА ВЫДЕЛЕНИЯ ТЕКСТА (Опционально)
    // ═══════════════════════════════════════════════════════════════
    
    // Раскомментируй если хочешь запретить выделение текста:
    /*
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        showAlert('⚠️ Копирование текста отключено!');
        return false;
    });
    */
    
    // ═══════════════════════════════════════════════════════════════
    // 🎨 КРАСИВОЕ МОДАЛЬНОЕ ОКНО С ПРЕДУПРЕЖДЕНИЕМ
    // ═══════════════════════════════════════════════════════════════
    
    function showAlert(message) {
        // Проверяем, нет ли уже алерта
        if (document.querySelector('.protection-alert')) return;
        
        // Создаем overlay
        const overlay = document.createElement('div');
        overlay.className = 'protection-alert';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;
        
        // Создаем модальное окно
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: linear-gradient(135deg, #1a1410 0%, #0a0a0a 100%);
            border: 3px solid #FFD700;
            border-radius: 20px;
            padding: 40px;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 0 50px rgba(255, 215, 0, 0.5);
            animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        `;
        
        modal.innerHTML = `
            <div style="font-size: 80px; margin-bottom: 20px;">🔒</div>
            <h2 style="color: #FFD700; font-size: 28px; margin-bottom: 20px; font-family: 'Cinzel Decorative', serif; text-shadow: 0 0 20px rgba(255, 215, 0, 0.6);">
                ЗАЩИЩЕННАЯ ЗОНА
            </h2>
            <p style="color: #FFA500; font-size: 18px; margin-bottom: 30px; font-weight: bold;">
                ${message}
            </p>
            <div style="color: #ccc; font-size: 14px; margin-bottom: 30px; line-height: 1.8;">
                <p style="margin: 10px 0;">© 2025 Master of Illusion</p>
                <p style="margin: 10px 0;">🎸 Power Metal Project</p>
                <p style="margin: 10px 0;">Все права защищены</p>
            </div>
            <button onclick="this.closest('.protection-alert').remove()" style="
                background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1));
                border: 2px solid #FFD700;
                color: #FFD700;
                padding: 15px 40px;
                font-size: 16px;
                font-weight: bold;
                border-radius: 30px;
                cursor: pointer;
                transition: all 0.3s;
                letter-spacing: 1px;
            " onmouseover="this.style.background='linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 215, 0, 0.2))'; this.style.transform='scale(1.05)'" onmouseout="this.style.background='linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1))'; this.style.transform='scale(1)'">
                ✅ ПОНЯТНО
            </button>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Автоматическое закрытие через 5 секунд
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => overlay.remove(), 300);
            }
        }, 5000);
    }
    
    // Добавляем стили для анимаций
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.5) rotate(-5deg);
            }
            to {
                opacity: 1;
                transform: scale(1) rotate(0deg);
            }
        }
    `;
    document.head.appendChild(style);
    
    // ═══════════════════════════════════════════════════════════════
    // 📊 ЛОГИРОВАНИЕ ПОПЫТОК (Опционально)
    // ═══════════════════════════════════════════════════════════════
    
    function logAttempt(action) {
        // Можно отправлять на сервер для статистики
        console.warn(`[SECURITY] Попытка: ${action} | Время: ${new Date().toLocaleString()}`);
        
        // Раскомментируй для отправки на сервер:
        /*
        fetch('/api/log-security', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: action,
                timestamp: Date.now(),
                userAgent: navigator.userAgent
            })
        });
        */
    }
    
    // ═══════════════════════════════════════════════════════════════
    // ✅ ФИНАЛЬНАЯ ЗАЩИТА
    // ═══════════════════════════════════════════════════════════════
    
    // Защита от удаления обработчиков
    Object.freeze(document);
    
    console.log('%c✅ Защита активирована!', 'color: #00ff00; font-size: 16px; font-weight: bold;');
    
})();

/**
 * ═══════════════════════════════════════════════════════════════
 * КОНЕЦ ФАЙЛА ЗАЩИТЫ
 * ═══════════════════════════════════════════════════════════════
 */