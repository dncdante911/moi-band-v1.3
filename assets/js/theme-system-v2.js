/**
 * ═══════════════════════════════════════════════════════════════
 * MASTER OF ILLUSION - ADVANCED THEME SYSTEM V3.2 ULTRA
 * ═══════════════════════════════════════════════════════════════
 * 
 * 🎨 ЭПИЧНАЯ СИСТЕМА ТЕМ С:
 * ✅ 6 ПОЛНОСТЬЮ УНИКАЛЬНЫХ ТЕМ
 * ✅ ИСПРАВЛЕНИЕ НЕВИДИМЫХ АЛЬБОМОВ НА МОБИЛКАХ
 * ✅ КРУТЫЕ АНИМАЦИИ И ЭФФЕКТЫ
 * ✅ АДАПТИВНОСТЬ ДЛЯ ВСЕХ УСТРОЙСТВ
 * ✅ ПРОФЕССИОНАЛЬНАЯ ТИПОГРАФИКА
 * 
 * Автор: AI Assistant
 * Версия: 3.2 ULTRA
 * Дата: 2025
 * ═══════════════════════════════════════════════════════════════
 */

class AdvancedThemeSystem {
    constructor() {
        this.currentTheme = localStorage.getItem('site_theme_v3') || 'power-metal';
        this.isMobile = window.innerWidth <= 768;
        this.themes = {
            //  ═════════════════════════════════════
            //  ⚔️ POWER METAL - ЭПИЧНАЯ ГЕРОИКА
            //  ═════════════════════════════════════
            'power-metal': {
                name: 'Power Metal',
                icon: '⚔️',
                description: 'Героическая эпичность с золотым свечением',
                fonts: {
                    heading: "'Cinzel', 'Cinzel Decorative', serif",
                    body: "'Roboto', sans-serif"
                },
                css: {
                    '--primary': '#FFD700',
                    '--secondary': '#FFA500',
                    '--accent': '#FF4500',
                    '--bg-main': '#0a0a0a',
                    '--bg-card': 'linear-gradient(135deg, rgba(26, 20, 16, 0.95), rgba(40, 30, 20, 0.95))',
                    '--text': '#FFE4B5',
                    '--text-muted': '#B8860B',
                    '--border': '#FFD700',
                    '--glow': '0 0 30px rgba(255, 215, 0, 0.6)',
                    '--shadow': '0 10px 40px rgba(255, 165, 0, 0.3)',
                    '--hover-transform': 'translateY(-5px) scale(1.03)',
                    '--radius': '8px',
                    '--radius-large': '15px',
                    '--border-width': '2px',
                    '--bg-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1410 50%, #0a0a0a 100%)',
                    '--bg-pattern': `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                },
                blockStyles: {
                    card: `
                        background: linear-gradient(135deg, rgba(26, 20, 16, 0.95), rgba(40, 30, 20, 0.95));
                        border: 2px solid #FFD700;
                        border-radius: 8px;
                        position: relative;
                        overflow: hidden;
                        box-shadow: 0 5px 20px rgba(255, 215, 0, 0.2);
                    `,
                    cardBefore: `
                        content: '';
                        position: absolute;
                        top: -2px;
                        left: -2px;
                        right: -2px;
                        bottom: -2px;
                        background: linear-gradient(45deg, #FFD700, #FFA500, #FFD700);
                        opacity: 0;
                        z-index: -1;
                        border-radius: 8px;
                        transition: opacity 0.3s ease;
                    `,
                    cardHover: `
                        transform: translateY(-5px) scale(1.02);
                        border-color: #FFA500;
                        box-shadow: 0 15px 50px rgba(255, 215, 0, 0.4), 0 0 30px rgba(255, 215, 0, 0.3);
                    `,
                    heading: `
                        font-family: 'Cinzel Decorative', serif;
                        color: #FFD700;
                        text-shadow: 0 0 20px rgba(255, 215, 0, 0.6), 2px 2px 4px rgba(0, 0, 0, 0.8);
                        letter-spacing: 2px;
                        text-transform: uppercase;
                    `
                },
                animations: {
                    cardAppear: 'heroicEntry 0.6s ease-out',
                    buttonPulse: 'goldPulse 2s infinite',
                    textGlow: 'epicGlow 3s infinite'
                },
                special: {
                    albumDecoration: '⚔️',
                    buttonIcon: '✨',
                    accentPattern: 'cross'
                }
            },

            //  ═════════════════════════════════════
            //  🦇 GOTHIC METAL - ТЕМНАЯ МАГИЯ
            //  ═════════════════════════════════════
            'gothic-metal': {
                name: 'Gothic Metal',
                icon: '🦇',
                description: 'Мистическая атмосфера с фиолетовым свечением',
                fonts: {
                    heading: "'Crimson Text', 'Old Standard TT', serif",
                    body: "'Lato', sans-serif"
                },
                css: {
                    '--primary': '#9D00FF',
                    '--secondary': '#6A0DAD',
                    '--accent': '#FF1493',
                    '--bg-main': '#0d0208',
                    '--bg-card': 'linear-gradient(135deg, rgba(20, 10, 30, 0.95), rgba(40, 20, 50, 0.95))',
                    '--text': '#E6D5FF',
                    '--text-muted': '#9D7BAD',
                    '--border': '#9D00FF',
                    '--glow': '0 0 40px rgba(157, 0, 255, 0.7)',
                    '--shadow': '0 15px 50px rgba(106, 13, 173, 0.5)',
                    '--hover-transform': 'translateY(-6px) scale(1.03) rotate(-1deg)',
                    '--radius': '12px',
                    '--radius-large': '20px',
                    '--border-width': '2px',
                    '--bg-gradient': 'linear-gradient(180deg, #0d0208 0%, #1a0520 50%, #0d0208 100%)',
                    '--bg-pattern': `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239D00FF' fill-opacity='0.03'%3E%3Cpath d='M40,0 L20,20 L40,40 L60,20 Z M0,40 L20,60 L40,40 L20,20 Z M40,40 L60,60 L80,40 L60,20 Z M40,40 L20,60 L0,80 L20,100 Z'/%3E%3C/g%3E%3C/svg%3E")`
                },
                blockStyles: {
                    card: `
                        background: linear-gradient(135deg, rgba(20, 10, 30, 0.95), rgba(40, 20, 50, 0.95));
                        border: 2px solid #9D00FF;
                        border-radius: 12px;
                        position: relative;
                        overflow: hidden;
                        box-shadow: 0 8px 30px rgba(157, 0, 255, 0.3), inset 0 0 20px rgba(157, 0, 255, 0.05);
                    `,
                    cardBefore: `
                        content: '🦇';
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        font-size: 40px;
                        opacity: 0.1;
                        animation: gothicFloat 6s ease-in-out infinite;
                        pointer-events: none;
                    `,
                    cardHover: `
                        transform: translateY(-8px) rotate(-2deg) scale(1.03);
                        border-color: #FF1493;
                        box-shadow: 0 20px 60px rgba(157, 0, 255, 0.6), 
                                    0 0 40px rgba(255, 20, 147, 0.4),
                                    inset 0 0 30px rgba(157, 0, 255, 0.1);
                        filter: drop-shadow(0 0 15px #9D00FF);
                    `,
                    heading: `
                        font-family: 'Crimson Text', serif;
                        color: #E6D5FF;
                        text-shadow: 0 0 30px rgba(157, 0, 255, 0.8), 
                                     2px 2px 6px rgba(0, 0, 0, 0.9);
                        letter-spacing: 3px;
                        font-style: italic;
                        font-weight: 600;
                    `
                },
                animations: {
                    cardAppear: 'gothicFade 0.8s ease-out',
                    buttonPulse: 'purplePulse 2.5s infinite',
                    textGlow: 'gothicGlow 4s infinite'
                },
                special: {
                    albumDecoration: '🦇',
                    buttonIcon: '✞',
                    accentPattern: 'diamond'
                }
            },

            //  ═════════════════════════════════════
            //  🤘 PUNK ROCK - КИБЕРПАНК ХАОС
            //  ═════════════════════════════════════
            'punk-rock': {
                name: 'Punk Rock',
                icon: '🤘',
                description: 'Энергичный киберпанк с неоновыми эффектами',
                fonts: {
                    heading: "'Bebas Neue', 'Anton', sans-serif",
                    body: "'Oswald', 'Barlow Condensed', sans-serif"
                },
                css: {
                    '--primary': '#FF0080',
                    '--secondary': '#00FFFF',
                    '--accent': '#FFFF00',
                    '--bg-main': '#000000',
                    '--bg-card': 'linear-gradient(135deg, rgba(20, 0, 20, 0.95), rgba(40, 0, 40, 0.95))',
                    '--text': '#FFFFFF',
                    '--text-muted': '#FF00FF',
                    '--border': '#FF0080',
                    '--glow': '0 0 40px rgba(255, 0, 128, 0.8), 0 0 80px rgba(0, 255, 255, 0.4)',
                    '--shadow': '5px 5px 0 #00FFFF, -5px -5px 0 #FFFF00, 0 0 40px rgba(255, 0, 128, 0.5)',
                    '--hover-transform': 'translateY(-6px) scale(1.05) rotate(2deg)',
                    '--radius': '0px',
                    '--radius-large': '0px',
                    '--border-width': '3px',
                    '--bg-gradient': 'repeating-linear-gradient(45deg, #000 0, #000 2px, #111 2px, #111 4px)',
                    '--bg-pattern': `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FF0080' fill-opacity='0.05'%3E%3Cpolygon points='10,0 0,10 10,20 20,10'/%3E%3C/g%3E%3C/svg%3E")`
                },
                blockStyles: {
                    card: `
                        background: linear-gradient(135deg, rgba(20, 0, 20, 0.95), rgba(40, 0, 40, 0.95));
                        border: 3px solid #FF0080;
                        transform: skew(-1deg, -0.5deg);
                        position: relative;
                        overflow: visible;
                        box-shadow: 5px 5px 0 #00FFFF, -3px -3px 0 #FFFF00;
                    `,
                    cardBefore: `
                        content: '⚡';
                        position: absolute;
                        top: -15px;
                        left: -15px;
                        font-size: 50px;
                        color: #FFFF00;
                        opacity: 0.4;
                        animation: punkShake 0.5s infinite;
                        transform: rotate(-15deg);
                        filter: drop-shadow(0 0 10px #FFFF00);
                    `,
                    cardHover: `
                        transform: skew(-1deg, -0.5deg) scale(1.08) rotate(-2deg);
                        border-color: #00FFFF;
                        box-shadow: 8px 8px 0 #FF0080, -8px -8px 0 #00FFFF, 
                                    0 0 50px #FF0080, 0 0 80px #00FFFF;
                        filter: contrast(1.3) saturate(1.5);
                    `,
                    heading: `
                        font-family: 'Bebas Neue', sans-serif;
                        text-transform: uppercase;
                        letter-spacing: 4px;
                        background: linear-gradient(45deg, #FF0080, #00FFFF, #FFFF00, #FF0080);
                        background-size: 300% 300%;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        animation: punkGradient 3s ease infinite;
                        text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.8);
                        transform: skew(-5deg);
                        filter: drop-shadow(0 0 10px #FF0080);
                    `
                },
                animations: {
                    cardAppear: 'punkSlam 0.4s ease-out',
                    buttonPulse: 'punkGlitch 1s infinite',
                    textGlow: 'neonFlicker 2s infinite'
                },
                special: {
                    albumDecoration: '⚡',
                    buttonIcon: '💥',
                    accentPattern: 'chaos'
                }
            },

            //  ═════════════════════════════════════
            //  🔥 HEAVY METAL - ОГНЕННЫЙ АД
            //  ═════════════════════════════════════
            'heavy-metal': {
                name: 'Heavy Metal',
                icon: '🔥',
                description: 'Адское пламя с красным свечением',
                fonts: {
                    heading: "'Black Ops One', 'Bungee', sans-serif",
                    body: "'Rajdhani', 'Exo 2', sans-serif"
                },
                css: {
                    '--primary': '#FF4500',
                    '--secondary': '#DC143C',
                    '--accent': '#FFD700',
                    '--bg-main': '#0a0000',
                    '--bg-card': 'linear-gradient(135deg, rgba(30, 10, 0, 0.95), rgba(50, 0, 0, 0.95))',
                    '--text': '#FFA07A',
                    '--text-muted': '#CD5C5C',
                    '--border': '#FF4500',
                    '--glow': '0 0 50px rgba(255, 69, 0, 0.8), 0 0 100px rgba(220, 20, 60, 0.4)',
                    '--shadow': '0 20px 60px rgba(255, 69, 0, 0.6)',
                    '--hover-transform': 'translateY(-10px) scale(1.08)',
                    '--radius': '4px',
                    '--radius-large': '10px',
                    '--border-width': '3px',
                    '--bg-gradient': 'radial-gradient(ellipse at top, #1a0000, #0a0000)',
                    '--bg-pattern': `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FF4500' fill-opacity='0.04'%3E%3Cpath d='M20 0 L30 20 L20 40 L10 20 Z M0 20 L10 30 L20 20 L10 10 Z M20 20 L30 30 L40 20 L30 10 Z'/%3E%3C/g%3E%3C/svg%3E")`
                },
                blockStyles: {
                    card: `
                        background: linear-gradient(135deg, rgba(30, 10, 0, 0.95), rgba(50, 0, 0, 0.95));
                        border: 3px solid #FF4500;
                        border-radius: 4px;
                        position: relative;
                        overflow: hidden;
                        box-shadow: 0 10px 40px rgba(255, 69, 0, 0.4), 
                                    inset 0 0 30px rgba(255, 69, 0, 0.1);
                    `,
                    cardBefore: `
                        content: '🔥';
                        position: absolute;
                        bottom: -20px;
                        right: -20px;
                        font-size: 80px;
                        opacity: 0.15;
                        animation: fireburn 4s ease-in-out infinite;
                        transform: translate(-50%, -50%);
                    `,
                    cardHover: `
                        transform: translateY(-12px) scale(1.10) rotateY(5deg);
                        border-color: #DC143C;
                        box-shadow: 0 25px 70px rgba(255, 69, 0, 0.8), 
                                    0 0 60px rgba(220, 20, 60, 0.6),
                                    inset 0 0 40px rgba(255, 69, 0, 0.2);
                        filter: brightness(1.3) drop-shadow(0 0 20px #FF4500);
                    `,
                    heading: `
                        font-family: 'Black Ops One', sans-serif;
                        color: #FF4500;
                        text-shadow: 0 0 40px rgba(255, 69, 0, 0.9), 
                                     0 0 20px rgba(220, 20, 60, 0.7),
                                     3px 3px 6px rgba(0, 0, 0, 0.9);
                        letter-spacing: 3px;
                        text-transform: uppercase;
                        animation: fireGlow 2s infinite;
                    `
                },
                animations: {
                    cardAppear: 'metalRise 0.7s ease-out',
                    buttonPulse: 'firePulse 1.5s infinite',
                    textGlow: 'fireGlow 2s infinite'
                },
                special: {
                    albumDecoration: '🔥',
                    buttonIcon: '💀',
                    accentPattern: 'fire'
                }
            },

            //  ═════════════════════════════════════
            //  🎻 SYMPHONIC METAL - КОРОЛЕВСКАЯ ЭЛЕГАНТНОСТЬ
            //  ═════════════════════════════════════
            'symphonic-metal': {
                name: 'Symphonic',
                icon: '🎻',
                description: 'Оркестровая величественность с синим сиянием',
                fonts: {
                    heading: "'Playfair Display', 'Cormorant Garamond', serif",
                    body: "'Montserrat', sans-serif"
                },
                css: {
                    '--primary': '#4169E1',
                    '--secondary': '#9370DB',
                    '--accent': '#DA70D6',
                    '--bg-main': '#08080F',
                    '--bg-card': 'linear-gradient(135deg, rgba(15, 10, 30, 0.95), rgba(25, 15, 45, 0.95))',
                    '--text': '#E6E6FA',
                    '--text-muted': '#B0A8D2',
                    '--border': '#4169E1',
                    '--glow': '0 0 35px rgba(65, 105, 225, 0.7)',
                    '--shadow': '0 12px 45px rgba(147, 112, 219, 0.4)',
                    '--hover-transform': 'translateY(-8px) scale(1.05)',
                    '--radius': '16px',
                    '--radius-large': '24px',
                    '--border-width': '2px',
                    '--bg-gradient': 'linear-gradient(160deg, #08080F 0%, #151030 50%, #08080F 100%)',
                    '--bg-pattern': `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234169E1' fill-opacity='0.03'%3E%3Ccircle cx='50' cy='50' r='40'/%3E%3Ccircle cx='50' cy='50' r='30'/%3E%3Ccircle cx='50' cy='50' r='20'/%3E%3Ccircle cx='50' cy='50' r='10'/%3E%3C/g%3E%3C/svg%3E")`
                },
                blockStyles: {
                    card: `
                        background: linear-gradient(135deg, rgba(15, 10, 30, 0.95), rgba(25, 15, 45, 0.95));
                        border: 2px solid #4169E1;
                        border-radius: 16px;
                        position: relative;
                        overflow: hidden;
                        box-shadow: 0 10px 40px rgba(65, 105, 225, 0.3), 
                                    inset 0 0 25px rgba(65, 105, 225, 0.05);
                    `,
                    cardBefore: `
                        content: '♪';
                        position: absolute;
                        top: 15px;
                        left: 15px;
                        font-size: 60px;
                        opacity: 0.1;
                        animation: musicalNote 8s ease-in-out infinite;
                        color: #9370DB;
                    `,
                    cardHover: `
                        transform: translateY(-10px) scale(1.06) rotateX(3deg);
                        border-color: #9370DB;
                        box-shadow: 0 18px 60px rgba(65, 105, 225, 0.6), 
                                    0 0 40px rgba(147, 112, 219, 0.5),
                                    inset 0 0 35px rgba(65, 105, 225, 0.1);
                        filter: drop-shadow(0 0 20px #4169E1);
                    `,
                    heading: `
                        font-family: 'Playfair Display', serif;
                        color: #E6E6FA;
                        text-shadow: 0 0 30px rgba(65, 105, 225, 0.8), 
                                     2px 2px 5px rgba(0, 0, 0, 0.8);
                        letter-spacing: 2px;
                        font-weight: 700;
                        font-style: italic;
                    `
                },
                animations: {
                    cardAppear: 'orchestralRise 0.9s ease-out',
                    buttonPulse: 'silverShimmer 3s infinite',
                    textGlow: 'celestialGlow 4s infinite'
                },
                special: {
                    albumDecoration: '🎻',
                    buttonIcon: '♪',
                    accentPattern: 'circles'
                }
            },

            //  ═════════════════════════════════════
            //  🌑 DARK AMBIENT - МИНИМАЛИСТИЧНАЯ ТЬМА
            //  ═════════════════════════════════════
            'dark-ambient': {
                name: 'Dark Ambient',
                icon: '🌑',
                description: 'Минималистичная элегантность в темноте',
                fonts: {
                    heading: "'Raleway', sans-serif",
                    body: "'Inter', 'Quicksand', sans-serif"
                },
                css: {
                    '--primary': '#708090',
                    '--secondary': '#A9A9A9',
                    '--accent': '#C0C0C0',
                    '--bg-main': '#0D0D0D',
                    '--bg-card': 'linear-gradient(135deg, rgba(20, 20, 20, 0.95), rgba(30, 30, 30, 0.95))',
                    '--text': '#D3D3D3',
                    '--text-muted': '#808080',
                    '--border': '#696969',
                    '--glow': '0 0 25px rgba(112, 128, 144, 0.5)',
                    '--shadow': '0 8px 35px rgba(0, 0, 0, 0.8)',
                    '--hover-transform': 'translateY(-5px) scale(1.02)',
                    '--radius': '12px',
                    '--radius-large': '18px',
                    '--border-width': '1px',
                    '--bg-gradient': 'linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 50%, #0D0D0D 100%)',
                    '--bg-pattern': 'none'
                },
                blockStyles: {
                    card: `
                        background: linear-gradient(135deg, rgba(20, 20, 20, 0.95), rgba(30, 30, 30, 0.95));
                        border: 1px solid #696969;
                        border-radius: 12px;
                        position: relative;
                        overflow: hidden;
                        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.7);
                        backdrop-filter: blur(5px);
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
                        transform: translateY(-6px) scale(1.03);
                        border-color: #A9A9A9;
                        box-shadow: 0 10px 40px rgba(112, 128, 144, 0.5), 
                                    0 5px 20px rgba(0, 0, 0, 0.8);
                        filter: brightness(1.15);
                    `,
                    heading: `
                        font-family: 'Raleway', sans-serif;
                        color: #A9A9A9;
                        text-shadow: 0 0 20px rgba(112, 128, 144, 0.5);
                        letter-spacing: 4px;
                        font-weight: 200;
                        text-transform: lowercase;
                    `
                },
                animations: {
                    cardAppear: 'fadeInSlow 1.2s ease-out',
                    buttonPulse: 'none',
                    textGlow: 'none'
                },
                special: {
                    albumDecoration: '○',
                    buttonIcon: '◆',
                    accentPattern: 'minimal'
                }
            }
        };
        
        this.init();
    }
    
    // ═══════════════════════════════════════════════════════════════
    // ИНИЦИАЛИЗАЦИЯ СИСТЕМЫ
    // ═══════════════════════════════════════════════════════════════
    
    init() {
        console.log('🎨 Инициализация Advanced Theme System v3.2');
        
        // Загружаем шрифты
        this.loadAllFonts();
        
        // Внедряем анимации
        this.injectAnimations();
        
        // ✅ КРИТИЧЕСКИЙ ФИКС: Исправляем мобильные альбомы
        this.fixMobileAlbums();
        
        // Создаем UI переключатель
        this.createThemeSwitcher();
        
        // Применяем текущую тему
        this.applyTheme(this.currentTheme);
        
        // Следим за изменениями DOM
        this.observeDOM();
        
        // Синхронизация между вкладками
        window.addEventListener('storage', (e) => {
            if (e.key === 'site_theme_v3') {
                this.applyTheme(e.newValue);
            }
        });
        
        // 🔥 ФИКС: Следим за изменением размера окна
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth <= 768;
            
            if (wasMobile !== this.isMobile) {
                console.log('📱 Размер изменился:', this.isMobile ? 'МОБИЛКА' : 'ДЕСКТОП');
                this.applyTheme(this.currentTheme);
            }
        });
        
        console.log('✅ Theme System готов!');
    }


    // ═══════════════════════════════════════════════════════════════
    // МЕТОДЫ СИСТЕМЫ - ПРОДОЛЖЕНИЕ
    // ═══════════════════════════════════════════════════════════════
    
    // ═══════════════════════════════════════════════════════════════
    // ✅ КРИТИЧЕСКИЙ ФИКС: МОБИЛЬНЫЕ АЛЬБОМЫ
    // ═══════════════════════════════════════════════════════════════
    
    fixMobileAlbums() {
        const style = document.createElement('style');
        style.id = 'mobile-album-fix';
        style.innerHTML = `
            /* ✅ ФИКС НЕВИДИМЫХ АЛЬБОМОВ НА МОБИЛКАХ */
            @media (max-width: 768px) {
                .album-showcase-card,
                .album-card,
                .blog-card,
                .news-card,
                .news-item,
                .card,
                .panel {
                    opacity: 1 !important;
                    visibility: visible !important;
                    animation: none !important;
                }
                
                /* Упрощенные эффекты для тач-устройств */
                @media (hover: none) {
                    .album-showcase-card:hover,
                    .album-card:hover,
                    .card:hover {
                        transform: translateY(-2px) !important;
                        animation: none !important;
                    }
                }
                
                /* Отключаем сложные ::before на мобилках */
                .album-showcase-card::before,
                .card::before,
                .panel::before {
                    display: none !important;
                }
            }
            
            @media (max-width: 480px) {
                /* Еще больше упрощаем для маленьких экранов */
                .album-showcase-card,
                .card {
                    border-width: 1px !important;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.3) !important;
                }
            }
        `;
        document.head.appendChild(style);
        console.log('✅ Мобильные альбомы исправлены!');
    }
    
    // ═══════════════════════════════════════════════════════════════
    // ЗАГРУЗКА ШРИФТОВ
    // ═══════════════════════════════════════════════════════════════
    
    loadAllFonts() {
        const fontsToLoad = [
            'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Cinzel+Decorative:wght@700&display=swap',
            'https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600&family=Old+Standard+TT:wght@400;700&display=swap',
            'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Anton&family=Oswald:wght@300;500;700&family=Barlow+Condensed:wght@400;600&display=swap',
            'https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Bungee&family=Rajdhani:wght@400;600;700&family=Exo+2:wght@400;700&display=swap',
            'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Cormorant+Garamond:wght@400;600&family=Montserrat:wght@300;400;600&display=swap',
            'https://fonts.googleapis.com/css2?family=Raleway:wght@200;400;600&family=Quicksand:wght@300;400;600&family=Inter:wght@300;400;600&display=swap',
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
    }
    
    // ═══════════════════════════════════════════════════════════════
    // ПРИМЕНЕНИЕ ТЕМЫ
    // ═══════════════════════════════════════════════════════════════
    
    applyTheme(themeName) {
        const theme = this.themes[themeName];
        if (!theme) return;
        
        console.log(`🎨 Применение темы: ${theme.name}`);
        
        // Применяем CSS переменные
        this.applyCSS(theme);
        
        // Применяем шрифты
        this.applyFonts(theme.fonts);
        
        // Применяем фон
        this.applyBackground(theme);
        
        // Применяем стили блоков
        this.applyBlockStyles(theme);
        
        // Применяем анимации к элементам
        if (!this.isMobile) {
            this.applyAnimations(theme);
        }
        
        // Событие для других скриптов
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme: themeName, config: theme }
        }));
    }
    
    applyCSS(theme) {
        const root = document.documentElement;
        Object.entries(theme.css).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
    }
    
    applyFonts(fonts) {
        const style = document.getElementById('theme-fonts') || document.createElement('style');
        style.id = 'theme-fonts';
        style.innerHTML = `
            h1, h2, h3, h4, h5, h6, .heading, .title, .section-title {
                font-family: ${fonts.heading} !important;
            }
            
            body, p, div, span, a, li, td, input, textarea, button {
                font-family: ${fonts.body} !important;
            }
            
            @media (max-width: 768px) {
                h1 { font-size: clamp(1.8rem, 5vw, 2.5rem) !important; }
                h2 { font-size: clamp(1.4rem, 4vw, 2rem) !important; }
                h3 { font-size: clamp(1.2rem, 3.5vw, 1.5rem) !important; }
                body, p { font-size: clamp(14px, 2.5vw, 16px) !important; }
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
        
        const specialDecoration = theme.special?.albumDecoration || '';
        
        style.innerHTML = `
            /* === КАРТОЧКИ И ПАНЕЛИ === */
            .page-content, .card, .panel, .album-showcase-card, .blog-card, .news-item {
                ${theme.blockStyles.card}
                opacity: 1 !important;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .page-content::before, .card::before, .panel::before,
            .album-showcase-card::before {
                ${theme.blockStyles.cardBefore}
            }
            
            .page-content:hover, .card:hover, .panel:hover, 
            .album-showcase-card:hover {
                ${theme.blockStyles.cardHover}
            }
            
            /* === ЗАГОЛОВКИ === */
            h1, h2, h3, .section-title, .page-title {
                ${theme.blockStyles.heading}
            }
            
            /* === КНОПКИ === */
            button, .btn, input[type="submit"], input[type="button"], .control-btn {
                font-family: ${theme.fonts.body};
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1.5px;
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                color: #000;
                border: 2px solid var(--primary);
                padding: 12px 28px;
                border-radius: var(--radius);
                cursor: pointer;
                transition: all 0.3s ease;
                animation: ${theme.animations.buttonPulse};
            }
            
            button:hover, .btn:hover {
                transform: var(--hover-transform);
                box-shadow: var(--glow);
                filter: brightness(1.2);
            }
            
            /* === НАВИГАЦИЯ === */
            .navbar, .site-nav, header {
                backdrop-filter: blur(15px);
                background: var(--bg-card) !important;
                border-bottom: var(--border-width) solid var(--border);
            }
            
            .nav-link {
                font-family: ${theme.fonts.body};
                color: var(--text);
                transition: all 0.3s;
                position: relative;
            }
            
            .nav-link:hover {
                color: var(--primary);
                text-shadow: var(--glow);
            }
            
            .nav-link::after {
                content: '';
                position: absolute;
                bottom: -2px;
                left: 0;
                width: 0;
                height: 2px;
                background: var(--primary);
                transition: width 0.3s ease;
            }
            
            .nav-link:hover::after {
                width: 100%;
            }
            
            /* === СПЕЦИАЛЬНЫЕ ЭЛЕМЕНТЫ ДЛЯ КАЖДОЙ ТЕМЫ === */
            ${themeName === 'punk-rock' ? `
                .album-showcase-card,
                .card {
                    clip-path: polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%);
                }
                
                button, .btn {
                    clip-path: polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%);
                }
            ` : ''}
            
            ${themeName === 'heavy-metal' ? `
                .album-showcase-card::after {
                    content: '${specialDecoration}';
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 30px;
                    opacity: 0.3;
                    animation: fireburn 3s infinite;
                }
            ` : ''}
            
            ${themeName === 'gothic-metal' ? `
                .album-showcase-card {
                    box-shadow: 0 0 20px rgba(157, 0, 255, 0.3), 
                                inset 0 0 30px rgba(157, 0, 255, 0.05);
                }
            ` : ''}
            
            /* === АДАПТИВНОСТЬ === */
            @media (max-width: 768px) {
                .page-content, .card, .panel {
                    padding: 15px;
                }
                
                button, .btn {
                    padding: 10px 20px;
                    font-size: 14px;
                }
                
                h1, h2, h3 {
                    word-break: break-word;
                }
                
                /* 🔥 КРИТИЧЕСКИЙ ФИКС: АЛЬБОМЫ ВИДНЫ НА МОБИЛКАХ */
                .album-showcase-card,
                .album-card,
                .card,
                .blog-card,
                .news-item,
                .panel {
                    opacity: 1 !important;
                    visibility: visible !important;
                    animation: none !important;
                    transform: none !important;
                }
                
                /* Упрощенный hover для тач-устройств */
                .album-showcase-card:active,
                .card:active {
                    transform: scale(0.98) !important;
                    transition: transform 0.1s ease !important;
                }
                
                /* Отключаем все ::before декорации */
                .album-showcase-card::before,
                .card::before,
                .panel::before {
                    display: none !important;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // ═══════════════════════════════════════════════════════════════
    // ВНЕДРЕНИЕ АНИМАЦИЙ
    // ═══════════════════════════════════════════════════════════════
    
    injectAnimations() {
        const style = document.createElement('style');
        style.id = 'theme-animations';
        style.innerHTML = `
            /* ⚔️ POWER METAL */
            @keyframes heroicEntry {
                from { opacity: 0; transform: translateY(30px) scale(0.95); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes goldPulse {
                0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.4); }
                50% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.8); }
            }
            @keyframes epicGlow {
                0%, 100% { text-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
                50% { text-shadow: 0 0 40px rgba(255, 215, 0, 0.9); }
            }
            
            /* 🦇 GOTHIC METAL */
            @keyframes gothicFade {
                from { opacity: 0; filter: blur(5px); }
                to { opacity: 1; filter: blur(0); }
            }
            @keyframes purplePulse {
                0%, 100% { box-shadow: 0 0 15px rgba(157, 0, 255, 0.4); }
                50% { box-shadow: 0 0 30px rgba(157, 0, 255, 0.8); }
            }
            @keyframes gothicGlow {
                0%, 100% { text-shadow: 0 0 15px rgba(157, 0, 255, 0.5); }
                50% { text-shadow: 0 0 30px rgba(157, 0, 255, 0.9); }
            }
            @keyframes gothicFloat {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                25% { transform: translateY(-10px) rotate(-5deg); }
                75% { transform: translateY(10px) rotate(5deg); }
            }
            
            /* 🤘 PUNK ROCK */
            @keyframes punkSlam {
                0% { opacity: 0; transform: scale(1.5) rotate(15deg); }
                50% { transform: scale(0.95) rotate(-2deg); }
                100% { opacity: 1; transform: scale(1) rotate(0); }
            }
            @keyframes punkShake {
                0%, 100% { transform: translateX(0) rotate(-15deg); }
                25% { transform: translateX(-3px) rotate(-18deg); }
                75% { transform: translateX(3px) rotate(-12deg); }
            }
            @keyframes punkGlitch {
                0%, 100% { box-shadow: 2px 2px 0 #FF0080, -2px -2px 0 #00FFFF; }
                25% { box-shadow: -2px 2px 0 #00FFFF, 2px -2px 0 #FF0080; }
                50% { box-shadow: 2px -2px 0 #FFFF00, -2px 2px 0 #FF0080; }
                75% { box-shadow: -2px -2px 0 #FF0080, 2px 2px 0 #FFFF00; }
            }
            @keyframes neonFlicker {
                0%, 100% { opacity: 1; }
                30% { opacity: 0.8; }
                31% { opacity: 1; }
                32% { opacity: 0.8; }
                33% { opacity: 1; }
            }
            @keyframes punkGradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            /* 🔥 HEAVY METAL */
            @keyframes metalRise {
                0% { opacity: 0; transform: translateY(50px) scale(0.9); filter: brightness(0); }
                50% { filter: brightness(1.5); }
                100% { opacity: 1; transform: translateY(0) scale(1); filter: brightness(1); }
            }
            @keyframes firePulse {
                0%, 100% { box-shadow: 0 0 30px rgba(255, 69, 0, 0.6); }
                50% { box-shadow: 0 0 60px rgba(255, 51, 51, 0.9); }
            }
            @keyframes fireGlow {
                0%, 100% { text-shadow: 0 0 20px rgba(255, 0, 0, 0.6); }
                33% { text-shadow: 0 0 40px rgba(255, 100, 0, 0.8); }
                66% { text-shadow: 0 0 35px rgba(255, 200, 0, 0.7); }
            }
            @keyframes fireburn {
                0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.15; }
                50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.25; }
            }
            
            /* 🎻 SYMPHONIC */
            @keyframes orchestralRise {
                0% { opacity: 0; transform: translateY(20px); filter: blur(3px); }
                100% { opacity: 1; transform: translateY(0); filter: blur(0); }
            }
            @keyframes silverShimmer {
                0%, 100% { box-shadow: 0 0 20px rgba(65, 105, 225, 0.4); }
                50% { box-shadow: 0 0 40px rgba(147, 112, 219, 0.6); }
            }
            @keyframes celestialGlow {
                0%, 100% { text-shadow: 0 0 15px rgba(65, 105, 225, 0.4); }
                50% { text-shadow: 0 0 30px rgba(147, 112, 219, 0.8); }
            }
            @keyframes musicalNote {
                0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.1; }
                25% { transform: translateY(-15px) rotate(10deg); opacity: 0.2; }
                75% { transform: translateY(15px) rotate(-10deg); opacity: 0.2; }
            }
            
            /* 🌑 DARK AMBIENT */
            @keyframes fadeInSlow {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            /* ОБЩИЕ */
            @keyframes floatButton {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    applyAnimations(theme) {
        // 🔥 КРИТИЧЕСКИЙ ФИКС: На мобилках НЕ применяем анимации
        if (this.isMobile) {
            console.log('📱 Мобилка detected - анимации отключены');
            // Принудительно делаем все видимым
            document.querySelectorAll('.card, .panel, .album-showcase-card, .blog-card, .news-item').forEach(el => {
                el.style.opacity = '1';
                el.style.visibility = 'visible';
                el.style.animation = 'none';
            });
            return;
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = `${theme.animations.cardAppear} forwards`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.card, .panel, .album-showcase-card, .blog-card').forEach(el => {
            observer.observe(el);
        });
    }
    
    observeDOM() {
        if (this.isMobile) return;
        
        const observer = new MutationObserver((mutations) => {
            const theme = this.themes[this.currentTheme];
            if (!theme) return;
            
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) {
                            const elements = node.querySelectorAll('.card, .panel, .album-showcase-card');
                            elements.forEach(el => {
                                el.style.animation = `${theme.animations.cardAppear} forwards`;
                            });
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
    
    // ═══════════════════════════════════════════════════════════════
    // СОЗДАНИЕ UI ПЕРЕКЛЮЧАТЕЛЯ
    // ═══════════════════════════════════════════════════════════════
    
    createThemeSwitcher() {
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
                    transform: scale(1.15) rotate(180deg);
                    box-shadow: var(--glow);
                }
                
                .theme-options-v3 {
                    position: absolute;
                    bottom: 75px;
                    right: 0;
                    background: var(--bg-card);
                    border: var(--border-width) solid var(--border);
                    border-radius: var(--radius-large);
                    padding: 15px;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(20px) scale(0.9);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    min-width: 220px;
                    box-shadow: var(--shadow);
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
                    padding: 14px 18px;
                    margin: 6px 0;
                    border-radius: var(--radius);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    background: rgba(0,0,0,0.3);
                    border: 1px solid transparent;
                }
                
                .theme-option-v3:hover {
                    background: var(--primary);
                    color: #000;
                    transform: translateX(5px);
                    border-color: var(--secondary);
                }
                
                .theme-option-v3.active {
                    background: var(--primary);
                    color: #000;
                    font-weight: bold;
                    border-color: var(--accent);
                }
                
                .theme-option-icon {
                    font-size: 24px;
                    filter: drop-shadow(0 0 5px var(--primary));
                }
                
                .theme-option-name {
                    font-size: 14px;
                    font-weight: 600;
                    letter-spacing: 0.5px;
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
                    
                    .theme-options-v3 {
                        bottom: 65px;
                        right: -10px;
                        min-width: 200px;
                    }
                }
            </style>
            
            <div class="theme-fab" id="theme-fab">
                ${this.themes[this.currentTheme].icon}
            </div>
            <div class="theme-options-v3" id="theme-options-v3"></div>
        `;
        
        document.body.appendChild(switcher);
        
        // Заполняем опции
        const optionsContainer = document.getElementById('theme-options-v3');
        Object.entries(this.themes).forEach(([key, theme]) => {
            const option = document.createElement('div');
            option.className = `theme-option-v3 ${key === this.currentTheme ? 'active' : ''}`;
            option.dataset.theme = key;
            option.title = theme.description;
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
        
        // Обработчики событий
        document.getElementById('theme-fab').addEventListener('click', (e) => {
            e.stopPropagation();
            optionsContainer.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
            if (!switcher.contains(e.target)) {
                optionsContainer.classList.remove('active');
            }
        });
    }
    
    // ═══════════════════════════════════════════════════════════════
    // ВЫБОР ТЕМЫ
    // ═══════════════════════════════════════════════════════════════
    
    selectTheme(themeName) {
        if (!this.themes[themeName]) return;
        
        localStorage.setItem('site_theme_v3', themeName);
        this.currentTheme = themeName;
        
        this.applyTheme(themeName);
        
        // Обновляем UI
        document.querySelectorAll('.theme-option-v3').forEach(opt => {
            opt.classList.toggle('active', opt.dataset.theme === themeName);
        });
        
        document.getElementById('theme-fab').innerHTML = this.themes[themeName].icon;
        
        this.showNotification(themeName);
    }
    
    showNotification(themeName) {
        const theme = this.themes[themeName];
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: var(--bg-card);
            border: 3px solid var(--primary);
            border-radius: var(--radius-large);
            padding: 25px 45px;
            color: var(--primary);
            font-size: 26px;
            font-weight: bold;
            font-family: ${theme.fonts.heading};
            box-shadow: var(--glow);
            z-index: 10001;
            animation: notificationPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        `;
        notification.innerHTML = `${theme.icon} ${theme.name}`;
        
        const keyframes = `
            @keyframes notificationPop {
                to { transform: translate(-50%, -50%) scale(1); }
            }
        `;
        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'notificationPop 0.4s reverse';
            setTimeout(() => {
                notification.remove();
                style.remove();
            }, 400);
        }, 2000);
    }
}

// ═══════════════════════════════════════════════════════════════
// 🔥 КРИТИЧЕСКИЙ МОБИЛЬНЫЙ ФИКС
// ═══════════════════════════════════════════════════════════════

function forceMobileCardsFix() {
    if (window.innerWidth <= 768) {
        console.log('🔧 Применяю мобильный фикс...');
        
        const selectors = [
            '.album-showcase-card',
            '.album-card', 
            '.card',
            '.blog-card',
            '.news-card',
            '.news-item',
            '.panel'
        ];
        
        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.style.opacity = '1';
                el.style.visibility = 'visible';
                el.style.animation = 'none';
                el.style.transform = 'none';
            });
        });
    }
}

// ═══════════════════════════════════════════════════════════════
// АВТОЗАПУСК СИСТЕМЫ
// ═══════════════════════════════════════════════════════════════

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.advancedThemeSystem = new AdvancedThemeSystem();
        console.log('🎨 Theme System v3.2 ULTRA загружен!');
        
        // Применяем фикс через 100мс, 500мс и 1сек
        setTimeout(forceMobileCardsFix, 100);
        setTimeout(forceMobileCardsFix, 500);
        setTimeout(forceMobileCardsFix, 1000);
    });
} else {
    window.advancedThemeSystem = new AdvancedThemeSystem();
    console.log('🎨 Theme System v3.2 ULTRA загружен!');
    
    // Применяем фикс сразу и с задержками
    forceMobileCardsFix();
    setTimeout(forceMobileCardsFix, 100);
    setTimeout(forceMobileCardsFix, 500);
}