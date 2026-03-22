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
                    heading: "'Bebas Neue', 'Cinzel Decorative', sans-serif",
                    body: "'Montserrat', 'Roboto', sans-serif"
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
                    heading: "'IM Fell English SC', 'Cinzel', serif",
                    body: "'Crimson Text', serif"
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
                    '--hover-transform': 'translateY(-5px) scale(1.02)',
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
                        transform: translateY(-6px) scale(1.02);
                        border-color: #FF1493;
                        box-shadow: 0 15px 40px rgba(157, 0, 255, 0.5),
                                    0 0 20px rgba(255, 20, 147, 0.3);
                        filter: drop-shadow(0 0 10px #9D00FF);
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
                    heading: "'Oswald', 'Bebas Neue', sans-serif",
                    body: "'Roboto Condensed', sans-serif"
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
                    '--hover-transform': 'translateY(-4px) scale(1.03)',
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
                        transform: skew(-1deg, -0.5deg) scale(1.05);
                        border-color: #00FFFF;
                        box-shadow: 6px 6px 0 #FF0080, -6px -6px 0 #00FFFF,
                                    0 0 30px #FF0080;
                        filter: contrast(1.2) saturate(1.3);
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
                        transform: translateY(-8px) scale(1.06);
                        border-color: #DC143C;
                        box-shadow: 0 20px 50px rgba(255, 69, 0, 0.6),
                                    0 0 30px rgba(220, 20, 60, 0.4);
                        filter: brightness(1.2) drop-shadow(0 0 15px #FF4500);
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
                        transform: translateY(-7px) scale(1.04);
                        border-color: #9370DB;
                        box-shadow: 0 15px 45px rgba(65, 105, 225, 0.5),
                                    0 0 25px rgba(147, 112, 219, 0.4);
                        filter: drop-shadow(0 0 15px #4169E1);
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
                description: 'Минималистичная элегантность в темноте (Literary Dark)',
                fonts: {
                    heading: "'Playfair Display', serif",
                    body: "'Merriweather', serif"
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

        // observeDOM() отключён — MutationObserver на body subtree слишком дорогой
        
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
        // Загружаем только шрифты текущей темы (не все 7 семейств сразу)
        const theme = this.themes[this.currentTheme];
        if (!theme) return;
        this._loadThemeFonts(theme.fonts);
    }

    _loadThemeFonts(fonts) {
        // Строим один URL из двух шрифтов темы
        const families = [fonts.heading, fonts.body]
            .join(',')
            .match(/'([^']+)'/g)
            ?.map(f => f.replace(/'/g, '').replace(/ /g, '+'))
            .filter((v, i, a) => a.indexOf(v) === i) || [];

        if (!families.length) return;

        const url = `https://fonts.googleapis.com/css2?family=${families.map(f => `${f}:wght@400;700`).join('&family=')}&display=swap`;
        if (!document.querySelector(`link[data-theme-font="${this.currentTheme}"]`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            link.dataset.themeFont = this.currentTheme;
            document.head.appendChild(link);
        }
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
        
        // Подгружаем шрифты только этой темы (если ещё не загружены)
        this._loadThemeFonts(theme.fonts);
        this.applyFonts(theme.fonts);
        
        // Применяем фон
        this.applyBackground(theme);

        // SVG-декор в hero-баннере главной страницы (если он есть на странице)
        this._applyHeroSVGDecor(themeName);
        // SVG-декор в баннере страницы альбома (если есть)
        this._applyAlbumBannerDecor(themeName);

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
        let style = document.getElementById('theme-fonts');
        if (!style) {
            style = document.createElement('style');
            style.id = 'theme-fonts';
            document.head.appendChild(style);
        }
        style.innerHTML = `
            /* Заголовки получают heading-шрифт темы */
            h1, h2, h3, h4, h5, h6, .heading, .title, .section-title,
            .hero-title, .album-title, .track-title {
                font-family: ${fonts.heading} !important;
            }

            /* Логотип — тоже heading-шрифт; выглядит эффектно */
            .logo, .logo a {
                font-family: ${fonts.heading} !important;
                white-space: nowrap !important;
                letter-spacing: 0.05em !important;
            }

            /* Весь остальной текст — body-шрифт */
            body, p, span, td, li, input, textarea, button:not(.nav-link) {
                font-family: ${fonts.body} !important;
            }

            /* Навигационные ссылки — НЕ меняем, чтобы они не переносились.
               Разные шрифты имеют разную ширину глифов и ломают layout хедера. */
            .main-nav a, .main-nav li, .nav-link,
            .hamburger-menu {
                font-family: inherit !important;
                white-space: nowrap !important;
            }

            @media (max-width: 768px) {
                h1 { font-size: clamp(1.8rem, 5vw, 2.5rem) !important; }
                h2 { font-size: clamp(1.4rem, 4vw, 2rem) !important; }
                h3 { font-size: clamp(1.2rem, 3.5vw, 1.5rem) !important; }
                body, p { font-size: clamp(14px, 2.5vw, 16px) !important; }
            }
        `;
    }

    applyBackground(theme) {
        // Градиент на body (дёшево — GPU-слой не создаём)
        document.body.style.background    = theme.css['--bg-gradient'];
        document.body.style.backgroundImage = '';
        document.body.style.backgroundSize  = '';

        // Уникальный SVG-декор для каждой темы — фиксированный слой z-index:-1
        // Статичный inline SVG, без анимаций → никаких repaints.
        this._applyThemeSVGDecor(this.currentTheme);
    }

    _applyThemeSVGDecor(themeName) {
        let el = document.getElementById('theme-svg-decor');
        if (!el) {
            el = document.createElement('div');
            el.id = 'theme-svg-decor';
            el.style.cssText =
                'position:fixed;top:0;left:0;width:100%;height:100%;' +
                'pointer-events:none;z-index:0;overflow:hidden;opacity:1;' +
                'transition:opacity .5s ease;';
            document.body.insertBefore(el, document.body.firstChild);
        }

        // Плавная смена: сначала fade out, потом меняем SVG, потом fade in
        el.style.opacity = '0';
        setTimeout(() => {
            el.innerHTML = this._themeSVGs[themeName] || '';
            el.style.opacity = '1';
        }, 300);
    }

    get _themeSVGs() {
        return {
            // ──────────────────────────────────────────────────────
            // ⚔️ POWER METAL — перекрещённые мечи и щит
            // ──────────────────────────────────────────────────────
            'power-metal': `<svg width="100%" height="100%" viewBox="0 0 1440 900"
                xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<style>
@keyframes pm-b{0%,100%{opacity:1}50%{opacity:.5}}
@keyframes pm-f{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes pm-c{0%,100%{opacity:.16}50%{opacity:.3}}
.pm-glow{animation:pm-b 8s ease-in-out infinite}
.pm-rays{animation:pm-b 10s ease-in-out infinite 2s}
.pm-sl{animation:pm-f 7s ease-in-out infinite;transform-box:fill-box}
.pm-sr{animation:pm-f 7s ease-in-out infinite .7s;transform-box:fill-box}
.pm-crown{animation:pm-c 4s ease-in-out infinite}
[data-layer]{transition:transform .2s ease-out}
</style>
                <defs>
                    <radialGradient id="pm-glow" cx="50%" cy="40%" r="55%">
                        <stop offset="0%" stop-color="#FFD700" stop-opacity="0.12"/>
                        <stop offset="100%" stop-color="#000" stop-opacity="0"/>
                    </radialGradient>
                    <filter id="pm-blur"><feGaussianBlur stdDeviation="2"/></filter>
                </defs>
                <!-- Фоновое свечение -->
                <rect width="100%" height="100%" fill="url(#pm-glow)"/>
                <!-- Меч 1 (диагональ \\) -->
                <g opacity="0.07" filter="url(#pm-blur)" transform="translate(720,450)">
                    <line x1="-220" y1="-320" x2="220" y2="320" stroke="#FFD700" stroke-width="12" stroke-linecap="round"/>
                    <polygon points="-220,-320 -230,-340 -210,-340" fill="#FFD700"/>
                    <rect x="-18" y="-60" width="36" height="14" rx="3" fill="#FFD700"/>
                    <!-- Меч 2 (диагональ /) -->
                    <line x1="220" y1="-320" x2="-220" y2="320" stroke="#FFD700" stroke-width="12" stroke-linecap="round"/>
                    <polygon points="220,-320 230,-340 210,-340" fill="#FFD700"/>
                </g>
                <!-- Щит по центру -->
                <g opacity="0.06" transform="translate(720,430)">
                    <path d="M0,-90 L70,-50 L70,20 Q70,80 0,110 Q-70,80 -70,20 L-70,-50 Z"
                          fill="none" stroke="#FFD700" stroke-width="4"/>
                    <text x="0" y="20" text-anchor="middle" font-size="40"
                          fill="#FFD700" font-family="serif">✦</text>
                </g>
                <!-- Угловые орнаменты -->
                <g opacity="0.05" stroke="#FFD700" stroke-width="2" fill="none">
                    <path d="M0,0 L80,0 L80,80 M0,0 L0,80 L80,80" transform="translate(20,20)"/>
                    <path d="M0,0 L-80,0 L-80,80 M0,0 L0,80 L-80,80" transform="translate(1420,20)"/>
                    <path d="M0,0 L80,0 L80,-80 M0,0 L0,-80 L80,-80" transform="translate(20,880)"/>
                    <path d="M0,0 L-80,0 L-80,-80 M0,0 L0,-80 L-80,-80" transform="translate(1420,880)"/>
                </g>
                <!-- Лучи рассвета снизу -->
                <g opacity="0.04" stroke="#FFD700" stroke-width="1">
                    <line x1="720" y1="900" x2="200" y2="300"/>
                    <line x1="720" y1="900" x2="400" y2="250"/>
                    <line x1="720" y1="900" x2="600" y2="220"/>
                    <line x1="720" y1="900" x2="720" y2="210"/>
                    <line x1="720" y1="900" x2="840" y2="220"/>
                    <line x1="720" y1="900" x2="1040" y2="250"/>
                    <line x1="720" y1="900" x2="1240" y2="300"/>
                </g>
            </svg>`,

            // ──────────────────────────────────────────────────────
            // 🦇 GOTHIC METAL — готические окна и летучие мыши
            // ──────────────────────────────────────────────────────
            'gothic-metal': `<svg width="100%" height="100%" viewBox="0 0 1440 900"
                xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<style>
@keyframes gm-b{0%,100%{opacity:1}50%{opacity:.5}}
@keyframes gm-b1{0%,100%{transform:translate(0,0)}50%{transform:translate(18px,-14px)}}
@keyframes gm-b2{0%,100%{transform:translate(0,0)}50%{transform:translate(-14px,-10px)}}
@keyframes gm-b3{0%,100%{transform:translate(0,0)}50%{transform:translate(10px,-8px)}}
@keyframes gm-b4{0%,100%{transform:translate(0,0)}50%{transform:translate(-8px,-12px)}}
@keyframes gm-m{0%,100%{opacity:.35}50%{opacity:.15}}
.gm-arch{animation:gm-b 9s ease-in-out infinite}
.gm-bat1{animation:gm-b1 5.5s ease-in-out infinite;transform-box:fill-box}
.gm-bat2{animation:gm-b2 6.5s ease-in-out infinite 1s;transform-box:fill-box}
.gm-bat3{animation:gm-b3 5s ease-in-out infinite .5s;transform-box:fill-box}
.gm-bat4{animation:gm-b4 7s ease-in-out infinite 1.5s;transform-box:fill-box}
.gm-moon{animation:gm-m 6s ease-in-out infinite}
[data-layer]{transition:transform .2s ease-out}
</style>
                <defs>
                    <radialGradient id="gm-glow" cx="50%" cy="30%" r="60%">
                        <stop offset="0%" stop-color="#9D00FF" stop-opacity="0.15"/>
                        <stop offset="100%" stop-color="#000" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#gm-glow)"/>
                <!-- Готическое окно по центру-верху -->
                <g opacity="0.08" stroke="#9D00FF" stroke-width="2" fill="none"
                   transform="translate(620,30)">
                    <path d="M0,0 L0,300 M200,0 L200,300"/>
                    <path d="M0,0 Q100,-80 200,0"/>
                    <!-- Переплёт -->
                    <line x1="0" y1="120" x2="200" y2="120"/>
                    <line x1="100" y1="0" x2="100" y2="300"/>
                    <!-- Розетка -->
                    <circle cx="100" cy="60" r="35"/>
                    <circle cx="100" cy="60" r="20"/>
                    <circle cx="100" cy="60" r="6"/>
                    <line x1="65" y1="60" x2="135" y2="60"/>
                    <line x1="100" y1="25" x2="100" y2="95"/>
                    <line x1="75" y1="35" x2="125" y2="85"/>
                    <line x1="125" y1="35" x2="75" y2="85"/>
                </g>
                <!-- Летучие мыши -->
                <g opacity="0.1" fill="#9D00FF">
                    <path d="M0,0 Q-15,-10 -30,0 Q-15,8 0,0 Q15,-10 30,0 Q15,8 0,0 Z
                             M0,0 L0,12 M-6,0 L-10,8 M6,0 L10,8"
                          transform="translate(200,150) scale(1.4)"/>
                    <path d="M0,0 Q-15,-10 -30,0 Q-15,8 0,0 Q15,-10 30,0 Q15,8 0,0 Z"
                          transform="translate(1100,200) scale(1.8)"/>
                    <path d="M0,0 Q-12,-8 -24,0 Q-12,6 0,0 Q12,-8 24,0 Q12,6 0,0 Z"
                          transform="translate(350,300) scale(1.2)"/>
                    <path d="M0,0 Q-12,-8 -24,0 Q-12,6 0,0 Q12,-8 24,0 Q12,6 0,0 Z"
                          transform="translate(1200,120) scale(1.0)"/>
                </g>
                <!-- Кельтские узлы в углах -->
                <g opacity="0.06" stroke="#FF1493" stroke-width="1.5" fill="none">
                    <circle cx="60" cy="60" r="40"/>
                    <circle cx="60" cy="60" r="25"/>
                    <path d="M60,20 L60,100 M20,60 L100,60"/>
                    <path d="M34,34 L86,86 M86,34 L34,86"/>
                    <circle cx="1380" cy="60" r="40"/>
                    <circle cx="1380" cy="60" r="25"/>
                    <path d="M1380,20 L1380,100 M1340,60 L1420,60"/>
                    <path d="M1354,34 L1406,86 M1406,34 L1354,86"/>
                </g>
            </svg>`,

            // ──────────────────────────────────────────────────────
            // 🤘 PUNK ROCK — анархия, молнии, хаос
            // ──────────────────────────────────────────────────────
            'punk-rock': `<svg width="100%" height="100%" viewBox="0 0 1440 900"
                xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<style>
@keyframes pr-fl{0%,85%,100%{opacity:.28}90%{opacity:.52}95%{opacity:.35}}
@keyframes pr-fr{0%,80%,100%{opacity:.28}87%{opacity:.5}93%{opacity:.32}}
@keyframes pr-tw{0%,100%{opacity:.45}50%{opacity:.9}}
@keyframes pr-a{0%,100%{opacity:.07}50%{opacity:.12}}
.pr-bolt-l{animation:pr-fl 2.8s ease-in-out infinite}
.pr-bolt-r{animation:pr-fr 3.2s ease-in-out infinite .4s}
.pr-star1{animation:pr-tw 1.6s ease-in-out infinite}
.pr-star2{animation:pr-tw 2.1s ease-in-out infinite .4s}
.pr-star3{animation:pr-tw 1.9s ease-in-out infinite .8s}
.pr-star4{animation:pr-tw 2.4s ease-in-out infinite 1.2s}
.pr-anarchy{animation:pr-a 5s ease-in-out infinite}
[data-layer]{transition:transform .2s ease-out}
</style>
                <defs>
                    <linearGradient id="pr-diag" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#FF0080" stop-opacity="0.06"/>
                        <stop offset="50%" stop-color="#00FFFF" stop-opacity="0.04"/>
                        <stop offset="100%" stop-color="#FFFF00" stop-opacity="0.05"/>
                    </linearGradient>
                </defs>
                <!-- Диагональные полосы -->
                <g opacity="1" stroke="#FF0080" stroke-width="1">
                    <line x1="-100" y1="200" x2="600" y2="-100" opacity="0.05"/>
                    <line x1="100" y1="400" x2="800" y2="100" opacity="0.04"/>
                    <line x1="300" y1="600" x2="1000" y2="300" opacity="0.03"/>
                    <line x1="600" y1="900" x2="1300" y2="600" opacity="0.04"/>
                    <line x1="900" y1="900" x2="1440" y2="560" opacity="0.03"/>
                </g>
                <!-- Большой анарх (A) по центру -->
                <g opacity="0.05" stroke="#FF0080" stroke-width="3" fill="none"
                   transform="translate(620,250)">
                    <path d="M100,300 L0,0 L200,0 L100,300"/>
                    <circle cx="100" cy="150" r="110"/>
                    <line x1="10" y1="140" x2="190" y2="140"/>
                </g>
                <!-- Молнии -->
                <g opacity="0.08" fill="#FFFF00">
                    <polygon points="120,100 100,180 125,180 105,280 155,170 130,170 155,100"
                             transform="translate(80,60)"/>
                    <polygon points="120,100 100,180 125,180 105,280 155,170 130,170 155,100"
                             transform="translate(1200,120) scale(0.8)"/>
                </g>
                <!-- Штриховка углов (хаос) -->
                <g opacity="0.04" stroke="#00FFFF" stroke-width="1">
                    <line x1="0" y1="0" x2="150" y2="150"/>
                    <line x1="30" y1="0" x2="180" y2="150"/>
                    <line x1="60" y1="0" x2="200" y2="140"/>
                    <line x1="1290" y1="0" x2="1440" y2="150"/>
                    <line x1="1320" y1="0" x2="1440" y2="120"/>
                    <line x1="1360" y1="0" x2="1440" y2="80"/>
                </g>
            </svg>`,

            // ──────────────────────────────────────────────────────
            // 🔥 HEAVY METAL — череп и пламя
            // ──────────────────────────────────────────────────────
            'heavy-metal': `<svg width="100%" height="100%" viewBox="0 0 1440 900"
                xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<style>
@keyframes hm-f1{0%,100%{transform:scaleY(1) translateY(0)}50%{transform:scaleY(1.07) translateY(-9px)}}
@keyframes hm-f2{0%,100%{transform:scaleY(1) translateY(0)}50%{transform:scaleY(1.05) translateY(-6px)}}
@keyframes hm-sp{0%,100%{opacity:.45}50%{opacity:.75}}
@keyframes hm-g{0%,100%{opacity:1}50%{opacity:.6}}
.hm-flame-l{animation:hm-f1 2.6s ease-in-out infinite;transform-box:fill-box;transform-origin:bottom}
.hm-flame-r{animation:hm-f1 2.6s ease-in-out infinite .5s;transform-box:fill-box;transform-origin:bottom}
.hm-flame-c{animation:hm-f2 2s ease-in-out infinite .2s;transform-box:fill-box;transform-origin:bottom}
.hm-spark{animation:hm-sp 1.4s ease-in-out infinite}
.hm-glow{animation:hm-g 4s ease-in-out infinite}
[data-layer]{transition:transform .2s ease-out}
</style>
                <defs>
                    <radialGradient id="hm-fire" cx="50%" cy="100%" r="70%">
                        <stop offset="0%" stop-color="#FF4500" stop-opacity="0.25"/>
                        <stop offset="40%" stop-color="#DC143C" stop-opacity="0.12"/>
                        <stop offset="100%" stop-color="#000" stop-opacity="0"/>
                    </radialGradient>
                    <radialGradient id="hm-top" cx="50%" cy="0%" r="40%">
                        <stop offset="0%" stop-color="#FF6600" stop-opacity="0.08"/>
                        <stop offset="100%" stop-color="#000" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#hm-fire)"/>
                <rect width="100%" height="100%" fill="url(#hm-top)"/>
                <!-- Языки пламени снизу -->
                <g opacity="0.12" fill="#FF4500">
                    <path d="M0,900 Q120,700 80,550 Q140,650 200,900 Z"/>
                    <path d="M200,900 Q280,720 240,580 Q320,680 360,900 Z"/>
                    <path d="M400,900 Q500,680 440,500 Q540,620 580,900 Z"/>
                    <path d="M640,900 Q740,650 700,480 Q800,600 840,900 Z"/>
                    <path d="M880,900 Q960,700 920,560 Q1000,660 1040,900 Z"/>
                    <path d="M1080,900 Q1160,720 1120,580 Q1200,680 1240,900 Z"/>
                    <path d="M1260,900 Q1350,700 1320,560 Q1380,660 1440,900 Z"/>
                </g>
                <!-- Череп (абстрактный) по центру -->
                <g opacity="0.06" stroke="#FF4500" stroke-width="3" fill="none"
                   transform="translate(660,320)">
                    <!-- Голова -->
                    <ellipse cx="60" cy="50" rx="60" ry="65"/>
                    <!-- Глазницы -->
                    <ellipse cx="35" cy="45" rx="18" ry="20"/>
                    <ellipse cx="85" cy="45" rx="18" ry="20"/>
                    <!-- Нос -->
                    <path d="M55,72 L65,72 L60,85 Z"/>
                    <!-- Зубы -->
                    <line x1="30" y1="105" x2="90" y2="105"/>
                    <line x1="40" y1="105" x2="40" y2="118"/>
                    <line x1="52" y1="105" x2="52" y2="120"/>
                    <line x1="64" y1="105" x2="64" y2="120"/>
                    <line x1="76" y1="105" x2="76" y2="118"/>
                    <!-- Нижняя челюсть -->
                    <path d="M28,105 Q30,130 60,135 Q90,130 92,105"/>
                </g>
                <!-- Узоры по бокам -->
                <g opacity="0.05" stroke="#DC143C" stroke-width="2" fill="none">
                    <path d="M0,400 Q50,350 0,300 Q50,250 0,200"/>
                    <path d="M1440,400 Q1390,350 1440,300 Q1390,250 1440,200"/>
                </g>
            </svg>`,

            // ──────────────────────────────────────────────────────
            // 🎻 SYMPHONIC METAL — нотный стан и скрипичный ключ
            // ──────────────────────────────────────────────────────
            'symphonic-metal': `<svg width="100%" height="100%" viewBox="0 0 1440 900"
                xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<style>
@keyframes sm-sw{0%,100%{transform:rotate(-2.5deg)}50%{transform:rotate(2.5deg)}}
@keyframes sm-fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes sm-tw{0%,100%{opacity:.42}50%{opacity:.9}}
@keyframes sm-b{0%,100%{opacity:1}50%{opacity:.55}}
.sm-clef{animation:sm-sw 9s ease-in-out infinite;transform-box:fill-box;transform-origin:bottom center}
.sm-notes{animation:sm-fl 7s ease-in-out infinite;transform-box:fill-box}
.sm-star1{animation:sm-tw 2s ease-in-out infinite}
.sm-star2{animation:sm-tw 2.8s ease-in-out infinite .5s}
.sm-star3{animation:sm-tw 2.3s ease-in-out infinite 1s}
.sm-star4{animation:sm-tw 3.1s ease-in-out infinite 1.5s}
.sm-star5{animation:sm-tw 1.8s ease-in-out infinite .3s}
.sm-frame{animation:sm-b 8s ease-in-out infinite}
[data-layer]{transition:transform .2s ease-out}
</style>
                <defs>
                    <radialGradient id="sm-glow" cx="30%" cy="50%" r="70%">
                        <stop offset="0%" stop-color="#4169E1" stop-opacity="0.15"/>
                        <stop offset="100%" stop-color="#000" stop-opacity="0"/>
                    </radialGradient>
                    <radialGradient id="sm-glow2" cx="80%" cy="60%" r="50%">
                        <stop offset="0%" stop-color="#9370DB" stop-opacity="0.1"/>
                        <stop offset="100%" stop-color="#000" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#sm-glow)"/>
                <rect width="100%" height="100%" fill="url(#sm-glow2)"/>
                <!-- Нотный стан (5 линий через весь экран) -->
                <g opacity="0.06" stroke="#C0C0FF" stroke-width="1">
                    <line x1="0" y1="330" x2="1440" y2="330"/>
                    <line x1="0" y1="355" x2="1440" y2="355"/>
                    <line x1="0" y1="380" x2="1440" y2="380"/>
                    <line x1="0" y1="405" x2="1440" y2="405"/>
                    <line x1="0" y1="430" x2="1440" y2="430"/>
                </g>
                <!-- Ноты на нотном стане -->
                <g opacity="0.08" fill="#9370DB">
                    <ellipse cx="200" cy="367" rx="14" ry="10" transform="rotate(-15,200,367)"/>
                    <line x1="212" y1="367" x2="212" y2="300" stroke="#9370DB" stroke-width="2"/>
                    <ellipse cx="320" cy="393" rx="14" ry="10" transform="rotate(-15,320,393)"/>
                    <line x1="332" y1="393" x2="332" y2="326" stroke="#9370DB" stroke-width="2"/>
                    <ellipse cx="460" cy="355" rx="14" ry="10" transform="rotate(-15,460,355)"/>
                    <line x1="472" y1="355" x2="472" y2="288" stroke="#9370DB" stroke-width="2"/>
                    <ellipse cx="600" cy="380" rx="14" ry="10" transform="rotate(-15,600,380)"/>
                    <line x1="612" y1="380" x2="612" y2="313" stroke="#9370DB" stroke-width="2"/>
                    <ellipse cx="800" cy="342" rx="14" ry="10" transform="rotate(-15,800,342)"/>
                    <line x1="812" y1="342" x2="812" y2="275" stroke="#9370DB" stroke-width="2"/>
                    <ellipse cx="980" cy="405" rx="14" ry="10" transform="rotate(-15,980,405)"/>
                    <line x1="992" y1="405" x2="992" y2="338" stroke="#9370DB" stroke-width="2"/>
                    <ellipse cx="1150" cy="367" rx="14" ry="10" transform="rotate(-15,1150,367)"/>
                    <line x1="1162" y1="367" x2="1162" y2="300" stroke="#9370DB" stroke-width="2"/>
                    <ellipse cx="1300" cy="393" rx="14" ry="10" transform="rotate(-15,1300,393)"/>
                    <line x1="1312" y1="393" x2="1312" y2="326" stroke="#9370DB" stroke-width="2"/>
                </g>
                <!-- Скрипичный ключ -->
                <g opacity="0.07" stroke="#4169E1" stroke-width="3" fill="none"
                   transform="translate(660,200) scale(1.6)">
                    <path d="M30,10 Q50,-5 55,20 Q60,50 40,70 Q60,80 65,110
                             Q70,145 45,160 Q20,175 15,155 Q10,135 30,125
                             Q50,115 48,95 Q45,75 25,70 Q5,65 8,40 Q11,15 30,10 Z"
                          stroke-linejoin="round"/>
                    <line x1="30" y1="160" x2="30" y2="200"/>
                    <circle cx="30" cy="210" r="8"/>
                </g>
                <!-- Звёзды (оркестровое небо) -->
                <g opacity="0.07" fill="#E8E8FF">
                    <circle cx="100" cy="80" r="2"/>
                    <circle cx="250" cy="120" r="1.5"/>
                    <circle cx="420" cy="60" r="2.5"/>
                    <circle cx="600" cy="100" r="1.5"/>
                    <circle cx="900" cy="70" r="2"/>
                    <circle cx="1100" cy="90" r="2.5"/>
                    <circle cx="1280" cy="50" r="1.5"/>
                    <circle cx="1380" cy="110" r="2"/>
                    <circle cx="150" cy="800" r="1.5"/>
                    <circle cx="380" cy="820" r="2"/>
                    <circle cx="750" cy="800" r="1.5"/>
                    <circle cx="1050" cy="830" r="2"/>
                    <circle cx="1350" cy="810" r="1.5"/>
                </g>
            </svg>`,

            // ──────────────────────────────────────────────────────
            // 📚 DARK AMBIENT / LITERARY — книга и звёзды
            // ──────────────────────────────────────────────────────
            'literary-dark': `<svg width="100%" height="100%" viewBox="0 0 1440 900"
                xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<style>
@keyframes ld-tw{0%,100%{opacity:.38}50%{opacity:.8}}
@keyframes ld-m{0%,100%{opacity:.32}50%{opacity:.15}}
@keyframes ld-q{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}
@keyframes ld-b{0%,100%{opacity:1}50%{opacity:.55}}
.ld-star1{animation:ld-tw 2.2s ease-in-out infinite}
.ld-star2{animation:ld-tw 3s ease-in-out infinite .6s}
.ld-star3{animation:ld-tw 1.9s ease-in-out infinite 1.2s}
.ld-star4{animation:ld-tw 2.7s ease-in-out infinite .3s}
.ld-moon{animation:ld-m 7s ease-in-out infinite}
.ld-quill{animation:ld-q 8s ease-in-out infinite;transform-box:fill-box;transform-origin:35px 395px}
.ld-book{animation:ld-b 9s ease-in-out infinite}
[data-layer]{transition:transform .2s ease-out}
</style>
                <defs>
                    <radialGradient id="la-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#8B0000" stop-opacity="0.08"/>
                        <stop offset="100%" stop-color="#000" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#la-glow)"/>
                <!-- Звёздное поле -->
                <g opacity="0.25" fill="#ffffff">
                    <circle cx="80" cy="60" r="1"/><circle cx="200" cy="30" r="1.5"/>
                    <circle cx="340" cy="90" r="1"/><circle cx="490" cy="45" r="1.5"/>
                    <circle cx="620" cy="75" r="1"/><circle cx="780" cy="25" r="2"/>
                    <circle cx="910" cy="85" r="1"/><circle cx="1040" cy="40" r="1.5"/>
                    <circle cx="1180" cy="70" r="1"/><circle cx="1350" cy="55" r="1.5"/>
                    <circle cx="150" cy="180" r="1.5"/><circle cx="300" cy="200" r="1"/>
                    <circle cx="550" cy="160" r="2"/><circle cx="700" cy="190" r="1"/>
                    <circle cx="850" cy="150" r="1.5"/><circle cx="1000" cy="170" r="1"/>
                    <circle cx="1200" cy="140" r="2"/><circle cx="1400" cy="180" r="1"/>
                    <circle cx="50" cy="750" r="1.5"/><circle cx="220" cy="780" r="1"/>
                    <circle cx="430" cy="760" r="2"/><circle cx="680" cy="790" r="1"/>
                    <circle cx="920" cy="750" r="1.5"/><circle cx="1130" cy="770" r="1"/>
                    <circle cx="1320" cy="740" r="2"/><circle cx="1420" cy="800" r="1"/>
                </g>
                <!-- Луна -->
                <g opacity="0.1">
                    <circle cx="1300" cy="120" r="70" fill="none" stroke="#8B8B8B" stroke-width="1"/>
                    <circle cx="1330" cy="100" r="70" fill="#050505"/>
                </g>
                <!-- Раскрытая книга по центру -->
                <g opacity="0.07" stroke="#8B0000" stroke-width="2" fill="none"
                   transform="translate(560,350)">
                    <!-- Левая страница -->
                    <path d="M160,0 Q80,-10 0,20 L0,200 Q80,170 160,180 Z"/>
                    <!-- Правая страница -->
                    <path d="M160,0 Q240,-10 320,20 L320,200 Q240,170 160,180 Z"/>
                    <!-- Линии текста — левая -->
                    <line x1="20" y1="50" x2="140" y2="45"/>
                    <line x1="20" y1="70" x2="140" y2="65"/>
                    <line x1="20" y1="90" x2="140" y2="85"/>
                    <line x1="20" y1="110" x2="140" y2="105"/>
                    <line x1="20" y1="130" x2="140" y2="125"/>
                    <line x1="20" y1="150" x2="120" y2="145"/>
                    <!-- Линии текста — правая -->
                    <line x1="180" y1="50" x2="300" y2="45"/>
                    <line x1="180" y1="70" x2="300" y2="65"/>
                    <line x1="180" y1="90" x2="300" y2="85"/>
                    <line x1="180" y1="110" x2="300" y2="105"/>
                    <line x1="180" y1="130" x2="300" y2="125"/>
                    <line x1="180" y1="150" x2="260" y2="145"/>
                    <!-- Корешок -->
                    <line x1="160" y1="0" x2="160" y2="180" stroke-width="3"/>
                </g>
            </svg>`
        };
    }

    // ── Hero-banner SVG декор с параллаксом и анимациями ──────────────
    _applyHeroSVGDecor(themeName) {
        const hero = document.querySelector('.hero-banner');
        if (!hero) return;

        let el = document.getElementById('hero-theme-decor');
        if (!el) {
            el = document.createElement('div');
            el.id = 'hero-theme-decor';
            el.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;overflow:hidden;opacity:0;transition:opacity 0.7s ease;';
            hero.appendChild(el);
        }

        const svg = this._heroThemeSVGs[themeName];
        if (!svg) return;
        el.style.opacity = '0';
        el.innerHTML = svg;
        requestAnimationFrame(() => requestAnimationFrame(() => { el.style.opacity = '1'; }));

        // Параллакс при движении мыши — добавляем только один раз
        if (!hero.dataset.parallaxInit) {
            hero.dataset.parallaxInit = '1';
            let raf = null;
            hero.addEventListener('mousemove', (e) => {
                if (raf) return;
                raf = requestAnimationFrame(() => {
                    raf = null;
                    const decor = document.getElementById('hero-theme-decor');
                    if (!decor) return;
                    const r  = hero.getBoundingClientRect();
                    const dx = (e.clientX - r.left  - r.width  / 2) / r.width;   // -0.5…0.5
                    const dy = (e.clientY - r.top   - r.height / 2) / r.height;
                    // Три слоя с разной скоростью — даёт иллюзию глубины
                    decor.querySelectorAll('[data-layer="bg"]').forEach(g  => { g.style.transform = `translate(${dx*8}px,${dy*6}px)`;   });
                    decor.querySelectorAll('[data-layer="mid"]').forEach(g => { g.style.transform = `translate(${dx*18}px,${dy*13}px)`; });
                    decor.querySelectorAll('[data-layer="fg"]').forEach(g  => { g.style.transform = `translate(${dx*30}px,${dy*22}px)`; });
                });
            }, { passive: true });
            hero.addEventListener('mouseleave', () => {
                const decor = document.getElementById('hero-theme-decor');
                if (!decor) return;
                decor.querySelectorAll('[data-layer]').forEach(g => { g.style.transform = ''; });
            });
        }
    }


    _applyAlbumBannerDecor(themeName) {
        const banner = document.querySelector('.album-page-banner');
        if (!banner) return;
        // Обновляем цвет .banner-glow под текущую тему
        const glow = banner.querySelector('.banner-glow');
        if (glow) {
            const glowColors = {
                'power-metal':    'rgba(255,215,0,0.14)',
                'gothic-metal':   'rgba(157,0,255,0.14)',
                'punk-rock':      'rgba(255,20,147,0.14)',
                'heavy-metal':    'rgba(255,69,0,0.16)',
                'symphonic-metal':'rgba(65,105,225,0.14)',
                'dark-ambient':   'rgba(139,0,0,0.14)',
            };
            const c = glowColors[themeName] || 'rgba(255,215,0,0.12)';
            glow.style.background = `radial-gradient(circle, ${c} 0%, transparent 70%)`;
        }
        let el = document.getElementById('album-banner-decor');
        if (!el) {
            el = document.createElement('div');
            el.id = 'album-banner-decor';
            el.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;overflow:hidden;opacity:0;transition:opacity 0.7s ease;';
            banner.appendChild(el);
        }
        const svg = this._albumBannerSVGs[themeName];
        if (!svg) return;
        el.style.opacity = '0';
        el.innerHTML = svg;
        requestAnimationFrame(() => requestAnimationFrame(() => { el.style.opacity = '1'; }));
        if (!banner.dataset.albumParallaxInit) {
            banner.dataset.albumParallaxInit = '1';
            let raf = null;
            banner.addEventListener('mousemove', (e) => {
                if (raf) return;
                raf = requestAnimationFrame(() => {
                    raf = null;
                    const decor = document.getElementById('album-banner-decor');
                    if (!decor) return;
                    const r = banner.getBoundingClientRect();
                    const dx = (e.clientX - r.left - r.width / 2) / r.width;
                    const dy = (e.clientY - r.top - r.height / 2) / r.height;
                    decor.querySelectorAll('[data-layer="bg"]').forEach(g  => { g.style.transform = `translate(${dx*6}px,${dy*4}px)`;  });
                    decor.querySelectorAll('[data-layer="mid"]').forEach(g => { g.style.transform = `translate(${dx*14}px,${dy*10}px)`; });
                    decor.querySelectorAll('[data-layer="fg"]').forEach(g  => { g.style.transform = `translate(${dx*22}px,${dy*16}px)`; });
                });
            }, { passive: true });
            banner.addEventListener('mouseleave', () => {
                const decor = document.getElementById('album-banner-decor');
                if (!decor) return;
                decor.querySelectorAll('[data-layer]').forEach(g => { g.style.transform = ''; });
            });
        }
    }

    get _heroThemeSVGs() {
        return {

'power-metal': `<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
<style>
@keyframes pm-breath{0%,100%{opacity:1}50%{opacity:.55}}
@keyframes pm-rays  {0%,100%{opacity:1}50%{opacity:.5}}
@keyframes pm-float {0%,100%{transform:translateY(0)}50%{transform:translateY(-13px)}}
@keyframes pm-crown {0%,100%{opacity:.16}50%{opacity:.28}}
@keyframes pm-shield{0%,100%{opacity:.07}50%{opacity:.13}}
.pm-glow{animation:pm-breath 8s ease-in-out infinite}
.pm-rays{animation:pm-rays 10s ease-in-out infinite 1s}
.pm-sl  {animation:pm-float 7s ease-in-out infinite;transform-box:fill-box}
.pm-sr  {animation:pm-float 7s ease-in-out infinite .6s;transform-box:fill-box}
.pm-crown{animation:pm-crown 4s ease-in-out infinite;transform-box:fill-box}
.pm-shield{animation:pm-shield 6s ease-in-out infinite}
[data-layer]{transition:transform .18s ease-out}
</style>
<defs>
  <radialGradient id="hpm" cx="50%" cy="35%" r="55%">
    <stop offset="0%" stop-color="#FFD700" stop-opacity="0.18"/>
    <stop offset="100%" stop-color="#FFD700" stop-opacity="0"/>
  </radialGradient>
</defs>
<ellipse class="pm-glow" cx="600" cy="280" rx="600" ry="350" fill="url(#hpm)"/>
<g class="pm-rays" stroke="#FFD700" stroke-opacity="0.07" stroke-width="1.2" fill="none">
  <line x1="600" y1="-10" x2="-60" y2="850"/><line x1="600" y1="-10" x2="80" y2="850"/>
  <line x1="600" y1="-10" x2="220" y2="850"/><line x1="600" y1="-10" x2="380" y2="850"/>
  <line x1="600" y1="-10" x2="540" y2="850"/><line x1="600" y1="-10" x2="660" y2="850"/>
  <line x1="600" y1="-10" x2="820" y2="850"/><line x1="600" y1="-10" x2="980" y2="850"/>
  <line x1="600" y1="-10" x2="1130" y2="850"/><line x1="600" y1="-10" x2="1270" y2="850"/>
</g>
<g transform="translate(55,30)" opacity="0.28" fill="#FFD700"><g class="pm-sl">
  <polygon points="12,0 18,450 12,485 6,450"/>
  <rect x="-22" y="138" width="68" height="11" rx="3"/>
  <rect x="8" y="149" width="8" height="80" fill="#8B6914"/>
  <circle cx="12" cy="240" r="12"/>
  <line x1="12" y1="4" x2="12" y2="138" stroke="#B8860B" stroke-width="2" opacity="0.5"/>
  <circle cx="12" cy="4" r="4" fill="#FFF8DC"/>
</g></g>
<g transform="translate(1145,30) scale(-1,1)" opacity="0.28" fill="#FFD700"><g class="pm-sr">
  <polygon points="12,0 18,450 12,485 6,450"/>
  <rect x="-22" y="138" width="68" height="11" rx="3"/>
  <rect x="8" y="149" width="8" height="80" fill="#8B6914"/>
  <circle cx="12" cy="240" r="12"/>
  <line x1="12" y1="4" x2="12" y2="138" stroke="#B8860B" stroke-width="2" opacity="0.5"/>
  <circle cx="12" cy="4" r="4" fill="#FFF8DC"/>
</g></g>
<g class="pm-crown" transform="translate(498,18)" opacity="0.16" fill="#FFD700">
  <polygon points="102,0 204,0 184,55 160,30 132,60 102,25 72,60 44,30 20,55 0,0"/>
  <rect x="20" y="55" width="164" height="22" rx="4"/>
  <circle cx="44" cy="28" r="5" fill="#FF6600"/>
  <circle cx="102" cy="12" r="5" fill="#FF6600"/>
  <circle cx="160" cy="28" r="5" fill="#FF6600"/>
</g>
<g transform="translate(546,570)" opacity="0.07" stroke="#FFD700" stroke-width="2" fill="none">
  <path d="M54,0 L108,0 L108,80 Q108,148 54,178 Q0,148 0,80 Z"/>
  <line x1="54" y1="2" x2="54" y2="176" stroke-width="1.5"/>
  <line x1="2" y1="75" x2="106" y2="75" stroke-width="1.5"/>
</g>
<g stroke="#FFD700" stroke-opacity="0.25" fill="none" stroke-width="1.5">
  <path d="M15,15 L80,15 M15,15 L15,80"/><path d="M28,28 L68,28 M28,28 L28,68"/>
  <path d="M1185,15 L1120,15 M1185,15 L1185,80"/><path d="M1172,28 L1132,28 M1172,28 L1172,68"/>
  <path d="M15,785 L80,785 M15,785 L15,720"/>
  <path d="M1185,785 L1120,785 M1185,785 L1185,720"/>
</g>
</svg>`,

'gothic-metal': `<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
<style>
@keyframes gm-arch{0%,100%{opacity:.1}50%{opacity:.2}}
@keyframes gm-bat-p{0%,100%{opacity:.22}55%{opacity:.44}}
@keyframes gm-moon-p{0%,100%{opacity:.35}50%{opacity:.15}}
.gm-arch{animation:gm-arch 9s ease-in-out infinite}
.gm-bat1{animation:gm-bat-p 5.5s ease-in-out infinite}
.gm-bat2{animation:gm-bat-p 6.5s ease-in-out infinite 1s}
.gm-bat3{animation:gm-bat-p 5s ease-in-out infinite .5s}
.gm-bat4{animation:gm-bat-p 7s ease-in-out infinite 1.5s}
.gm-moon{animation:gm-moon-p 6s ease-in-out infinite}
[data-layer]{transition:transform .18s ease-out}
</style>
<defs>
  <radialGradient id="hgm" cx="50%" cy="40%" r="55%">
    <stop offset="0%" stop-color="#9D00FF" stop-opacity="0.2"/>
    <stop offset="100%" stop-color="#9D00FF" stop-opacity="0"/>
  </radialGradient>
</defs>
<ellipse cx="600" cy="320" rx="560" ry="340" fill="url(#hgm)"/>
<g class="gm-arch" transform="translate(200,-10)" opacity="0.1" stroke="#9D00FF" stroke-width="2" fill="none">
  <path d="M400,820 L400,300 Q400,0 200,0 Q0,0 0,300 L0,820"/>
  <path d="M365,820 L365,305 Q365,40 200,40 Q35,40 35,305 L35,820"/>
  <path d="M200,40 Q200,0 200,0"/><circle cx="200" cy="80" r="80"/>
  <circle cx="200" cy="80" r="55"/><circle cx="200" cy="80" r="28"/>
  <path d="M80,305 L80,195 Q80,115 160,115 Q240,115 240,195 L240,305"/>
  <path d="M320,305 L320,195 Q320,115 240,115 Q320,115 320,195 L320,305"/>
</g>
<g class="gm-moon" transform="translate(970,45)" opacity="0.35">
  <circle cx="62" cy="62" r="60" fill="#1a0030"/>
  <circle cx="82" cy="48" r="56" fill="#060608"/>
</g>
<g fill="#9D00FF" opacity="0.22">
  <g class="gm-bat1" transform="translate(140,110) rotate(-15)">
    <path d="M18,8 Q0,-2 -32,4 Q-14,16 -2,18 Q-8,28 -20,32 Q-4,30 8,20 Q12,16 18,8"/>
    <path d="M18,8 Q36,-2 68,4 Q50,16 38,18 Q44,28 56,32 Q40,30 28,20 Q24,16 18,8"/>
    <ellipse cx="18" cy="8" rx="7" ry="9"/>
  </g>
  <g class="gm-bat2" transform="translate(960,155) rotate(10) scale(0.75)">
    <path d="M18,8 Q0,-2 -32,4 Q-14,16 -2,18 Q-8,28 -20,32 Q-4,30 8,20 Q12,16 18,8"/>
    <path d="M18,8 Q36,-2 68,4 Q50,16 38,18 Q44,28 56,32 Q40,30 28,20 Q24,16 18,8"/>
    <ellipse cx="18" cy="8" rx="7" ry="9"/>
  </g>
  <g class="gm-bat3" transform="translate(350,65) rotate(5) scale(0.55)">
    <path d="M18,8 Q0,-2 -32,4 Q-14,16 -2,18 Q-8,28 -20,32 Q-4,30 8,20 Q12,16 18,8"/>
    <path d="M18,8 Q36,-2 68,4 Q50,16 38,18 Q44,28 56,32 Q40,30 28,20 Q24,16 18,8"/>
    <ellipse cx="18" cy="8" rx="7" ry="9"/>
  </g>
  <g class="gm-bat4" transform="translate(750,90) rotate(-8) scale(0.6)">
    <path d="M18,8 Q0,-2 -32,4 Q-14,16 -2,18 Q-8,28 -20,32 Q-4,30 8,20 Q12,16 18,8"/>
    <path d="M18,8 Q36,-2 68,4 Q50,16 38,18 Q44,28 56,32 Q40,30 28,20 Q24,16 18,8"/>
    <ellipse cx="18" cy="8" rx="7" ry="9"/>
  </g>
</g>
<g transform="translate(70,570)" opacity="0.18" stroke="#9D00FF" fill="none" stroke-width="1.5">
  <circle cx="50" cy="50" r="48"/><circle cx="50" cy="50" r="34"/><circle cx="50" cy="50" r="20"/>
  <circle cx="50" cy="50" r="7" fill="#9D00FF" opacity="0.3"/>
  <path d="M50,2 Q66,18 50,34 Q34,18 50,2"/>
  <path d="M98,50 Q82,66 66,50 Q82,34 98,50"/>
  <path d="M50,98 Q34,82 50,66 Q66,82 50,98"/>
  <path d="M2,50 Q18,34 34,50 Q18,66 2,50"/>
  <line x1="50" y1="98" x2="50" y2="210"/>
  <path d="M50,130 L36,120 M50,155 L64,144 M50,178 L36,168"/>
</g>
<g stroke="#9D00FF" stroke-opacity="0.14" fill="none" stroke-width="1">
  <path d="M0,770 Q150,748 300,770 Q450,792 600,770 Q750,748 900,770 Q1050,792 1200,770"/>
  <path d="M0,790 Q150,768 300,790 Q450,812 600,790 Q750,768 900,790 Q1050,812 1200,790"/>
</g>
</svg>`,

'punk-rock': `<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
<style>
@keyframes pr-fl{0%,85%,100%{opacity:.28}90%{opacity:.52}95%{opacity:.35}}
@keyframes pr-fr{0%,80%,100%{opacity:.28}87%{opacity:.5}93%{opacity:.32}}
@keyframes pr-tw{0%,100%{opacity:.45}50%{opacity:.9}}
@keyframes pr-a{0%,100%{opacity:.07}50%{opacity:.13}}
.pr-bolt-l{animation:pr-fl 2.8s ease-in-out infinite}
.pr-bolt-r{animation:pr-fr 3.2s ease-in-out infinite .4s}
.pr-star1{animation:pr-tw 1.6s ease-in-out infinite}
.pr-star2{animation:pr-tw 2.1s ease-in-out infinite .4s}
.pr-star3{animation:pr-tw 1.9s ease-in-out infinite .8s}
.pr-star4{animation:pr-tw 2.4s ease-in-out infinite 1.2s}
.pr-anarchy{animation:pr-a 5s ease-in-out infinite}
[data-layer]{transition:transform .18s ease-out}
</style>
<g stroke="#FF1493" stroke-opacity="0.055" stroke-width="1" fill="none">
  <line x1="0" y1="0" x2="0" y2="800"/><line x1="120" y1="0" x2="120" y2="800"/>
  <line x1="240" y1="0" x2="240" y2="800"/><line x1="360" y1="0" x2="360" y2="800"/>
  <line x1="480" y1="0" x2="480" y2="800"/><line x1="600" y1="0" x2="600" y2="800"/>
  <line x1="720" y1="0" x2="720" y2="800"/><line x1="840" y1="0" x2="840" y2="800"/>
  <line x1="960" y1="0" x2="960" y2="800"/><line x1="1080" y1="0" x2="1080" y2="800"/>
  <line x1="1200" y1="0" x2="1200" y2="800"/>
  <line x1="0" y1="200" x2="1200" y2="200"/><line x1="0" y1="400" x2="1200" y2="400"/>
  <line x1="0" y1="600" x2="1200" y2="600"/>
</g>
<polygon class="pr-bolt-l" points="0,800 0,745 55,15 95,15 40,800" fill="#FF1493" opacity="0.28"/>
<polygon class="pr-bolt-r" points="1200,800 1200,745 1145,15 1105,15 1160,800" fill="#00FFFF" opacity="0.28"/>
<g class="pr-anarchy" transform="translate(450,230)" opacity="0.07" stroke="#FF1493" stroke-width="5" fill="none">
  <path d="M150,0 L0,300 L300,300 Z"/>
  <line x1="42" y1="195" x2="258" y2="195"/>
</g>
<polygon points="0,0 0,38 60,14 120,38 180,10 240,38 300,14 360,38 420,10 480,38 540,14 600,38 660,14 720,38 780,10 840,38 900,14 960,38 1020,10 1080,38 1140,14 1200,38 1200,0" fill="#FF1493" opacity="0.18"/>
<polygon points="0,800 0,762 60,786 120,762 180,790 240,762 300,786 360,762 420,790 480,762 540,786 600,762 660,786 720,762 780,790 840,762 900,786 960,762 1020,790 1080,762 1140,786 1200,762 1200,800" fill="#00FFFF" opacity="0.14"/>
<g fill="#FFFF00" opacity="0.45">
  <polygon class="pr-star1" points="160,695 164,710 179,710 167,719 172,734 160,725 148,734 153,719 141,710 156,710"/>
  <polygon class="pr-star2" points="1060,90 1063,100 1073,100 1065,107 1068,117 1060,110 1052,117 1055,107 1047,100 1057,100"/>
  <polygon class="pr-star3" points="210,145 212,152 219,152 214,157 216,164 210,160 204,164 206,157 201,152 208,152"/>
  <polygon class="pr-star4" points="990,710 992,717 999,717 994,722 996,729 990,725 984,729 986,722 981,717 988,717"/>
</g>
<g opacity="0.2" stroke="#00FFFF" stroke-width="1.5" fill="none">
  <g transform="translate(88,640)"><path d="M18,0 L0,36 L36,36 Z"/><line x1="5" y1="24" x2="31" y2="24"/><circle cx="18" cy="18" r="22"/></g>
  <g transform="translate(1062,580)"><path d="M18,0 L0,36 L36,36 Z"/><line x1="5" y1="24" x2="31" y2="24"/><circle cx="18" cy="18" r="22"/></g>
  <g transform="translate(580,660) scale(0.6)"><path d="M18,0 L0,36 L36,36 Z"/><line x1="5" y1="24" x2="31" y2="24"/><circle cx="18" cy="18" r="22"/></g>
</g>
</svg>`,

'heavy-metal': `<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
<style>
@keyframes hm-f1{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.07) translateY(-8px)}}
@keyframes hm-f2{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.05) translateY(-5px)}}
@keyframes hm-sp{0%,100%{opacity:.45}50%{opacity:.78}}
@keyframes hm-g{0%,100%{opacity:1}50%{opacity:.6}}
.hm-flame-l{animation:hm-f1 2.6s ease-in-out infinite;transform-box:fill-box;transform-origin:bottom center}
.hm-flame-r{animation:hm-f1 2.6s ease-in-out infinite .5s;transform-box:fill-box;transform-origin:bottom center}
.hm-flame-c{animation:hm-f2 2s ease-in-out infinite .2s;transform-box:fill-box;transform-origin:bottom center}
.hm-spark{animation:hm-sp 1.4s ease-in-out infinite}
.hm-glow{animation:hm-g 4s ease-in-out infinite}
[data-layer]{transition:transform .18s ease-out}
</style>
<defs>
  <radialGradient id="hhm" cx="50%" cy="100%" r="65%">
    <stop offset="0%" stop-color="#FF4500" stop-opacity="0.28"/>
    <stop offset="55%" stop-color="#CC0000" stop-opacity="0.1"/>
    <stop offset="100%" stop-color="transparent"/>
  </radialGradient>
</defs>
<ellipse class="hm-glow" cx="600" cy="820" rx="720" ry="340" fill="url(#hhm)"/>
<g transform="translate(475,240)" opacity="0.065" stroke="#CC0000" stroke-width="2.5" fill="none">
  <path d="M125,0 Q250,0 250,125 Q250,205 195,225 L195,265 L55,265 L55,225 Q0,205 0,125 Q0,0 125,0"/>
  <ellipse cx="82" cy="110" rx="32" ry="37"/>
  <ellipse cx="168" cy="110" rx="32" ry="37"/>
  <path d="M112,168 L125,192 L138,168"/>
  <line x1="75" y1="225" x2="75" y2="265"/><line x1="100" y1="225" x2="100" y2="265"/>
  <line x1="125" y1="225" x2="125" y2="265"/><line x1="150" y1="225" x2="150" y2="265"/>
  <line x1="175" y1="225" x2="175" y2="265"/>
</g>
<g opacity="0.38" fill="#FF4500">
  <path class="hm-flame-l" d="M200,800 Q185,720 225,675 Q205,628 248,582 Q238,648 272,668 Q295,625 282,558 Q318,638 305,682 Q338,648 326,605 Q358,678 345,725 Q378,692 365,638 Q392,712 378,762 Q408,730 395,672 Q418,740 405,800 Z"/>
  <path d="M390,800 Q405,748 388,695 Q414,752 408,800 Z" opacity="0.6"/>
  <path class="hm-flame-r" d="M580,800 Q565,728 608,682 Q586,636 632,588 Q620,658 658,678 Q682,632 668,562 Q706,645 692,692 Q728,655 714,610 Q748,688 734,736 Q770,700 754,644 Q782,722 766,776 Q796,742 780,680 Q806,755 790,800 Z"/>
  <path d="M760,800 Q778,750 762,695 Q790,758 782,800 Z" opacity="0.6"/>
  <path class="hm-flame-c" d="M440,800 Q426,748 462,716 Q444,672 484,640 Q472,706 500,718 Q518,675 505,632 Q532,700 518,742 Q542,716 536,676 Q556,742 540,800 Z" fill="#CC0000" opacity="0.55"/>
  <path d="M688,800 Q672,745 710,710 Q692,665 735,632 Q722,700 752,714 Q772,670 758,625 Q788,696 773,740 Q800,712 793,668 Q815,738 797,800 Z" fill="#CC0000" opacity="0.55"/>
</g>
<g class="hm-spark" fill="#FFA500" opacity="0.45">
  <circle cx="310" cy="615" r="2.5"/><circle cx="380" cy="575" r="2"/><circle cx="455" cy="595" r="2.5"/>
  <circle cx="530" cy="552" r="2"/><circle cx="605" cy="568" r="2.5"/><circle cx="678" cy="558" r="2"/>
  <circle cx="748" cy="602" r="2.5"/><circle cx="500" cy="530" r="1.5"/><circle cx="590" cy="512" r="1.5"/>
  <circle cx="670" cy="522" r="1.5"/><circle cx="430" cy="542" r="1.5"/>
</g>
<g stroke="#444" stroke-width="3.5" fill="none" opacity="0.22" stroke-linecap="round">
  <path d="M75,0 Q62,45 85,58 Q108,71 95,116 Q82,161 105,174 Q128,187 115,232 Q102,277 125,290 Q148,303 135,348 Q122,393 145,406"/>
  <path d="M1125,0 Q1138,45 1115,58 Q1092,71 1105,116 Q1118,161 1095,174 Q1072,187 1085,232 Q1098,277 1075,290 Q1052,303 1065,348 Q1078,393 1055,406"/>
</g>
<g stroke="#CC0000" stroke-opacity="0.18" fill="none" stroke-width="1.5">
  <polygon points="45,45 48,55 58,55 51,62 54,72 45,66 36,72 39,62 32,55 42,55" transform="scale(2.2)"/>
  <polygon points="499,45 502,55 512,55 505,62 508,72 499,66 490,72 493,62 486,55 496,55" transform="scale(2.2)"/>
</g>
</svg>`,

'symphonic-metal': `<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
<style>
@keyframes sm-glow{0%,100%{opacity:1}50%{opacity:.5}}
@keyframes sm-tw{0%,100%{opacity:.42}50%{opacity:.9}}
@keyframes sm-frame{0%,100%{opacity:1}50%{opacity:.55}}
.sm-clef{animation:sm-glow 9s ease-in-out infinite}
.sm-notes{animation:sm-glow 7s ease-in-out infinite 2s}
.sm-star1{animation:sm-tw 2s ease-in-out infinite}
.sm-star2{animation:sm-tw 2.8s ease-in-out infinite .5s}
.sm-star3{animation:sm-tw 2.3s ease-in-out infinite 1s}
.sm-star4{animation:sm-tw 3.1s ease-in-out infinite 1.5s}
.sm-star5{animation:sm-tw 1.8s ease-in-out infinite .3s}
.sm-frame{animation:sm-frame 12s ease-in-out infinite}
[data-layer]{transition:transform .18s ease-out}
</style>
<defs>
  <radialGradient id="hsm" cx="50%" cy="38%" r="52%">
    <stop offset="0%" stop-color="#4169E1" stop-opacity="0.2"/>
    <stop offset="100%" stop-color="#4169E1" stop-opacity="0"/>
  </radialGradient>
</defs>
<ellipse cx="600" cy="300" rx="580" ry="340" fill="url(#hsm)"/>
<g class="sm-frame" stroke="#4169E1" stroke-opacity="0.22" fill="none" stroke-width="1.5">
  <path d="M90,65 Q240,42 390,65 Q480,78 540,62 Q600,48 660,62 Q720,78 810,65 Q960,42 1110,65"/>
  <path d="M90,85 Q240,62 390,85 Q480,98 540,82 Q600,68 660,82 Q720,98 810,85 Q960,62 1110,85"/>
  <path d="M90,725 Q240,702 390,725 Q480,738 540,722 Q600,708 660,722 Q720,738 810,725 Q960,702 1110,725"/>
  <path d="M90,745 Q240,722 390,745 Q480,758 540,742 Q600,728 660,742 Q720,758 810,745 Q960,722 1110,745"/>
  <path d="M90,65 Q60,100 72,148 Q58,188 72,220"/>
  <path d="M1110,65 Q1140,100 1128,148 Q1142,188 1128,220"/>
  <path d="M90,725 Q60,690 72,642 Q58,602 72,570"/>
  <path d="M1110,725 Q1140,690 1128,642 Q1142,602 1128,570"/>
</g>
<g class="sm-clef" transform="translate(50,155)" opacity="0.24" stroke="#4169E1" stroke-width="2.5" fill="none">
  <path d="M38,10 Q68,8 68,38 Q68,72 38,90 Q8,108 8,148 Q8,188 36,205 Q64,222 64,260 Q64,318 28,340"/>
  <circle cx="24" cy="378" r="26" fill="#4169E1" fill-opacity="0.12"/>
  <circle cx="24" cy="378" r="16" fill="#4169E1" fill-opacity="0.08"/>
  <line x1="24" y1="404" x2="24" y2="470"/>
  <line x1="24" y1="352" x2="24" y2="180"/>
</g>
<g class="sm-notes" transform="translate(895,185)" opacity="0.2" stroke="#4169E1" fill="none">
  <line x1="0" y1="0" x2="265" y2="0" stroke-width="1.3"/>
  <line x1="0" y1="17" x2="265" y2="17" stroke-width="1.3"/>
  <line x1="0" y1="34" x2="265" y2="34" stroke-width="1.3"/>
  <line x1="0" y1="51" x2="265" y2="51" stroke-width="1.3"/>
  <line x1="0" y1="68" x2="265" y2="68" stroke-width="1.3"/>
  <ellipse cx="42" cy="9" rx="10" ry="7" fill="#4169E1" fill-opacity="0.5" stroke="none"/>
  <line x1="52" y1="9" x2="52" y2="-52" stroke-width="1.3"/>
  <ellipse cx="96" cy="26" rx="10" ry="7" fill="#4169E1" fill-opacity="0.5" stroke="none"/>
  <line x1="106" y1="26" x2="106" y2="-38" stroke-width="1.3"/>
  <path d="M106,-38 Q128,-26 122,-10" stroke-width="1.3"/>
  <ellipse cx="152" cy="9" rx="10" ry="7" fill="#4169E1" fill-opacity="0.5" stroke="none"/>
  <line x1="162" y1="9" x2="162" y2="-52" stroke-width="1.3"/>
  <ellipse cx="210" cy="34" rx="10" ry="7" fill="#4169E1" fill-opacity="0.5" stroke="none"/>
  <line x1="220" y1="34" x2="220" y2="-28" stroke-width="1.3"/>
  <path d="M162,-52 Q185,-42 180,-25" stroke-width="1.3"/>
</g>
<g fill="#C0C0C0" opacity="0.42">
  <path class="sm-star1" d="M125,118 L128,129 L140,129 L131,136 L134,147 L125,140 L116,147 L119,136 L110,129 L122,129 Z"/>
  <path class="sm-star2" d="M1085,195 L1087,203 L1095,203 L1089,208 L1091,216 L1085,211 L1079,216 L1081,208 L1075,203 L1083,203 Z"/>
  <path class="sm-star3" d="M195,660 L198,671 L210,671 L201,678 L204,689 L195,682 L186,689 L189,678 L180,671 L192,671 Z"/>
  <path class="sm-star4" d="M985,675 L988,686 L1000,686 L991,693 L994,704 L985,697 L976,704 L979,693 L970,686 L982,686 Z"/>
  <path class="sm-star5" d="M600,108 L602,115 L609,115 L604,120 L606,127 L600,122 L594,127 L596,120 L591,115 L598,115 Z" fill="#FFD700" opacity="0.7"/>
  <circle cx="390" cy="95" r="2.2"/><circle cx="700" cy="85" r="2.2"/><circle cx="855" cy="135" r="2.2"/>
  <circle cx="330" cy="695" r="2.2"/><circle cx="1040" cy="660" r="2.2"/>
</g>
</svg>`,

'dark-ambient': `<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
<style>
@keyframes ld-tw{0%,100%{opacity:.38}50%{opacity:.82}}
@keyframes ld-moon-p{0%,100%{opacity:.32}50%{opacity:.14}}
@keyframes ld-glow{0%,100%{opacity:.065}50%{opacity:.12}}
@keyframes ld-quill-p{0%,100%{opacity:.26}50%{opacity:.42}}
.ld-star1{animation:ld-tw 2.2s ease-in-out infinite}
.ld-star2{animation:ld-tw 3s ease-in-out infinite .6s}
.ld-star3{animation:ld-tw 1.9s ease-in-out infinite 1.2s}
.ld-star4{animation:ld-tw 2.7s ease-in-out infinite .3s}
.ld-moon{animation:ld-moon-p 7s ease-in-out infinite}
.ld-book{animation:ld-glow 9s ease-in-out infinite}
.ld-quill{animation:ld-quill-p 8s ease-in-out infinite}
[data-layer]{transition:transform .18s ease-out}
</style>
<defs>
  <radialGradient id="hld" cx="50%" cy="38%" r="52%">
    <stop offset="0%" stop-color="#8B0000" stop-opacity="0.16"/>
    <stop offset="100%" stop-color="#8B0000" stop-opacity="0"/>
  </radialGradient>
</defs>
<ellipse cx="600" cy="300" rx="580" ry="340" fill="url(#hld)"/>
<g class="ld-moon" transform="translate(1005,35)" opacity="0.32">
  <circle cx="65" cy="65" r="62" fill="#1a0008"/>
  <circle cx="84" cy="50" r="57" fill="#060608"/>
</g>
<g fill="#8B0000" opacity="0.38">
  <circle class="ld-star1" cx="290" cy="78" r="2.5"/><circle cx="355" cy="55" r="2"/><circle cx="418" cy="85" r="2.5"/>
  <circle class="ld-star2" cx="475" cy="48" r="2"/><circle cx="538" cy="72" r="2"/><circle cx="595" cy="42" r="2.5"/>
  <circle class="ld-star3" cx="658" cy="68" r="2"/><circle cx="718" cy="38" r="2"/><circle cx="778" cy="62" r="2.5"/>
  <circle class="ld-star4" cx="842" cy="50" r="2"/><circle cx="905" cy="80" r="2"/>
  <line x1="290" y1="78" x2="355" y2="55" stroke="#8B0000" stroke-width="0.6" opacity="0.6"/>
  <line x1="355" y1="55" x2="418" y2="85" stroke="#8B0000" stroke-width="0.6" opacity="0.6"/>
  <line x1="418" y1="85" x2="475" y2="48" stroke="#8B0000" stroke-width="0.6" opacity="0.6"/>
  <line x1="475" y1="48" x2="538" y2="72" stroke="#8B0000" stroke-width="0.6" opacity="0.6"/>
  <line x1="595" y1="42" x2="658" y2="68" stroke="#8B0000" stroke-width="0.6" opacity="0.6"/>
  <line x1="658" y1="68" x2="718" y2="38" stroke="#8B0000" stroke-width="0.6" opacity="0.6"/>
  <line x1="718" y1="38" x2="778" y2="62" stroke="#8B0000" stroke-width="0.6" opacity="0.6"/>
  <line x1="778" y1="62" x2="842" y2="50" stroke="#8B0000" stroke-width="0.6" opacity="0.6"/>
  <line x1="842" y1="50" x2="905" y2="80" stroke="#8B0000" stroke-width="0.6" opacity="0.6"/>
</g>
<g class="ld-book" transform="translate(330,430)" opacity="0.065" stroke="#8B0000" stroke-width="1.5" fill="none">
  <path d="M270,-50 Q270,-72 215,-78 Q160,-84 105,-70 Q50,-56 -10,-44 Q50,-32 105,-18 Q160,-4 215,-10 Q270,-16 270,-50"/>
  <path d="M270,-50 Q270,-72 325,-78 Q380,-84 435,-70 Q490,-56 550,-44 Q490,-32 435,-18 Q380,-4 325,-10 Q270,-16 270,-50"/>
  <line x1="48" y1="-62" x2="258" y2="-52"/>
  <line x1="48" y1="-50" x2="258" y2="-40"/>
  <line x1="48" y1="-38" x2="258" y2="-28"/>
  <line x1="282" y1="-62" x2="492" y2="-52"/>
  <line x1="282" y1="-50" x2="492" y2="-40"/>
  <line x1="282" y1="-38" x2="492" y2="-28"/>
</g>
<g class="ld-quill" transform="translate(28,190)" opacity="0.26">
  <path d="M35,0 Q68,32 44,90 Q20,148 10,230 Q0,312 6,395" stroke="#8B0000" stroke-width="2.2" fill="none"/>
  <path d="M35,0 Q10,32 8,68 M33,22 Q8,54 6,92 M31,45 Q6,77 4,115 M29,68 Q4,100 2,138 M27,92 Q2,124 0,162 M25,116 Q0,148 -2,186" stroke="#6B4513" stroke-width="1" fill="none" opacity="0.65"/>
  <path d="M35,0 Q58,32 62,68 M37,22 Q60,54 66,92 M39,45 Q62,77 68,115 M41,68 Q64,100 70,138 M43,92 Q66,124 72,162 M45,116 Q68,148 74,186" stroke="#6B4513" stroke-width="1" fill="none" opacity="0.65"/>
  <path d="M6,395 L0,428 L12,422 L4,452 L16,445 L8,400" fill="#444" stroke="none" opacity="0.45"/>
</g>
<g transform="translate(80,88)" opacity="0.2" fill="#8B0000">
  <path d="M0,22 Q22,0 56,6 Q90,12 100,35 Q110,58 88,70 Q66,82 44,75 Q32,90 20,84 Q8,96 3,80 Q-4,64 8,52 Q3,38 0,22"/>
  <path d="M100,35 Q125,24 148,36 Q136,50 112,42"/>
  <circle cx="82" cy="20" r="4"/>
</g>
<g transform="translate(935,625)" opacity="0.22" stroke="#8B0000" stroke-width="1.5" fill="none">
  <path d="M0,0 Q55,-35 88,22 Q121,79 66,112 Q11,145 34,178 Q57,211 112,198"/>
  <path d="M112,198 Q145,186 133,152 Q121,118 88,130 Q55,142 68,178"/>
  <path d="M0,0 Q-22,32 12,56 Q46,80 34,114"/>
</g>
</svg>`

        };
    }


    get _albumBannerSVGs() {
        return {

'power-metal': `<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 1440 500" preserveAspectRatio="xMidYMid slice">
<style>
@keyframes abpm-p{0%,100%{opacity:1}50%{opacity:.55}}
@keyframes abpm-r{0%,100%{opacity:.08}50%{opacity:.16}}
@keyframes abpm-c{0%,100%{opacity:.2}50%{opacity:.38}}
.abpm-glow{animation:abpm-p 8s ease-in-out infinite}
.abpm-rays{animation:abpm-r 10s ease-in-out infinite 1s}
.abpm-crown{animation:abpm-c 5s ease-in-out infinite}
[data-layer]{transition:transform .18s ease-out}
</style>
<defs>
  <radialGradient id="abpm-bg" cx="50%" cy="50%" r="55%">
    <stop offset="0%" stop-color="#FFD700" stop-opacity="0.14"/>
    <stop offset="100%" stop-color="#FFD700" stop-opacity="0"/>
  </radialGradient>
</defs>
<g data-layer="bg"><ellipse class="abpm-glow" cx="720" cy="250" rx="680" ry="260" fill="url(#abpm-bg)"/></g>
<g data-layer="bg" class="abpm-rays" stroke="#FFD700" stroke-opacity="0.055" stroke-width="1.2" fill="none">
  <line x1="720" y1="560" x2="80" y2="-20"/><line x1="720" y1="560" x2="260" y2="-20"/>
  <line x1="720" y1="560" x2="460" y2="-20"/><line x1="720" y1="560" x2="660" y2="-20"/>
  <line x1="720" y1="560" x2="780" y2="-20"/><line x1="720" y1="560" x2="980" y2="-20"/>
  <line x1="720" y1="560" x2="1180" y2="-20"/><line x1="720" y1="560" x2="1360" y2="-20"/>
</g>
<g data-layer="mid" transform="translate(48,15)" opacity="0.26" fill="#FFD700">
  <polygon points="9,0 14,320 9,345 4,320"/>
  <rect x="-18" y="98" width="54" height="9" rx="2.5"/>
  <rect x="6" y="107" width="6" height="62" fill="#8B6914"/>
  <circle cx="9" cy="5" r="4.5" fill="#FFF8DC"/>
</g>
<g data-layer="mid" transform="translate(1392,15) scale(-1,1)" opacity="0.26" fill="#FFD700">
  <polygon points="9,0 14,320 9,345 4,320"/>
  <rect x="-18" y="98" width="54" height="9" rx="2.5"/>
  <rect x="6" y="107" width="6" height="62" fill="#8B6914"/>
  <circle cx="9" cy="5" r="4.5" fill="#FFF8DC"/>
</g>
<g data-layer="fg" class="abpm-crown" transform="translate(660,8)" opacity="0.2" fill="#FFD700">
  <polygon points="60,0 120,0 108,32 88,18 72,36 60,14 48,36 32,18 12,32 0,0"/>
  <rect x="12" y="32" width="96" height="12" rx="3"/>
  <circle cx="28" cy="16" r="3.5" fill="#FF6600"/>
  <circle cx="60" cy="6" r="3.5" fill="#FF6600"/>
  <circle cx="92" cy="16" r="3.5" fill="#FF6600"/>
</g>
<g data-layer="fg" stroke="#FFD700" stroke-opacity="0.28" fill="none" stroke-width="1.5">
  <path d="M12,12 L90,12 M12,12 L12,90"/><path d="M26,26 L72,26 M26,26 L26,72"/>
  <path d="M1428,12 L1350,12 M1428,12 L1428,90"/><path d="M1414,26 L1368,26 M1414,26 L1414,72"/>
  <path d="M12,488 L90,488 M12,488 L12,410"/><path d="M26,474 L72,474 M26,474 L26,428"/>
  <path d="M1428,488 L1350,488 M1428,488 L1428,410"/><path d="M1414,474 L1368,474 M1414,474 L1414,428"/>
</g>
</svg>`,

'gothic-metal': `<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 1440 500" preserveAspectRatio="xMidYMid slice">
<style>
@keyframes abgm-p{0%,100%{opacity:1}50%{opacity:.55}}
@keyframes abgm-bat{0%,100%{opacity:.2}55%{opacity:.44}}
@keyframes abgm-moon{0%,100%{opacity:.32}50%{opacity:.14}}
.abgm-glow{animation:abgm-p 9s ease-in-out infinite}
.abgm-bat1{animation:abgm-bat 5.5s ease-in-out infinite}
.abgm-bat2{animation:abgm-bat 6.8s ease-in-out infinite 1s}
.abgm-bat3{animation:abgm-bat 4.8s ease-in-out infinite .5s}
.abgm-moon{animation:abgm-moon 7s ease-in-out infinite}
[data-layer]{transition:transform .18s ease-out}
</style>
<defs>
  <radialGradient id="abgm-bg" cx="50%" cy="45%" r="55%">
    <stop offset="0%" stop-color="#9D00FF" stop-opacity="0.16"/>
    <stop offset="100%" stop-color="#9D00FF" stop-opacity="0"/>
  </radialGradient>
</defs>
<g data-layer="bg"><ellipse class="abgm-glow" cx="720" cy="225" rx="660" ry="240" fill="url(#abgm-bg)"/></g>
<g data-layer="mid" transform="translate(30,-5)" opacity="0.1" stroke="#9D00FF" stroke-width="2" fill="none">
  <path d="M0,505 L0,220 Q0,40 120,40 Q240,40 240,220 L240,505"/>
  <path d="M30,505 L30,224 Q30,70 120,70 Q210,70 210,224 L210,505"/>
  <circle cx="120" cy="110" r="65"/><circle cx="120" cy="110" r="44"/><circle cx="120" cy="110" r="22"/>
  <line x1="55" y1="110" x2="185" y2="110"/><line x1="120" y1="45" x2="120" y2="175"/>
  <line x1="74" y1="64" x2="166" y2="156"/><line x1="166" y1="64" x2="74" y2="156"/>
</g>
<g data-layer="bg" class="abgm-moon" transform="translate(1285,18)" opacity="0.32">
  <circle cx="62" cy="62" r="60" fill="#14001e"/>
  <circle cx="80" cy="46" r="55" fill="#060608"/>
</g>
<g data-layer="fg" fill="#9D00FF">
  <g class="abgm-bat1" transform="translate(1110,105) rotate(-12) scale(1.3)" opacity="0.22">
    <path d="M18,8 Q0,-2 -32,4 Q-14,16 -2,18 Q-8,28 -20,32 Q-4,30 8,20 Q12,16 18,8"/>
    <path d="M18,8 Q36,-2 68,4 Q50,16 38,18 Q44,28 56,32 Q40,30 28,20 Q24,16 18,8"/>
    <ellipse cx="18" cy="8" rx="7" ry="9"/>
  </g>
  <g class="abgm-bat2" transform="translate(1200,55) rotate(8) scale(0.9)" opacity="0.22">
    <path d="M18,8 Q0,-2 -32,4 Q-14,16 -2,18 Q-8,28 -20,32 Q-4,30 8,20 Q12,16 18,8"/>
    <path d="M18,8 Q36,-2 68,4 Q50,16 38,18 Q44,28 56,32 Q40,30 28,20 Q24,16 18,8"/>
    <ellipse cx="18" cy="8" rx="7" ry="9"/>
  </g>
  <g class="abgm-bat3" transform="translate(1058,178) rotate(-5) scale(0.7)" opacity="0.22">
    <path d="M18,8 Q0,-2 -32,4 Q-14,16 -2,18 Q-8,28 -20,32 Q-4,30 8,20 Q12,16 18,8"/>
    <path d="M18,8 Q36,-2 68,4 Q50,16 38,18 Q44,28 56,32 Q40,30 28,20 Q24,16 18,8"/>
    <ellipse cx="18" cy="8" rx="7" ry="9"/>
  </g>
</g>
<g data-layer="bg" stroke="#9D00FF" stroke-opacity="0.12" fill="none" stroke-width="1.2">
  <path d="M0,470 Q180,450 360,470 Q540,490 720,470 Q900,450 1080,470 Q1260,490 1440,470"/>
  <path d="M0,488 Q180,468 360,488 Q540,508 720,488 Q900,468 1080,488 Q1260,508 1440,488"/>
</g>
<g data-layer="fg" stroke="#9D00FF" stroke-opacity="0.22" fill="none" stroke-width="1.5">
  <circle cx="30" cy="465" r="28"/><circle cx="30" cy="465" r="18"/>
  <line x1="30" y1="437" x2="30" y2="493"/><line x1="2" y1="465" x2="58" y2="465"/>
  <circle cx="1410" cy="465" r="28"/><circle cx="1410" cy="465" r="18"/>
  <line x1="1410" y1="437" x2="1410" y2="493"/><line x1="1382" y1="465" x2="1438" y2="465"/>
</g>
</svg>`,

'punk-rock': `<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 1440 500" preserveAspectRatio="xMidYMid slice">
<style>
@keyframes abpr-fl{0%,82%,100%{opacity:.28}88%{opacity:.55}95%{opacity:.32}}
@keyframes abpr-fr{0%,78%,100%{opacity:.28}86%{opacity:.52}93%{opacity:.3}}
@keyframes abpr-tw{0%,100%{opacity:.45}50%{opacity:.9}}
@keyframes abpr-a{0%,100%{opacity:.08}50%{opacity:.15}}
.abpr-bolt-l{animation:abpr-fl 2.8s ease-in-out infinite}
.abpr-bolt-r{animation:abpr-fr 3.2s ease-in-out infinite .4s}
.abpr-star1{animation:abpr-tw 1.7s ease-in-out infinite}
.abpr-star2{animation:abpr-tw 2.2s ease-in-out infinite .5s}
.abpr-star3{animation:abpr-tw 1.9s ease-in-out infinite 1s}
.abpr-anarchy{animation:abpr-a 5s ease-in-out infinite}
[data-layer]{transition:transform .18s ease-out}
</style>
<g data-layer="bg" stroke="#FF1493" stroke-opacity="0.04" stroke-width="1" fill="none">
  <line x1="0" y1="0" x2="0" y2="500"/><line x1="144" y1="0" x2="144" y2="500"/>
  <line x1="288" y1="0" x2="288" y2="500"/><line x1="432" y1="0" x2="432" y2="500"/>
  <line x1="576" y1="0" x2="576" y2="500"/><line x1="720" y1="0" x2="720" y2="500"/>
  <line x1="864" y1="0" x2="864" y2="500"/><line x1="1008" y1="0" x2="1008" y2="500"/>
  <line x1="1152" y1="0" x2="1152" y2="500"/><line x1="1296" y1="0" x2="1296" y2="500"/>
  <line x1="0" y1="125" x2="1440" y2="125"/><line x1="0" y1="250" x2="1440" y2="250"/>
  <line x1="0" y1="375" x2="1440" y2="375"/>
</g>
<polygon class="abpr-bolt-l" data-layer="mid" points="0,500 0,430 72,10 118,10 46,500" fill="#FF1493" opacity="0.28"/>
<polygon class="abpr-bolt-r" data-layer="mid" points="1440,500 1440,430 1368,10 1322,10 1394,500" fill="#00FFFF" opacity="0.28"/>
<g data-layer="fg" class="abpr-anarchy" transform="translate(148,178)" opacity="0.08" stroke="#FF1493" stroke-width="5" fill="none">
  <path d="M60,0 L0,120 L120,120 Z"/><line x1="16" y1="78" x2="104" y2="78"/>
</g>
<g data-layer="fg" fill="#FFFF00">
  <polygon class="abpr-star1" points="188,418 192,430 204,430 195,438 198,450 188,442 178,450 181,438 172,430 184,430" opacity="0.45"/>
  <polygon class="abpr-star2" points="1262,52 1265,61 1274,61 1267,67 1270,76 1262,70 1254,76 1257,67 1250,61 1259,61" opacity="0.45"/>
  <polygon class="abpr-star3" points="240,68 242,75 250,75 244,80 246,87 240,83 234,87 236,80 230,75 238,75" opacity="0.45"/>
</g>
<polygon data-layer="bg" points="0,0 0,22 60,8 120,22 180,6 240,22 300,8 360,22 420,6 480,22 540,8 600,22 660,6 720,22 780,6 840,22 900,8 960,22 1020,6 1080,22 1140,8 1200,22 1260,6 1320,22 1380,8 1440,22 1440,0" fill="#FF1493" opacity="0.16"/>
<polygon data-layer="bg" points="0,500 0,478 60,492 120,478 180,494 240,478 300,492 360,478 420,494 480,478 540,492 600,478 660,494 720,478 780,494 840,478 900,492 960,478 1020,494 1080,478 1140,492 1200,478 1260,494 1320,478 1380,492 1440,478 1440,500" fill="#00FFFF" opacity="0.12"/>
<g data-layer="fg" opacity="0.2" stroke="#00FFFF" stroke-width="1.5" fill="none">
  <g transform="translate(52,428)"><path d="M18,0 L0,36 L36,36 Z"/><line x1="5" y1="24" x2="31" y2="24"/><circle cx="18" cy="18" r="22"/></g>
  <g transform="translate(1350,42)"><path d="M18,0 L0,36 L36,36 Z"/><line x1="5" y1="24" x2="31" y2="24"/><circle cx="18" cy="18" r="22"/></g>
</g>
</svg>`,

'heavy-metal': `<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 1440 500" preserveAspectRatio="xMidYMid slice">
<style>
@keyframes abhm-fl{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.07) translateY(-7px)}}
@keyframes abhm-sp{0%,100%{opacity:.42}50%{opacity:.76}}
@keyframes abhm-g{0%,100%{opacity:1}50%{opacity:.58}}
.abhm-fl{animation:abhm-fl 2.6s ease-in-out infinite;transform-box:fill-box;transform-origin:bottom center}
.abhm-fr{animation:abhm-fl 2.6s ease-in-out infinite .5s;transform-box:fill-box;transform-origin:bottom center}
.abhm-fc{animation:abhm-fl 2s ease-in-out infinite .2s;transform-box:fill-box;transform-origin:bottom center}
.abhm-sp{animation:abhm-sp 1.4s ease-in-out infinite}
.abhm-glow{animation:abhm-g 4s ease-in-out infinite}
[data-layer]{transition:transform .18s ease-out}
</style>
<defs>
  <radialGradient id="abhm-bg" cx="50%" cy="100%" r="65%">
    <stop offset="0%" stop-color="#FF4500" stop-opacity="0.22"/>
    <stop offset="55%" stop-color="#CC0000" stop-opacity="0.08"/>
    <stop offset="100%" stop-color="transparent"/>
  </radialGradient>
</defs>
<g data-layer="bg"><ellipse class="abhm-glow" cx="720" cy="520" rx="720" ry="300" fill="url(#abhm-bg)"/></g>
<g data-layer="mid" opacity="0.36" fill="#FF4500">
  <path class="abhm-fl" d="M80,500 Q68,440 100,410 Q82,372 118,338 Q108,388 135,402 Q152,368 142,320 Q168,385 158,418 Q185,390 175,355 Q200,412 188,450 Q212,422 200,378 Q222,435 210,500 Z"/>
  <path class="abhm-fc" d="M40,500 Q30,462 55,440 Q40,406 68,384 Q60,424 80,432 Q92,404 85,375 Q104,418 96,448 Q110,432 106,405 Q118,445 109,500 Z" fill="#CC0000" opacity="0.5"/>
</g>
<g data-layer="mid" opacity="0.36" fill="#FF4500" transform="translate(1440,0) scale(-1,1)">
  <path class="abhm-fr" d="M80,500 Q68,440 100,410 Q82,372 118,338 Q108,388 135,402 Q152,368 142,320 Q168,385 158,418 Q185,390 175,355 Q200,412 188,450 Q212,422 200,378 Q222,435 210,500 Z"/>
  <path class="abhm-fc" d="M40,500 Q30,462 55,440 Q40,406 68,384 Q60,424 80,432 Q92,404 85,375 Q104,418 96,448 Q110,432 106,405 Q118,445 109,500 Z" fill="#CC0000" opacity="0.5"/>
</g>
<g data-layer="fg" class="abhm-sp" fill="#FFA500" opacity="0.42">
  <circle cx="205" cy="360" r="2.5"/><circle cx="165" cy="325" r="2"/><circle cx="130" cy="348" r="2.5"/>
  <circle cx="1235" cy="360" r="2.5"/><circle cx="1275" cy="325" r="2"/><circle cx="1310" cy="348" r="2.5"/>
  <circle cx="250" cy="308" r="1.8"/><circle cx="1190" cy="308" r="1.8"/>
</g>
<g data-layer="fg" stroke="#CC0000" stroke-opacity="0.25" fill="none">
  <path d="M15,15 L95,15 M15,15 L15,95" stroke-width="2.5"/>
  <path d="M30,30 L75,30 M30,30 L30,75" stroke-width="1.5"/>
  <path d="M1425,15 L1345,15 M1425,15 L1425,95" stroke-width="2.5"/>
  <path d="M1410,30 L1365,30 M1410,30 L1410,75" stroke-width="1.5"/>
</g>
</svg>`,

'symphonic-metal': `<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 1440 500" preserveAspectRatio="xMidYMid slice">
<style>
@keyframes absm-glow{0%,100%{opacity:1}50%{opacity:.52}}
@keyframes absm-tw{0%,100%{opacity:.42}50%{opacity:.9}}
@keyframes absm-frame{0%,100%{opacity:1}50%{opacity:.55}}
.absm-glow{animation:absm-glow 9s ease-in-out infinite}
.absm-clef{animation:absm-glow 9s ease-in-out infinite}
.absm-notes{animation:absm-glow 7s ease-in-out infinite 2s}
.absm-star1{animation:absm-tw 2s ease-in-out infinite}
.absm-star2{animation:absm-tw 2.8s ease-in-out infinite .5s}
.absm-star3{animation:absm-tw 2.3s ease-in-out infinite 1s}
.absm-star4{animation:absm-tw 3.1s ease-in-out infinite 1.5s}
.absm-frame{animation:absm-frame 12s ease-in-out infinite}
[data-layer]{transition:transform .18s ease-out}
</style>
<defs>
  <radialGradient id="absm-bg" cx="50%" cy="40%" r="52%">
    <stop offset="0%" stop-color="#4169E1" stop-opacity="0.18"/>
    <stop offset="100%" stop-color="#4169E1" stop-opacity="0"/>
  </radialGradient>
</defs>
<g data-layer="bg"><ellipse class="absm-glow" cx="720" cy="200" rx="660" ry="240" fill="url(#absm-bg)"/></g>
<g data-layer="bg" class="absm-frame" stroke="#4169E1" stroke-opacity="0.2" fill="none" stroke-width="1.5">
  <path d="M80,45 Q240,24 400,45 Q480,56 540,42 Q600,28 660,42 Q720,56 780,42 Q840,28 900,42 Q960,56 1040,45 Q1200,24 1360,45"/>
  <path d="M80,58 Q240,37 400,58 Q480,69 540,55 Q600,41 660,55 Q720,69 780,55 Q840,41 900,55 Q960,69 1040,58 Q1200,37 1360,58"/>
  <path d="M80,455 Q240,434 400,455 Q480,466 540,452 Q600,438 660,452 Q720,466 780,452 Q840,438 900,452 Q960,466 1040,455 Q1200,434 1360,455"/>
  <path d="M80,468 Q240,447 400,468 Q480,479 540,465 Q600,451 660,465 Q720,479 780,465 Q840,451 900,465 Q960,479 1040,468 Q1200,447 1360,468"/>
  <path d="M80,45 Q52,78 64,118 Q50,155 64,185"/>
  <path d="M1360,45 Q1388,78 1376,118 Q1390,155 1376,185"/>
  <path d="M80,455 Q52,422 64,382 Q50,345 64,315"/>
  <path d="M1360,455 Q1388,422 1376,382 Q1390,345 1376,315"/>
</g>
<g data-layer="mid" class="absm-clef" transform="translate(40,80)" opacity="0.22" stroke="#4169E1" stroke-width="2.5" fill="none">
  <path d="M38,10 Q68,8 68,38 Q68,72 38,90 Q8,108 8,148 Q8,188 36,205 Q64,222 64,260 Q64,318 28,340"/>
  <circle cx="24" cy="350" r="22" fill="#4169E1" fill-opacity="0.1"/>
  <line x1="24" y1="372" x2="24" y2="395"/>
  <line x1="24" y1="328" x2="24" y2="180"/>
</g>
<g data-layer="mid" class="absm-notes" transform="translate(950,165)" opacity="0.18" stroke="#4169E1" fill="none">
  <line x1="0" y1="0" x2="360" y2="0" stroke-width="1.2"/>
  <line x1="0" y1="16" x2="360" y2="16" stroke-width="1.2"/>
  <line x1="0" y1="32" x2="360" y2="32" stroke-width="1.2"/>
  <line x1="0" y1="48" x2="360" y2="48" stroke-width="1.2"/>
  <line x1="0" y1="64" x2="360" y2="64" stroke-width="1.2"/>
  <ellipse cx="50" cy="8" rx="10" ry="7" fill="#4169E1" fill-opacity="0.5" stroke="none"/>
  <line x1="60" y1="8" x2="60" y2="-48" stroke-width="1.2"/>
  <ellipse cx="110" cy="24" rx="10" ry="7" fill="#4169E1" fill-opacity="0.5" stroke="none"/>
  <line x1="120" y1="24" x2="120" y2="-32" stroke-width="1.2"/>
  <path d="M120,-32 Q142,-20 136,-5" stroke-width="1.2"/>
  <ellipse cx="170" cy="8" rx="10" ry="7" fill="#4169E1" fill-opacity="0.5" stroke="none"/>
  <line x1="180" y1="8" x2="180" y2="-48" stroke-width="1.2"/>
  <path d="M180,-48 Q202,-38 197,-22" stroke-width="1.2"/>
</g>
<g data-layer="fg" fill="#C0C0C0" opacity="0.42">
  <path class="absm-star1" d="M140,115 L142,122 L150,122 L144,127 L146,134 L140,129 L134,134 L136,127 L130,122 L138,122 Z"/>
  <path class="absm-star2" d="M1310,195 L1312,202 L1320,202 L1314,207 L1316,214 L1310,209 L1304,214 L1306,207 L1300,202 L1308,202 Z"/>
  <path class="absm-star3" d="M168,398 L170,405 L178,405 L172,410 L174,417 L168,412 L162,417 L164,410 L158,405 L166,405 Z"/>
  <path class="absm-star4" d="M1275,398 L1277,405 L1285,405 L1279,410 L1281,417 L1275,412 L1269,417 L1271,410 L1265,405 L1273,405 Z"/>
  <circle cx="420" cy="88" r="2.2"/><circle cx="700" cy="72" r="2.2"/><circle cx="820" cy="112" r="2.2"/>
</g>
</svg>`,

'dark-ambient': `<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 1440 500" preserveAspectRatio="xMidYMid slice">
<style>
@keyframes abda-tw{0%,100%{opacity:.38}50%{opacity:.82}}
@keyframes abda-moon{0%,100%{opacity:.32}50%{opacity:.14}}
@keyframes abda-q{0%,100%{opacity:.26}50%{opacity:.44}}
@keyframes abda-b{0%,100%{opacity:.065}50%{opacity:.13}}
.abda-star1{animation:abda-tw 2.2s ease-in-out infinite}
.abda-star2{animation:abda-tw 3s ease-in-out infinite .6s}
.abda-star3{animation:abda-tw 1.9s ease-in-out infinite 1.2s}
.abda-star4{animation:abda-tw 2.7s ease-in-out infinite .3s}
.abda-star5{animation:abda-tw 3.4s ease-in-out infinite .9s}
.abda-moon{animation:abda-moon 7s ease-in-out infinite}
.abda-quill{animation:abda-q 8s ease-in-out infinite}
.abda-book{animation:abda-b 9s ease-in-out infinite}
[data-layer]{transition:transform .18s ease-out}
</style>
<defs>
  <radialGradient id="abda-bg" cx="50%" cy="40%" r="52%">
    <stop offset="0%" stop-color="#8B0000" stop-opacity="0.14"/>
    <stop offset="100%" stop-color="#8B0000" stop-opacity="0"/>
  </radialGradient>
</defs>
<g data-layer="bg"><ellipse cx="720" cy="200" rx="660" ry="240" fill="url(#abda-bg)"/></g>
<g data-layer="bg" class="abda-moon" transform="translate(1288,18)" opacity="0.32">
  <circle cx="62" cy="62" r="60" fill="#12000a"/>
  <circle cx="80" cy="46" r="55" fill="#060608"/>
</g>
<g data-layer="mid" fill="#8B0000" opacity="0.38">
  <circle class="abda-star1" cx="240" cy="72" r="2.5"/>
  <circle class="abda-star2" cx="308" cy="48" r="2"/>
  <circle class="abda-star3" cx="378" cy="80" r="2.5"/>
  <circle class="abda-star4" cx="448" cy="44" r="2"/>
  <circle class="abda-star5" cx="512" cy="68" r="2"/>
  <circle cx="580" cy="36" r="2.5"/>
  <line x1="240" y1="72" x2="308" y2="48" stroke="#8B0000" stroke-width="0.6" opacity="0.5"/>
  <line x1="308" y1="48" x2="378" y2="80" stroke="#8B0000" stroke-width="0.6" opacity="0.5"/>
  <line x1="378" y1="80" x2="448" y2="44" stroke="#8B0000" stroke-width="0.6" opacity="0.5"/>
  <line x1="448" y1="44" x2="512" y2="68" stroke="#8B0000" stroke-width="0.6" opacity="0.5"/>
  <line x1="512" y1="68" x2="580" y2="36" stroke="#8B0000" stroke-width="0.6" opacity="0.5"/>
</g>
<g data-layer="mid" fill="#8B0000" opacity="0.38">
  <circle class="abda-star1" cx="870" cy="58" r="2"/>
  <circle class="abda-star3" cx="940" cy="82" r="2.5"/>
  <circle class="abda-star2" cx="1010" cy="46" r="2"/>
  <circle class="abda-star4" cx="1078" cy="72" r="2.5"/>
  <circle class="abda-star5" cx="1145" cy="38" r="2"/>
  <line x1="870" y1="58" x2="940" y2="82" stroke="#8B0000" stroke-width="0.6" opacity="0.5"/>
  <line x1="940" y1="82" x2="1010" y2="46" stroke="#8B0000" stroke-width="0.6" opacity="0.5"/>
  <line x1="1010" y1="46" x2="1078" y2="72" stroke="#8B0000" stroke-width="0.6" opacity="0.5"/>
  <line x1="1078" y1="72" x2="1145" y2="38" stroke="#8B0000" stroke-width="0.6" opacity="0.5"/>
</g>
<g data-layer="fg" class="abda-quill" transform="translate(38,60)" opacity="0.26">
  <path d="M35,0 Q68,32 44,90 Q20,148 10,250 Q0,312 6,400" stroke="#8B0000" stroke-width="2.2" fill="none"/>
  <path d="M35,0 Q10,32 8,68 M33,22 Q8,54 6,92 M31,45 Q6,77 4,115 M29,68 Q4,100 2,138" stroke="#6B4513" stroke-width="0.8" fill="none" opacity="0.6"/>
  <path d="M35,0 Q58,32 62,68 M37,22 Q60,54 66,92 M39,45 Q62,77 68,115 M41,68 Q64,100 70,138" stroke="#6B4513" stroke-width="0.8" fill="none" opacity="0.6"/>
  <path d="M6,400 L0,422 L12,416 L4,438 L14,432 L8,402" fill="#444" stroke="none" opacity="0.45"/>
</g>
<g data-layer="mid" class="abda-book" transform="translate(1025,360)" opacity="0.07" stroke="#8B0000" stroke-width="1.5" fill="none">
  <path d="M185,-42 Q185,-60 140,-66 Q95,-72 50,-60 Q5,-48 -20,-38 Q5,-28 50,-16 Q95,-4 140,-10 Q185,-16 185,-42"/>
  <path d="M185,-42 Q185,-60 230,-66 Q275,-72 320,-60 Q365,-48 390,-38 Q365,-28 320,-16 Q275,-4 230,-10 Q185,-16 185,-42"/>
  <line x1="18" y1="-54" x2="168" y2="-44"/><line x1="18" y1="-44" x2="168" y2="-34"/>
  <line x1="202" y1="-54" x2="352" y2="-44"/><line x1="202" y1="-44" x2="352" y2="-34"/>
</g>
<g data-layer="fg" opacity="0.2" fill="#8B0000">
  <path d="M0,22 Q22,0 56,6 Q90,12 100,35 Q110,58 88,70 Q66,82 44,75 Q32,90 20,84 Q8,96 3,80 Q-4,64 8,52 Q3,38 0,22" transform="translate(30,390)"/>
  <circle cx="112" cy="410" r="3.5"/>
</g>
</svg>`

        };
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
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                            box-shadow 0.3s ease,
                            border-color 0.3s ease;
                /* will-change и translateZ(0) убраны: создавали GPU-слой
                   для каждой карточки → много памяти и compositing-лаги */
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
                border-radius: var(--radius);
                cursor: pointer;
                transition: transform 0.2s ease,
                            box-shadow 0.2s ease,
                            filter 0.2s ease;
                transform: translateZ(0);
                /* animation убрана — она вызывала постоянный GPU repaint на всех кнопках */
            }

            button:hover, .btn:hover {
                transform: translateY(-2px) translateZ(0);
                box-shadow: var(--glow);
                filter: brightness(1.2);
            }

            /* === НАВИГАЦИЯ ===
               Хедер НЕ переопределяем — он управляется header-epic.css.
               Переопределение border-bottom с переменной шириной (2px/3px)
               вызывало прыжки layout при смене темы. */
            
            .nav-link {
                font-family: ${theme.fonts.body};
                color: var(--text);
                transition: color 0.2s ease,
                            text-shadow 0.2s ease;
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
        
        // Переиспользуем один observer вместо создания нового при каждой смене темы
        if (this._cardObserver) {
            this._cardObserver.disconnect();
        }

        const animName = theme.animations.cardAppear;
        this._cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = `${animName} forwards`;
                    this._cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.card, .panel, .album-showcase-card, .blog-card').forEach(el => {
            this._cardObserver.observe(el);
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
                    left: 30px;
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
                    left: 0;
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
                        left: 20px;
                    }

                    .theme-fab {
                        width: 50px;
                        height: 50px;
                        font-size: 24px;
                    }

                    .theme-options-v3 {
                        bottom: 65px;
                        left: 0;
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