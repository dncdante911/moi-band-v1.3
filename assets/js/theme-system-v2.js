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
            h1, h2, h3, h4, h5, h6, .heading, .title, .section-title {
                font-family: ${fonts.heading} !important;
            }

            body, p, div, span, td, input, textarea {
                font-family: ${fonts.body} !important;
            }

            /* Хедер навигации НЕ меняем шрифт — разные шрифты разной ширины
               вызывали перенос пунктов на вторую строку и прыжки хедера */
            .site-header, .site-header *,
            .main-nav, .main-nav a, .main-nav li,
            .logo, .logo a {
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