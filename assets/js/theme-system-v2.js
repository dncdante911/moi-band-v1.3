/**
 * ADVANCED THEME SYSTEM V3.0
 * Полная стилизация всего сайта с изменением шрифтов, блоков, настроения
 */

class AdvancedThemeSystem {
    constructor() {
        this.currentTheme = localStorage.getItem('site_theme_v3') || 'power-metal';
        this.themes = {
            'power-metal': {
                name: 'Power Metal',
                icon: '⚔️',
                fonts: {
                    heading: "'Cinzel', 'Cinzel Decorative', serif",
                    body: "'Roboto', sans-serif"
                },
                css: {
                    // Цвета
                    '--primary': '#FFD700',
                    '--secondary': '#FFA500',
                    '--accent': '#FF4500',
                    '--bg-main': '#0a0a0a',
                    '--bg-card': 'linear-gradient(135deg, rgba(26, 20, 16, 0.95), rgba(40, 30, 20, 0.95))',
                    '--text': '#FFE4B5',
                    '--text-muted': '#B8860B',
                    '--border': '#FFD700',
                    
                    // Эффекты
                    '--glow': '0 0 30px rgba(255, 215, 0, 0.6)',
                    '--shadow': '0 10px 40px rgba(255, 165, 0, 0.3)',
                    '--hover-transform': 'translateY(-3px) scale(1.02)',
                    
                    // Размеры и формы
                    '--radius': '8px',
                    '--radius-large': '15px',
                    '--border-width': '2px',
                    
                    // Фоны
                    '--bg-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1410 50%, #0a0a0a 100%)',
                    '--bg-pattern': `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                },
                blockStyles: {
                    // Стиль карточек и блоков
                    card: `
                        background: linear-gradient(135deg, rgba(26, 20, 16, 0.95), rgba(40, 30, 20, 0.95));
                        border: 2px solid #FFD700;
                        border-radius: 8px;
                        position: relative;
                        overflow: hidden;
                    `,
                    cardBefore: `
                        content: '';
                        position: absolute;
                        top: -2px;
                        left: -2px;
                        right: -2px;
                        bottom: -2px;
                        background: linear-gradient(45deg, #FFD700, #FFA500, #FFD700);
                        border-radius: 8px;
                        opacity: 0;
                        z-index: -1;
                        transition: opacity 0.3s;
                    `,
                    cardHover: `
                        transform: translateY(-3px);
                        box-shadow: 0 15px 40px rgba(255, 215, 0, 0.4);
                    `,
                    heading: `
                        font-family: 'Cinzel', serif;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        background: linear-gradient(90deg, #FFD700, #FFA500);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
                    `
                },
                animations: {
                    cardAppear: 'heroicEntry 0.5s ease-out',
                    buttonPulse: 'goldPulse 2s infinite',
                    textGlow: 'epicGlow 3s ease-in-out infinite'
                }
            },
            
            'gothic-metal': {
                name: 'Gothic Metal',
                icon: '🦇',
                fonts: {
                    heading: "'Crimson Text', 'Old Standard TT', serif",
                    body: "'Lato', 'Gothic A1', sans-serif"
                },
                css: {
                    '--primary': '#9D00FF',
                    '--secondary': '#6A0DAD',
                    '--accent': '#FF1493',
                    '--bg-main': '#0a0012',
                    '--bg-card': 'linear-gradient(135deg, rgba(15, 5, 21, 0.95), rgba(30, 10, 42, 0.95))',
                    '--text': '#E6E6FA',
                    '--text-muted': '#9370DB',
                    '--border': 'rgba(157, 0, 255, 0.5)',
                    '--glow': '0 0 25px rgba(157, 0, 255, 0.5)',
                    '--shadow': '0 10px 40px rgba(106, 13, 173, 0.4)',
                    '--hover-transform': 'translateY(-2px) rotate(-1deg)',
                    '--radius': '4px',
                    '--radius-large': '10px',
                    '--border-width': '1px',
                    '--bg-gradient': 'radial-gradient(circle at 30% 40%, rgba(157, 0, 255, 0.1) 0%, transparent 50%), linear-gradient(135deg, #0a0012 0%, #1a0f2e 100%)',
                    '--bg-pattern': `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239D00FF' fill-opacity='0.03'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm20 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
                },
                blockStyles: {
                    card: `
                        background: linear-gradient(135deg, rgba(15, 5, 21, 0.95), rgba(30, 10, 42, 0.95));
                        border: 1px solid rgba(157, 0, 255, 0.3);
                        border-radius: 4px;
                        box-shadow: inset 0 0 20px rgba(157, 0, 255, 0.1);
                        position: relative;
                    `,
                    cardBefore: `
                        content: '🦇';
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        font-size: 20px;
                        opacity: 0.1;
                        animation: gothicFloat 6s ease-in-out infinite;
                    `,
                    cardHover: `
                        border-color: #9D00FF;
                        box-shadow: 0 0 30px rgba(157, 0, 255, 0.5), inset 0 0 20px rgba(157, 0, 255, 0.2);
                    `,
                    heading: `
                        font-family: 'Crimson Text', serif;
                        font-weight: 300;
                        letter-spacing: 1px;
                        color: #9D00FF;
                        text-shadow: 0 0 20px rgba(157, 0, 255, 0.6);
                        border-bottom: 1px solid rgba(157, 0, 255, 0.3);
                    `
                },
                animations: {
                    cardAppear: 'gothicFade 0.8s ease-out',
                    buttonPulse: 'purplePulse 3s infinite',
                    textGlow: 'gothicGlow 4s ease-in-out infinite'
                }
            },
            
            'punk-rock': {
                name: 'Punk Rock',
                icon: '🤘',
                fonts: {
                    heading: "'Bebas Neue', 'Anton', sans-serif",
                    body: "'Oswald', 'Barlow Condensed', sans-serif"
                },
                css: {
                    '--primary': '#FF0080',
                    '--secondary': '#00FFFF',
                    '--accent': '#FFFF00',
                    '--bg-main': '#000000',
                    '--bg-card': 'linear-gradient(45deg, rgba(20, 20, 20, 0.95), rgba(40, 0, 40, 0.95))',
                    '--text': '#FFFFFF',
                    '--text-muted': '#FF69B4',
                    '--border': '#FF0080',
                    '--glow': '0 0 30px rgba(255, 0, 128, 0.7)',
                    '--shadow': '0 15px 50px rgba(0, 255, 255, 0.3)',
                    '--hover-transform': 'translateY(-5px) rotate(2deg) scale(1.05)',
                    '--radius': '0px',
                    '--radius-large': '0px',
                    '--border-width': '3px',
                    '--bg-gradient': 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, #111 25%, #111 75%, #000 75%, #000)',
                    '--bg-pattern': `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FF0080' fill-opacity='0.05'%3E%3Cpolygon points='10,0 0,10 10,20 20,10'/%3E%3C/g%3E%3C/svg%3E")`
                },
                blockStyles: {
                    card: `
                        background: linear-gradient(135deg, rgba(20, 20, 20, 0.95), rgba(40, 0, 40, 0.95));
                        border: 3px solid #FF0080;
                        transform: skew(-1deg, -0.5deg);
                        position: relative;
                        overflow: visible;
                    `,
                    cardBefore: `
                        content: '⚡';
                        position: absolute;
                        top: -10px;
                        left: -10px;
                        font-size: 40px;
                        color: #FFFF00;
                        opacity: 0.3;
                        animation: punkShake 0.5s infinite;
                        transform: rotate(-15deg);
                    `,
                    cardHover: `
                        transform: skew(-1deg, -0.5deg) scale(1.05) rotate(1deg);
                        border-color: #00FFFF;
                        box-shadow: 0 0 40px #FF0080, 0 0 80px #00FFFF;
                    `,
                    heading: `
                        font-family: 'Bebas Neue', sans-serif;
                        text-transform: uppercase;
                        letter-spacing: 3px;
                        background: linear-gradient(45deg, #FF0080, #00FFFF, #FFFF00);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        text-shadow: 2px 2px 0 #000;
                        transform: skew(-5deg);
                    `
                },
                animations: {
                    cardAppear: 'punkSlam 0.3s ease-out',
                    buttonPulse: 'punkGlitch 1s infinite',
                    textGlow: 'neonFlicker 2s infinite'
                }
            },
            
            'heavy-metal': {
                name: 'Heavy Metal',
                icon: '🔥',
                fonts: {
                    heading: "'Black Ops One', 'Bungee', sans-serif",
                    body: "'Rajdhani', 'Exo 2', sans-serif"
                },
                css: {
                    '--primary': '#FF3333',
                    '--secondary': '#666666',
                    '--accent': '#FF0000',
                    '--bg-main': '#0a0a0a',
                    '--bg-card': 'linear-gradient(135deg, rgba(30, 0, 0, 0.95), rgba(50, 10, 10, 0.95))',
                    '--text': '#CCCCCC',
                    '--text-muted': '#999999',
                    '--border': '#FF3333',
                    '--glow': '0 0 40px rgba(255, 51, 51, 0.8)',
                    '--shadow': '0 20px 60px rgba(255, 0, 0, 0.4)',
                    '--hover-transform': 'translateY(-3px) scale(1.02)',
                    '--radius': '6px',
                    '--radius-large': '12px',
                    '--border-width': '2px',
                    '--bg-gradient': 'radial-gradient(circle at 50% 0%, rgba(255, 0, 0, 0.1) 0%, transparent 70%), linear-gradient(180deg, #0a0a0a 0%, #1a0000 100%)',
                    '--bg-pattern': `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF0000' fill-opacity='0.03'%3E%3Cpath d='M30 30l-15 15v-30z M30 30l15-15v30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                },
                blockStyles: {
                    card: `
                        background: linear-gradient(135deg, rgba(30, 0, 0, 0.95), rgba(50, 10, 10, 0.95));
                        border: 2px solid #FF3333;
                        border-radius: 6px;
                        position: relative;
                        box-shadow: inset 0 -3px 0 rgba(255, 0, 0, 0.5);
                    `,
                    cardBefore: `
                        content: '🔥';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        font-size: 60px;
                        opacity: 0.05;
                        animation: fireburn 3s ease-in-out infinite;
                    `,
                    cardHover: `
                        border-color: #FF0000;
                        box-shadow: 0 0 50px rgba(255, 0, 0, 0.6), inset 0 -5px 0 #FF0000;
                        background: linear-gradient(135deg, rgba(40, 0, 0, 0.95), rgba(60, 10, 10, 0.95));
                    `,
                    heading: `
                        font-family: 'Black Ops One', sans-serif;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        color: #FF3333;
                        text-shadow: 0 3px 10px rgba(255, 0, 0, 0.8), 0 0 20px rgba(255, 51, 51, 0.5);
                    `
                },
                animations: {
                    cardAppear: 'metalRise 0.5s ease-out',
                    buttonPulse: 'firePulse 2s infinite',
                    textGlow: 'fireGlow 3s ease-in-out infinite'
                }
            },
            
            'symphonic-metal': {
                name: 'Symphonic Metal',
                icon: '🎻',
                fonts: {
                    heading: "'Playfair Display', 'Cormorant Garamond', serif",
                    body: "'Montserrat', 'Source Sans Pro', sans-serif"
                },
                css: {
                    '--primary': '#C0C0C0',
                    '--secondary': '#87CEEB',
                    '--accent': '#4169E1',
                    '--bg-main': '#020208',
                    '--bg-card': 'linear-gradient(135deg, rgba(10, 15, 30, 0.95), rgba(20, 30, 50, 0.95))',
                    '--text': '#E8E8E8',
                    '--text-muted': '#A9A9A9',
                    '--border': 'rgba(192, 192, 192, 0.4)',
                    '--glow': '0 0 25px rgba(135, 206, 235, 0.6)',
                    '--shadow': '0 15px 50px rgba(65, 105, 225, 0.3)',
                    '--hover-transform': 'translateY(-4px)',
                    '--radius': '10px',
                    '--radius-large': '20px',
                    '--border-width': '1px',
                    '--bg-gradient': 'linear-gradient(180deg, #020208 0%, #0a1628 50%, #020208 100%)',
                    '--bg-pattern': `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2387CEEB' fill-opacity='0.02'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm40 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                },
                blockStyles: {
                    card: `
                        background: linear-gradient(135deg, rgba(10, 15, 30, 0.95), rgba(20, 30, 50, 0.95));
                        border: 1px solid rgba(192, 192, 192, 0.4);
                        border-radius: 10px;
                        position: relative;
                        backdrop-filter: blur(10px);
                    `,
                    cardBefore: `
                        content: '♪';
                        position: absolute;
                        top: 20px;
                        right: 20px;
                        font-size: 30px;
                        color: #87CEEB;
                        opacity: 0.1;
                        animation: musicalNote 8s ease-in-out infinite;
                    `,
                    cardHover: `
                        border-color: #87CEEB;
                        box-shadow: 0 0 40px rgba(135, 206, 235, 0.5), 0 10px 30px rgba(65, 105, 225, 0.3);
                        transform: translateY(-4px);
                    `,
                    heading: `
                        font-family: 'Playfair Display', serif;
                        font-weight: 400;
                        letter-spacing: 1px;
                        background: linear-gradient(90deg, #C0C0C0, #87CEEB);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        text-shadow: 0 0 20px rgba(135, 206, 235, 0.4);
                    `
                },
                animations: {
                    cardAppear: 'orchestralRise 0.8s ease-out',
                    buttonPulse: 'silverShimmer 3s infinite',
                    textGlow: 'celestialGlow 4s ease-in-out infinite'
                }
            },
            
            'dark-ambient': {
                name: 'Dark Ambient',
                icon: '🌑',
                fonts: {
                    heading: "'Raleway', 'Quicksand', sans-serif",
                    body: "'Inter', 'Nunito Sans', sans-serif"
                },
                css: {
                    '--primary': '#1a1a1a',
                    '--secondary': '#2a2a2a',
                    '--accent': '#3a3a3a',
                    '--bg-main': '#000000',
                    '--bg-card': 'linear-gradient(135deg, rgba(10, 10, 10, 0.98), rgba(20, 20, 20, 0.98))',
                    '--text': '#808080',
                    '--text-muted': '#404040',
                    '--border': 'rgba(255, 255, 255, 0.1)',
                    '--glow': '0 0 10px rgba(255, 255, 255, 0.1)',
                    '--shadow': '0 10px 30px rgba(0, 0, 0, 0.9)',
                    '--hover-transform': 'translateY(-1px)',
                    '--radius': '2px',
                    '--radius-large': '4px',
                    '--border-width': '1px',
                    '--bg-gradient': 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
                    '--bg-pattern': 'none'
                },
                blockStyles: {
                    card: `
                        background: linear-gradient(135deg, rgba(10, 10, 10, 0.98), rgba(20, 20, 20, 0.98));
                        border: 1px solid rgba(255, 255, 255, 0.05);
                        border-radius: 2px;
                        position: relative;
                    `,
                    cardBefore: `
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%);
                        pointer-events: none;
                    `,
                    cardHover: `
                        border-color: rgba(255, 255, 255, 0.2);
                        background: linear-gradient(135deg, rgba(15, 15, 15, 0.98), rgba(25, 25, 25, 0.98));
                    `,
                    heading: `
                        font-family: 'Raleway', sans-serif;
                        font-weight: 200;
                        letter-spacing: 4px;
                        color: #808080;
                        text-transform: lowercase;
                    `
                },
                animations: {
                    cardAppear: 'fadeInSlow 1.5s ease-out',
                    buttonPulse: 'none',
                    textGlow: 'none'
                }
            }
        };
        
        this.init();
    }
    
    init() {
        // Создать стили для анимаций
        this.injectAnimations();
        
        // Создать UI переключатель
        this.createThemeSwitcher();
        
        // Применить тему
        this.applyTheme(this.currentTheme);
        
        // Следить за изменениями DOM для применения стилей к новым элементам
        this.observeDOM();
        
        // Синхронизация между вкладками
        window.addEventListener('storage', (e) => {
            if (e.key === 'site_theme_v3') {
                this.applyTheme(e.newValue);
            }
        });
    }
    
    injectAnimations() {
        const style = document.createElement('style');
        style.id = 'theme-animations';
        style.innerHTML = `
            /* Power Metal анимации */
            @keyframes heroicEntry {
                from {
                    opacity: 0;
                    transform: translateY(30px) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            @keyframes goldPulse {
                0%, 100% { 
                    box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
                }
                50% { 
                    box-shadow: 0 0 40px rgba(255, 215, 0, 0.8);
                }
            }
            
            @keyframes epicGlow {
                0%, 100% { 
                    text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
                }
                50% { 
                    text-shadow: 0 0 40px rgba(255, 215, 0, 0.9);
                }
            }
            
            /* Gothic Metal анимации */
            @keyframes gothicFade {
                from {
                    opacity: 0;
                    filter: blur(5px);
                }
                to {
                    opacity: 1;
                    filter: blur(0);
                }
            }
            
            @keyframes purplePulse {
                0%, 100% { 
                    box-shadow: 0 0 15px rgba(157, 0, 255, 0.4);
                }
                50% { 
                    box-shadow: 0 0 30px rgba(157, 0, 255, 0.8);
                }
            }
            
            @keyframes gothicGlow {
                0%, 100% { 
                    text-shadow: 0 0 15px rgba(157, 0, 255, 0.5);
                }
                50% { 
                    text-shadow: 0 0 30px rgba(157, 0, 255, 0.9);
                }
            }
            
            @keyframes gothicFloat {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                25% { transform: translateY(-10px) rotate(-5deg); }
                75% { transform: translateY(10px) rotate(5deg); }
            }
            
            /* Punk Rock анимации */
            @keyframes punkSlam {
                0% {
                    opacity: 0;
                    transform: scale(1.5) rotate(15deg);
                }
                50% {
                    transform: scale(0.95) rotate(-2deg);
                }
                100% {
                    opacity: 1;
                    transform: scale(1) rotate(0);
                }
            }
            
            @keyframes punkShake {
                0%, 100% { transform: translateX(0) rotate(-15deg); }
                25% { transform: translateX(-3px) rotate(-18deg); }
                75% { transform: translateX(3px) rotate(-12deg); }
            }
            
            @keyframes punkGlitch {
                0%, 100% { 
                    box-shadow: 2px 2px 0 #FF0080, -2px -2px 0 #00FFFF;
                }
                25% {
                    box-shadow: -2px 2px 0 #00FFFF, 2px -2px 0 #FF0080;
                }
                50% {
                    box-shadow: 2px -2px 0 #FFFF00, -2px 2px 0 #FF0080;
                }
                75% {
                    box-shadow: -2px -2px 0 #FF0080, 2px 2px 0 #FFFF00;
                }
            }
            
            @keyframes neonFlicker {
                0%, 100% { opacity: 1; }
                30% { opacity: 0.8; }
                31% { opacity: 1; }
                32% { opacity: 0.8; }
                33% { opacity: 1; }
                80% { opacity: 1; }
                81% { opacity: 0.9; }
                82% { opacity: 1; }
            }
            
            /* Heavy Metal анимации */
            @keyframes metalRise {
                0% {
                    opacity: 0;
                    transform: translateY(50px) scale(0.9);
                    filter: brightness(0);
                }
                50% {
                    filter: brightness(1.5);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                    filter: brightness(1);
                }
            }
            
            @keyframes firePulse {
                0%, 100% { 
                    box-shadow: 0 0 30px rgba(255, 0, 0, 0.6);
                }
                50% { 
                    box-shadow: 0 0 60px rgba(255, 51, 51, 0.9);
                }
            }
            
            @keyframes fireGlow {
                0%, 100% { 
                    text-shadow: 0 0 20px rgba(255, 0, 0, 0.6);
                }
                33% {
                    text-shadow: 0 0 40px rgba(255, 100, 0, 0.8);
                }
                66% {
                    text-shadow: 0 0 35px rgba(255, 200, 0, 0.7);
                }
            }
            
            @keyframes fireburn {
                0%, 100% { 
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 0.05;
                }
                50% { 
                    transform: translate(-50%, -50%) scale(1.2);
                    opacity: 0.1;
                }
            }
            
            /* Symphonic Metal анимации */
            @keyframes orchestralRise {
                0% {
                    opacity: 0;
                    transform: translateY(20px);
                    filter: blur(3px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                    filter: blur(0);
                }
            }
            
            @keyframes silverShimmer {
                0%, 100% { 
                    box-shadow: 0 0 20px rgba(192, 192, 192, 0.4);
                }
                50% { 
                    box-shadow: 0 0 40px rgba(135, 206, 235, 0.6);
                }
            }
            
            @keyframes celestialGlow {
                0%, 100% { 
                    text-shadow: 0 0 15px rgba(135, 206, 235, 0.4);
                }
                50% { 
                    text-shadow: 0 0 30px rgba(192, 192, 192, 0.8);
                }
            }
            
            @keyframes musicalNote {
                0%, 100% { 
                    transform: translateY(0) rotate(0deg);
                    opacity: 0.1;
                }
                25% {
                    transform: translateY(-15px) rotate(10deg);
                    opacity: 0.2;
                }
                50% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0.1;
                }
                75% {
                    transform: translateY(15px) rotate(-10deg);
                    opacity: 0.2;
                }
            }
            
            /* Dark Ambient анимации */
            @keyframes fadeInSlow {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
            
            /* Общие анимации */
            @keyframes floatButton {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    createThemeSwitcher() {
        // Удалить старый
        const existing = document.getElementById('theme-switcher-v3');
        if (existing) existing.remove();
        
        const switcher = document.createElement('div');
        switcher.id = 'theme-switcher-v3';
        switcher.innerHTML = `
            <style>
                #theme-switcher-v3 {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    z-index: 10000;
                }
                
                .theme-fab {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: var(--primary);
                    border: 3px solid var(--bg-main);
                    box-shadow: var(--shadow);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 28px;
                    transition: all 0.3s ease;
                    animation: floatButton 3s ease-in-out infinite;
                }
                
                .theme-fab:hover {
                    transform: scale(1.1) rotate(180deg);
                    box-shadow: var(--glow);
                }
                
                .theme-options-v3 {
                    position: absolute;
                    bottom: 70px;
                    right: 0;
                    background: var(--bg-card);
                    border: var(--border-width) solid var(--border);
                    border-radius: var(--radius-large);
                    padding: 10px;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(20px) scale(0.8);
                    transition: all 0.3s ease;
                    min-width: 200px;
                }
                
                .theme-options-v3.active {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0) scale(1);
                }
                
                .theme-option-v3 {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px;
                    margin: 5px 0;
                    border-radius: var(--radius);
                    cursor: pointer;
                    transition: all 0.3s;
                    background: rgba(0,0,0,0.3);
                }
                
                .theme-option-v3:hover {
                    background: var(--primary);
                    color: #000;
                    transform: translateX(5px);
                }
                
                .theme-option-v3.active {
                    background: var(--primary);
                    color: #000;
                    font-weight: bold;
                }
                
                .theme-option-icon {
                    font-size: 24px;
                }
                
                .theme-option-name {
                    font-size: 14px;
                    font-weight: 600;
                }
                
                @media (max-width: 768px) {
                    #theme-switcher-v3 {
                        bottom: 20px;
                        right: 20px;
                    }
                    
                    .theme-fab {
                        width: 50px;
                        height: 50px;
                        font-size: 24px;
                    }
                }
            </style>
            
            <div class="theme-fab" id="theme-fab">
                ${this.themes[this.currentTheme].icon}
            </div>
            <div class="theme-options-v3" id="theme-options-v3"></div>
        `;
        
        document.body.appendChild(switcher);
        
        // Заполнить опции
        const optionsContainer = document.getElementById('theme-options-v3');
        Object.entries(this.themes).forEach(([key, theme]) => {
            const option = document.createElement('div');
            option.className = `theme-option-v3 ${key === this.currentTheme ? 'active' : ''}`;
            option.dataset.theme = key;
            option.innerHTML = `
                <span class="theme-option-icon">${theme.icon}</span>
                <span class="theme-option-name">${theme.name}</span>
            `;
            option.addEventListener('click', () => {
                this.selectTheme(key);
                optionsContainer.classList.remove('active');
            });
            optionsContainer.appendChild(option);
        });
        
        // Клик по кнопке
        document.getElementById('theme-fab').addEventListener('click', () => {
            optionsContainer.classList.toggle('active');
        });
        
        // Закрытие при клике вне
        document.addEventListener('click', (e) => {
            if (!switcher.contains(e.target)) {
                optionsContainer.classList.remove('active');
            }
        });
    }
    
    selectTheme(themeName) {
        if (!this.themes[themeName]) return;
        
        localStorage.setItem('site_theme_v3', themeName);
        this.currentTheme = themeName;
        
        this.applyTheme(themeName);
        
        // Обновить UI
        document.querySelectorAll('.theme-option-v3').forEach(opt => {
            opt.classList.toggle('active', opt.dataset.theme === themeName);
        });
        
        // Обновить иконку
        document.getElementById('theme-fab').innerHTML = this.themes[themeName].icon;
        
        // Уведомление
        this.showNotification(themeName);
    }
    
    applyTheme(themeName) {
        const theme = this.themes[themeName];
        if (!theme) return;
        
        // Применить CSS переменные
        const root = document.documentElement;
        Object.entries(theme.css).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
        
        // Применить шрифты
        this.applyFonts(theme.fonts);
        
        // Применить фон
        this.applyBackground(theme);
        
        // Применить стили блоков
        this.applyBlockStyles(theme);
        
        // Применить анимации
        this.applyAnimations(theme);
        
        // Событие для других скриптов
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme: themeName, config: theme }
        }));
    }
    
    applyFonts(fonts) {
        // Добавить шрифты если их нет
        const fontsToLoad = [
            // Power Metal
            'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Cinzel+Decorative:wght@700&display=swap',
            // Gothic
            'https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600&family=Old+Standard+TT:wght@400;700&display=swap',
            // Punk Rock
            'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Anton&family=Oswald:wght@300;500;700&family=Barlow+Condensed:wght@400;600&display=swap',
            // Heavy Metal
            'https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Bungee&family=Rajdhani:wght@400;600;700&family=Exo+2:wght@400;700&display=swap',
            // Symphonic
            'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Cormorant+Garamond:wght@400;600&family=Montserrat:wght@300;400;600&display=swap',
            // Dark Ambient
            'https://fonts.googleapis.com/css2?family=Raleway:wght@200;400;600&family=Quicksand:wght@300;400;600&family=Inter:wght@300;400;600&display=swap',
            // Base fonts
            'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&family=Lato:wght@300;400;700&display=swap'
        ];
        
        fontsToLoad.forEach(url => {
            if (!document.querySelector(`link[href="${url}"]`)) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = url;
                document.head.appendChild(link);
            }
        });
        
        // Применить к элементам
        const style = document.getElementById('theme-fonts') || document.createElement('style');
        style.id = 'theme-fonts';
        style.innerHTML = `
            h1, h2, h3, h4, h5, h6, .heading, .title {
                font-family: ${fonts.heading} !important;
            }
            
            body, p, div, span, a, li, td, input, textarea {
                font-family: ${fonts.body} !important;
            }
            
            /* Мобильная адаптация размеров шрифтов */
            @media (max-width: 768px) {
                h1 { font-size: clamp(1.8rem, 5vw, 2.5rem) !important; }
                h2 { font-size: clamp(1.4rem, 4vw, 2rem) !important; }
                h3 { font-size: clamp(1.2rem, 3.5vw, 1.5rem) !important; }
                body, p { font-size: clamp(14px, 2.5vw, 16px) !important; }
                button, .btn { font-size: clamp(13px, 2.5vw, 16px) !important; }
            }
            
            @media (max-width: 480px) {
                h1 { font-size: 1.6rem !important; }
                h2 { font-size: 1.3rem !important; }
                h3 { font-size: 1.1rem !important; }
                body, p { font-size: 14px !important; }
            }
        `;
        document.head.appendChild(style);
    }
    
    applyBackground(theme) {
        document.body.style.background = theme.css['--bg-gradient'];
        
        if (theme.css['--bg-pattern'] && theme.css['--bg-pattern'] !== 'none') {
            document.body.style.backgroundImage = `${theme.css['--bg-pattern']}, ${theme.css['--bg-gradient']}`;
            document.body.style.backgroundSize = '60px 60px, cover';
        }
    }
    
    applyBlockStyles(theme) {
        const themeName = this.currentTheme;
        const style = document.getElementById('theme-blocks') || document.createElement('style');
        style.id = 'theme-blocks';
        style.innerHTML = `
            /* Карточки и панели */
            .page-content, .card, .panel, .album-showcase-card, .blog-card, .news-item {
                ${theme.blockStyles.card}
                /* animation: ${theme.animations.cardAppear}; */
                opacity: 1
                transition: all 0.3s ease;
            }
            
            .page-content::before, .card::before, .panel::before {
                ${theme.blockStyles.cardBefore}
            }
            
            .page-content:hover, .card:hover, .panel:hover, .album-showcase-card:hover {
                ${theme.blockStyles.cardHover}
            }
            
            .page-content:hover::before, .card:hover::before {
                opacity: 0.1;
            }
            
            /* Заголовки */
            h1, h2, h3, .section-title, .page-title {
                ${theme.blockStyles.heading}
            }
            
            /* Кнопки */
            button, .btn, input[type="submit"] {
                font-family: ${theme.fonts.body};
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
                animation: ${theme.animations.buttonPulse};
                transition: all 0.3s ease;
            }
            
            button:hover, .btn:hover {
                transform: var(--hover-transform);
            }
            
            /* Навигация */
            .navbar, .site-nav, header {
                backdrop-filter: blur(10px);
                background: var(--bg-card) !important;
                border-bottom: var(--border-width) solid var(--border);
            }
            
            .nav-link {
                font-family: ${theme.fonts.body};
                color: var(--text);
                transition: all 0.3s;
            }
            
            .nav-link:hover {
                color: var(--primary);
                text-shadow: var(--glow);
            }
            
            /* Таблицы */
            table {
                border: var(--border-width) solid var(--border);
            }
            
            th {
                background: var(--primary);
                color: #000;
                font-family: ${theme.fonts.heading};
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            tr:hover {
                background: rgba(255,255,255,0.05);
            }
            
            /* Формы */
            input, textarea, select {
                background: rgba(0,0,0,0.5);
                border: 1px solid var(--border);
                color: var(--text);
                font-family: ${theme.fonts.body};
            }
            
            input:focus, textarea:focus {
                border-color: var(--primary);
                box-shadow: 0 0 15px var(--primary);
            }
            
            /* Ссылки */
            a {
                color: var(--secondary);
                text-decoration: none;
                transition: all 0.3s;
            }
            
            a:hover {
                color: var(--primary);
                text-shadow: var(--glow);
            }
            
            /* Специальные элементы для каждой темы */
            ${themeName === 'power-metal' ? `
                .album-showcase-card {
                    border-top: 4px solid #FFD700;
                    border-bottom: 4px solid #FFD700;
                }
                
                .blog-card::after {
                    content: '⚔️';
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 24px;
                    opacity: 0.2;
                }
            ` : ''}
            
            ${themeName === 'gothic-metal' ? `
                .album-showcase-card {
                    border-left: 4px solid #9D00FF;
                    border-right: 4px solid #9D00FF;
                }
                
                .blog-card {
                    border-radius: 0;
                    clip-path: polygon(0 0, 100% 0, 98% 100%, 2% 100%);
                }
                
                .news-item::before {
                    content: '†';
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    font-size: 30px;
                    opacity: 0.15;
                    color: #9D00FF;
                }
            ` : ''}
            
            ${themeName === 'punk-rock' ? `
                .album-showcase-card {
                    transform: rotate(-1deg);
                    border: 3px solid #FF0080;
                }
                
                .album-showcase-card:hover {
                    transform: rotate(1deg) scale(1.05);
                }
                
                .blog-card {
                    background: repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 10px,
                        rgba(255, 0, 128, 0.1) 10px,
                        rgba(255, 0, 128, 0.1) 20px
                    ), var(--bg-card);
                }
                
                .news-item {
                    border-left: 5px solid #FF0080;
                    border-right: 5px solid #00FFFF;
                }
            ` : ''}
            
            ${themeName === 'heavy-metal' ? `
                .album-showcase-card {
                    border-bottom: 5px solid #FF0000;
                    box-shadow: 0 10px 30px rgba(255, 0, 0, 0.3);
                }
                
                .blog-card {
                    background: linear-gradient(
                        to bottom,
                        rgba(255, 0, 0, 0.1) 0%,
                        transparent 50%
                    ), var(--bg-card);
                }
                
                .news-item::after {
                    content: '🔥';
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    font-size: 20px;
                    animation: fireburn 3s infinite;
                }
            ` : ''}
            
            ${themeName === 'symphonic-metal' ? `
                .album-showcase-card {
                    border: 1px solid rgba(135, 206, 235, 0.5);
                    box-shadow: 0 0 30px rgba(135, 206, 235, 0.2);
                }
                
                .blog-card {
                    background: radial-gradient(
                        circle at top right,
                        rgba(135, 206, 235, 0.1),
                        transparent 50%
                    ), var(--bg-card);
                }
                
                .news-item {
                    border-top: 1px solid;
                    border-bottom: 1px solid;
                    border-image: linear-gradient(90deg, #87CEEB, #C0C0C0, #87CEEB) 1;
                }
            ` : ''}
            
            ${themeName === 'dark-ambient' ? `
                .album-showcase-card,
                .blog-card,
                .news-item {
                    border: none;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);
                }
                
                .album-showcase-card:hover,
                .blog-card:hover,
                .news-item:hover {
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
                }
            ` : ''}
            
            /* Мобильная адаптация */
            @media (max-width: 768px) {
                .page-content, .card, .panel {
                    padding: 15px;
                    margin-bottom: 15px;
                }
                
                .album-showcase-card {
                    transform: none !important;
                }
                
                h1, h2, h3 {
                    word-break: break-word;
                }
                
                /* Упрощаем анимации на мобильных */
                  {
                    animation-duration: 0.3s !important;
                }
                
                
                
                /* Убираем сложные эффекты hover на тач-устройствах */
                @media (hover: none) {
                    .page-content:hover,
                    .card:hover,
                    .panel:hover {
                        transform: none !important;
                    }
                }
            }
            
            @media (max-width: 480px) {
                .page-content, .card, .panel {
                    padding: 10px;
                    border-width: 1px;
                }
                
                /* Отключаем декоративные элементы на маленьких экранах */
                .page-content::before,
                .card::before,
                .panel::before,
                .blog-card::after,
                .news-item::before,
                .news-item::after {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
applyAnimations(theme) {
    if (window.innerWidth < 768) {
            return; // Не запускаем анимации появления на мобильных
        }
        // Добавить анимации к элементам при появлении
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // БЫЛО:
                    // entry.target.style.animation = theme.animations.cardAppear;
                    // СТАЛО:
                    entry.target.style.animation = `${theme.animations.cardAppear} forwards`;
                    
                    observer.unobserve(entry.target); // Эту строку мы уже добавляли
                }
            });
        });
        
        document.querySelectorAll('.card, .panel, .album-showcase-card').forEach(el => {
            observer.observe(el);
        });
    }
    
observeDOM() {
        // Следить за добавлением новых элементов
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    // --- VVV ДОБАВЬ ЭТИ 3 СТРОКИ VVV ---
                    if (window.innerWidth < 768) {
                        return; // Не анимируем новые элементы на мобильных
                    }
                    // Новая, более эффективная логика:
                    // Мы просто ищем новые элементы и вешаем на них IntersectionObserver
                    // для анимации, вместо полного перезапуска applyTheme()
                    
                    const theme = this.themes[this.currentTheme];
                    if (!theme) return;

                    const animObserver = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                entry.target.style.animation = theme.animations.cardAppear;
                                animObserver.unobserve(entry.target); // Анимируем один раз
                            }
                        });
                    });

                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) { // ELEMENT_NODE
                            // Ищем нужные нам элементы ВНУТРИ добавленного узла
                            const elementsToAnimate = node.querySelectorAll('.card, .panel, .album-showcase-card, .blog-card, .news-item');
                            elementsToAnimate.forEach(el => animObserver.observe(el));
                            
                            // А также проверяем, не является ли САМ узел нужным нам элементом
                            if (node.matches('.card, .panel, .album-showcase-card, .blog-card, .news-item')) {
                                animObserver.observe(node);
                            }
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    showNotification(themeName) {
        const theme = this.themes[themeName];
        const notification = document.createElement('div');
        notification.className = 'theme-notification-v3';
        notification.innerHTML = `
            <style>
                .theme-notification-v3 {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(0);
                    background: var(--bg-card);
                    border: var(--border-width) solid var(--primary);
                    border-radius: var(--radius-large);
                    padding: 20px 40px;
                    color: var(--primary);
                    font-size: 24px;
                    font-weight: bold;
                    font-family: ${theme.fonts.heading};
                    box-shadow: var(--glow);
                    z-index: 10001;
                    animation: notificationPop 0.5s forwards;
                }
                
                @keyframes notificationPop {
                    to {
                        transform: translate(-50%, -50%) scale(1);
                    }
                }
            </style>
            ${theme.icon} ${theme.name}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'notificationPop 0.5s reverse';
            setTimeout(() => notification.remove(), 500);
        }, 2000);
    }
}

// Автозапуск
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.advancedThemeSystem = new AdvancedThemeSystem();
    });
} else {
    window.advancedThemeSystem = new AdvancedThemeSystem();
}