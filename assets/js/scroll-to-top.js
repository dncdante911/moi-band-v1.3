/**
 * ═══════════════════════════════════════════════════════════════
 * SCROLL TO TOP BUTTON
 * ═══════════════════════════════════════════════════════════════
 * 
 * Добавь в footer.php перед </body>:
 * <script src="/assets/js/scroll-to-top.js"></script>
 * 
 * ═══════════════════════════════════════════════════════════════
 */

(function() {
    'use strict';
    
    // Создаем кнопку
    const button = document.createElement('button');
    button.id = 'scroll-to-top';
    button.innerHTML = '⬆️';
    button.setAttribute('aria-label', 'Прокрутить вверх');
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #FFD700, #FFA500);
        border: 2px solid #FFD700;
        color: #000;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 5px 20px rgba(255, 215, 0, 0.4);
        opacity: 0;
        visibility: hidden;
        transform: scale(0.8);
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(button);
    
    // Показываем/скрываем при скролле
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
            button.style.transform = 'scale(1)';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
            button.style.transform = 'scale(0.8)';
        }
        
        // Анимация при скролле
        button.style.transform = button.style.opacity === '1' ? 'scale(0.9)' : 'scale(0.8)';
        scrollTimeout = setTimeout(() => {
            if (button.style.opacity === '1') {
                button.style.transform = 'scale(1)';
            }
        }, 100);
    });
    
    // Hover эффект
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.15) rotate(15deg)';
        button.style.boxShadow = '0 8px 30px rgba(255, 215, 0, 0.6)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '0 5px 20px rgba(255, 215, 0, 0.4)';
    });
    
    // Клик - прокрутка вверх
    button.addEventListener('click', () => {
        // Анимация клика
        button.style.transform = 'scale(0.9)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);
        
        // Плавная прокрутка
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Мобильная адаптация
    if (window.innerWidth <= 768) {
        button.style.bottom = '20px';
        button.style.right = '20px';
        button.style.width = '45px';
        button.style.height = '45px';
        button.style.fontSize = '20px';
    }
    
    console.log('✅ Scroll to Top button loaded');
})();