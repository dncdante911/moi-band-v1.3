/**
 * Epic Player v4.4 - С ЭКВАЛАЙЗЕРОМ И КАЧЕСТВЕННЫМ ЗВУКОМ
 * ✅ Web Audio API для качественного воспроизведения
 * ✅ Эквалайзер с пресетами для металла
 */

class EpicPlayer {
    constructor(containerId = 'epic-player') {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('❌ Player container not found:', containerId);
            return;
        }
        
        this.queue = [];
        this.currentIndex = 0;
        this.isPlaying = false;
        this.currentMode = 'audio';
        this.repeatMode = 'none';
        this.isShuffle = false;
        this.volume = 0.8;
        this.isMuted = false;
        this.previousVolume = this.volume;
        
        // Web Audio API для качественного звука
        this.audioContext = null;
        this.audioSource = null;
        this.gainNode = null;
        this.analyser = null;
        
        // Эквалайзер
        this.eqBands = [];
        this.currentPreset = 'flat';
        
        console.log('🎸 Epic Player v4.4 - High Quality Audio Edition');
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupVolumeControl();
        this.setupEqualizer();
        this.loadAlbumFromURL();
        this.restoreVolume();
        this.restoreEQPreset();
        
        // Инициализируем Audio Context после первого взаимодействия (для мобильных)
        const initAudioOnInteraction = () => {
            if (!this.audioContext) {
                this.initAudioContext();
            }
            document.removeEventListener('touchstart', initAudioOnInteraction);
            document.removeEventListener('click', initAudioOnInteraction);
        };
        
        document.addEventListener('touchstart', initAudioOnInteraction, { once: true });
        document.addEventListener('click', initAudioOnInteraction, { once: true });
    }
    
    // === WEB AUDIO API ДЛЯ КАЧЕСТВЕННОГО ЗВУКА ===
    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Gain node для громкости
            this.gainNode = this.audioContext.createGain();
            this.gainNode.gain.value = this.volume;
            
            // Analyser для визуализации
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 256;
            
            // Создаем эквалайзер (10 полос)
            const frequencies = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
            
            frequencies.forEach(freq => {
                const filter = this.audioContext.createBiquadFilter();
                filter.type = 'peaking';
                filter.frequency.value = freq;
                filter.Q.value = 1;
                filter.gain.value = 0;
                this.eqBands.push(filter);
            });
            
            // Соединяем цепочку
            this.connectAudioChain();
            
            console.log('✅ Web Audio API initialized');
        } catch (e) {
            console.warn('⚠️ Web Audio API not supported, falling back to HTML5 Audio');
        }
    }
    
    connectAudioChain() {
        if (!this.audioContext) {
            console.warn('⚠️ Audio context not ready');
            return;
        }
        
        // Отключаем старые соединения
        if (this.audioSource) {
            try {
                this.audioSource.disconnect();
            } catch (e) {}
        }
        
        const audio = this.container?.querySelector('audio');
        if (!audio) return;
        
        try {
            // Resume context если suspended (мобильные браузеры)
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume().then(() => {
                    console.log('✅ Audio context resumed');
                });
            }
            
            // Создаем источник из audio элемента (только один раз)
            if (!this.audioSource) {
                this.audioSource = this.audioContext.createMediaElementSource(audio);
            }
            
            // Соединяем: источник -> эквалайзер -> gain -> analyser -> выход
            let currentNode = this.audioSource;
            
            this.eqBands.forEach(band => {
                currentNode.connect(band);
                currentNode = band;
            });
            
            currentNode.connect(this.gainNode);
            this.gainNode.connect(this.analyser);
            this.analyser.connect(this.audioContext.destination);
            
            console.log('✅ Audio chain connected');
        } catch (e) {
            console.warn('⚠️ Could not connect audio chain:', e);
            // Fallback - используем обычный HTML5 audio без Web Audio API
        }
    }
    
    // === ЭКВАЛАЙЗЕР ===
    setupEqualizer() {
        const eqButtons = this.container?.querySelectorAll('.eq-preset-btn');
        if (eqButtons) {
            eqButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const preset = btn.dataset.preset;
                    this.applyEQPreset(preset);
                });
            });
        }
        
        // Применяем дефолтный пресет
        this.applyEQPreset(this.currentPreset);
    }
    
    applyEQPreset(presetName) {
        if (!this.audioContext) {
            console.warn('⚠️ Web Audio API not available - EQ disabled');
            this.showError('Эквалайзер недоступен на этом устройстве');
            return;
        }
        
        this.currentPreset = presetName;
        
        // Пресеты эквалайзера (значения в dB) - БОЛЕЕ КОНТРАСТНЫЕ
        const presets = {
            'flat': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            
            // Power Metal - энергичный, мощный, яркий
            'power-metal': [6, 4, 2, -2, -3, 0, 3, 5, 7, 5],
            
            // Heavy Metal - максимальная агрессия, глубокие басы
            'heavy-metal': [8, 6, 4, 1, -3, -2, 3, 6, 7, 6],
            
            // Rock - классика, сбалансированный драйв
            'rock': [5, 3, 1, 0, -2, 0, 2, 4, 5, 3],
            
            // Punk Rock - резкие средние, атака
            'punk-rock': [6, 4, 3, 2, -1, 1, 4, 6, 5, 2],
            
            // Gothic - глубина, тьма, атмосфера
            'gothic': [7, 5, 2, -3, -5, -3, 0, 2, 4, 6],
            
            // Symphonic - оркестровая широта
            'symphonic': [4, 2, 0, -2, -3, 1, 3, 5, 6, 5]
        };
        
        const gains = presets[presetName] || presets['flat'];
        
        this.eqBands.forEach((band, index) => {
            band.gain.value = gains[index];
        });
        
        // Обновляем кнопки
        const buttons = this.container?.querySelectorAll('.eq-preset-btn');
        if (buttons) {
            buttons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.preset === presetName);
            });
        }
        
        // Сохраняем пресет
        this.saveEQPreset();
        
        console.log(`🎚️ EQ Preset: ${presetName}`, gains);
    }
    
    saveEQPreset() {
        try {
            localStorage.setItem('epicPlayerEQPreset', this.currentPreset);
        } catch (e) {
            console.warn('⚠️ Could not save EQ preset');
        }
    }
    
    restoreEQPreset() {
        try {
            const saved = localStorage.getItem('epicPlayerEQPreset');
            if (saved) {
                this.applyEQPreset(saved);
            }
        } catch (e) {
            console.warn('⚠️ Could not restore EQ preset');
        }
    }
    
    setupEventListeners() {
        const playBtn = this.container?.querySelector('.play-btn');
        const prevBtn = this.container?.querySelector('[data-action="prev"]');
        const nextBtn = this.container?.querySelector('[data-action="next"]');
        const repeatBtn = this.container?.querySelector('[data-action="repeat"]');
        const shuffleBtn = this.container?.querySelector('[data-action="shuffle"]');
        
        if (playBtn) playBtn.addEventListener('click', () => this.togglePlay());
        if (prevBtn) prevBtn.addEventListener('click', () => this.prevTrack());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextTrack());
        if (repeatBtn) repeatBtn.addEventListener('click', () => this.toggleRepeat());
        if (shuffleBtn) shuffleBtn.addEventListener('click', () => this.toggleShuffle());
        
        const modeButtons = this.container?.querySelectorAll('.mode-btn');
        if (modeButtons) {
            modeButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const mode = e.target.dataset.mode;
                    if (mode) this.switchMode(mode);
                });
            });
        }
        
        const progressBar = this.container?.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.addEventListener('click', (e) => this.seekTo(e));
        }
        
        const audio = this.container?.querySelector('audio');
        if (audio) {
            audio.addEventListener('timeupdate', () => this.updateProgress());
            audio.addEventListener('ended', () => this.onTrackEnded());
            audio.addEventListener('loadedmetadata', () => this.updateDuration());
            audio.addEventListener('play', () => {
                // Resume audio context если приостановлен (мобильные браузеры)
                if (this.audioContext && this.audioContext.state === 'suspended') {
                    this.audioContext.resume().then(() => {
                        console.log('✅ Audio context resumed on play');
                    });
                }

                // Подключаем цепь если ещё не подключена
                if (this.audioContext && !this.audioSource) {
                    this.connectAudioChain();
                }

                this.isPlaying = true;
                this.updatePlayButton();

                // Отправляем событие для трекинга прослушивания
                window.dispatchEvent(new Event('trackPlaying'));
            });
            audio.addEventListener('pause', () => {
                this.isPlaying = false;
                this.updatePlayButton();
            });
            audio.addEventListener('error', (e) => this.handleMediaError(e, 'audio'));
            audio.addEventListener('volumechange', () => this.updateVolumeDisplay());
            
            // Переподключаем Web Audio при загрузке нового трека
            audio.addEventListener('loadstart', () => {
                if (this.audioContext && !this.audioSource) {
                    this.connectAudioChain();
                }
            });
        }
        
        const video = this.container?.querySelector('video');
        if (video) {
            video.addEventListener('timeupdate', () => this.updateProgress());
            video.addEventListener('ended', () => this.onTrackEnded());
            video.addEventListener('loadedmetadata', () => this.updateDuration());
            video.addEventListener('play', () => {
                this.isPlaying = true;
                this.updatePlayButton();

                // Отправляем событие для трекинга прослушивания
                window.dispatchEvent(new Event('trackPlaying'));
            });
            video.addEventListener('pause', () => {
                this.isPlaying = false;
                this.updatePlayButton();
            });
            video.addEventListener('error', (e) => this.handleMediaError(e, 'video'));
        }
    }
    
    setupVolumeControl() {
        const volumeIcon = this.container?.querySelector('.volume-icon');
        const volumeSlider = this.container?.querySelector('.volume-slider');
        
        if (volumeSlider) {
            volumeSlider.value = this.volume * 100;
            volumeSlider.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value) / 100;
                this.setVolume(value);
            });
        }
        
        if (volumeIcon) {
            volumeIcon.addEventListener('click', () => this.toggleMute());
        }
        
        this.updateVolumeDisplay();
    }
    
    setVolume(value) {
        this.volume = Math.max(0, Math.min(1, value));
        
        const audio = this.container?.querySelector('audio');
        const video = this.container?.querySelector('video');
        
        // Всегда устанавливаем громкость для HTML5 элементов
        if (audio) audio.volume = this.volume;
        if (video) video.volume = this.volume;
        
        // Web Audio API gain (если доступен)
        if (this.gainNode) {
            try {
                this.gainNode.gain.value = this.volume;
            } catch (e) {
                console.warn('⚠️ Could not set gain value:', e);
            }
        }
        
        this.isMuted = this.volume === 0;
        this.updateVolumeDisplay();
        this.saveVolume();
    }
    
    toggleMute() {
        if (this.isMuted) {
            this.setVolume(this.previousVolume || 0.8);
            this.isMuted = false;
        } else {
            this.previousVolume = this.volume;
            this.setVolume(0);
            this.isMuted = true;
        }
    }
    
    updateVolumeDisplay() {
        const volumeIcon = this.container?.querySelector('.volume-icon');
        const volumeSlider = this.container?.querySelector('.volume-slider');
        const volumePercentage = this.container?.querySelector('.volume-percentage');
        
        if (volumeIcon) {
            if (this.volume === 0 || this.isMuted) {
                volumeIcon.textContent = '🔇';
            } else if (this.volume < 0.3) {
                volumeIcon.textContent = '🔈';
            } else if (this.volume < 0.7) {
                volumeIcon.textContent = '🔉';
            } else {
                volumeIcon.textContent = '🔊';
            }
        }
        
        if (volumeSlider) {
            volumeSlider.value = this.volume * 100;
        }
        
        if (volumePercentage) {
            volumePercentage.textContent = Math.round(this.volume * 100) + '%';
        }
    }
    
    saveVolume() {
        try {
            localStorage.setItem('epicPlayerVolume', this.volume.toString());
        } catch (e) {
            console.warn('⚠️ Could not save volume');
        }
    }
    
    restoreVolume() {
        try {
            const savedVolume = localStorage.getItem('epicPlayerVolume');
            if (savedVolume !== null) {
                this.setVolume(parseFloat(savedVolume));
            } else {
                this.setVolume(this.volume);
            }
        } catch (e) {
            console.warn('⚠️ Could not restore volume');
            this.setVolume(this.volume);
        }
    }
    
    handleMediaError(event, mediaType) {
        const media = event.target;
        let errorMessage = '';
        
        if (media.error) {
            switch (media.error.code) {
                case media.error.MEDIA_ERR_ABORTED:
                    errorMessage = 'Загрузка прервана';
                    break;
                case media.error.MEDIA_ERR_NETWORK:
                    errorMessage = 'Ошибка сети';
                    break;
                case media.error.MEDIA_ERR_DECODE:
                    errorMessage = 'Ошибка декодирования';
                    break;
                case media.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    errorMessage = 'Формат не поддерживается';
                    break;
                default:
                    errorMessage = 'Неизвестная ошибка';
            }
        }
        
        console.error(`❌ ${mediaType} error:`, errorMessage, media.src);
        this.showError(`Ошибка загрузки ${mediaType === 'video' ? 'видео' : 'аудио'}: ${errorMessage}`);
    }
    
    showError(message) {
        const oldError = this.container?.querySelector('.player-error');
        if (oldError) oldError.remove();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'player-error';
        errorDiv.textContent = message;
        
        const infoSection = this.container?.querySelector('.player-info');
        if (infoSection) {
            infoSection.after(errorDiv);
            setTimeout(() => errorDiv.remove(), 5000);
        }
    }
    
    loadAlbumFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const albumId = urlParams.get('id');
        
        if (this.queue.length > 0) {
            console.log('🔄 Queue already loaded');
            return;
        }

        if (albumId) {
            console.log('📀 Loading album:', albumId);
            this.loadPlaylist(parseInt(albumId));
        }
    }
    
    async loadPlaylist(albumId) {
        try {
            const url = `/api/player/queue.php?album_id=${albumId}`;
            const response = await fetch(url);
            
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            
            if (!data.success) throw new Error(data.error || 'Unknown error');
            if (!data.tracks || data.tracks.length === 0) {
                console.warn('⚠️ No tracks found');
                this.showError('В этом альбоме нет треков');
                return;
            }
            
            this.queue = data.tracks;
            this.currentIndex = 0;
            
            console.log(`✅ Loaded ${this.queue.length} tracks`);
            this.renderQueue();
            this.loadTrack(0);
            
        } catch (error) {
            console.error('❌ Error loading playlist:', error);
            this.showError('Не удалось загрузить плейлист');
        }
    }
    
    loadTrack(index) {
        if (index < 0 || index >= this.queue.length) return;

        this.currentIndex = index;
        const track = this.queue[index];

        console.log(`🎵 Loading track: ${track.title}`);

        this.updateTrackInfo(track);

        if (this.currentMode === 'video' && track.videoPath) {
            this.loadVideo(track);
        } else {
            this.loadAudio(track);
        }

        this.loadLyrics(track.id);
        this.updateQueueHighlight();
        this.updateAlbumTrackHighlight(track.id);

        // Отправляем событие для TrackStatsManager
        window.dispatchEvent(new CustomEvent('trackChanged', {
            detail: { trackId: track.id, track: track }
        }));
    }
    
    loadAudio(track) {
        const audio = this.container?.querySelector('audio');
        if (!audio || !track.fullAudioPath) return;
        
        const path = this.normalizePath(track.fullAudioPath);
        console.log('🔊 Loading audio:', path);
        
        // Устанавливаем src и громкость
        audio.src = path;
        audio.volume = this.volume;
        
        // Инициализируем Audio Context при первой загрузке
        if (!this.audioContext) {
            this.initAudioContext();
        }
        
        // Переподключаем Web Audio при смене трека (если доступен)
        if (this.audioContext && !this.audioSource) {
            audio.addEventListener('loadedmetadata', () => {
                this.connectAudioChain();
            }, { once: true });
        }
    }
    
    loadVideo(track) {
        const video = this.container?.querySelector('video');
        if (!video || !track.videoPath) {
            console.warn('⚠️ No video available');
            this.loadAudio(track);
            return;
        }
        
        const path = this.normalizePath(track.videoPath);
        console.log('🎬 Loading video:', path);
        video.src = path;
        video.volume = this.volume;
    }
    
    async loadLyrics(trackId) {
        try {
            const response = await fetch(`/api/player/lyrics.php?track_id=${trackId}`);
            const data = await response.json();
            
            const lyricsText = this.container?.querySelector('.lyrics-text');
            if (!lyricsText) return;
            
            if (data.lyrics && data.lyrics.trim()) {
                lyricsText.textContent = data.lyrics;
            } else {
                lyricsText.innerHTML = '<div class="no-lyrics">🎵 Текст не добавлен</div>';
            }
        } catch (e) {
            console.warn('⚠️ Could not load lyrics');
        }
    }
    
    updateTrackInfo(track) {
        const title = this.container?.querySelector('.track-title');
        const artist = this.container?.querySelector('.track-artist');
        const album = this.container?.querySelector('.track-album');
        
        if (title) title.textContent = track.title || 'Unknown';
        if (artist) artist.textContent = 'Master of Illusion';
        if (album) album.textContent = track.albumTitle || 'Album';
        
        const cover = this.container?.querySelector('.player-cover img');
        if (cover && track.coverImagePath) {
            cover.src = this.normalizePath(track.coverImagePath);
            cover.onerror = () => {
                cover.src = '/assets/images/placeholder.png';
            };
        }
    }
    
    renderQueue() {
        const queueList = this.container?.querySelector('.queue-list');
        if (!queueList) return;

        queueList.innerHTML = this.queue.map((track, index) => `
            <li class="queue-item" data-index="${index}" data-track-id="${this.escapeHtml(track.id)}">
                <span class="queue-number">${index + 1}</span>
                <div class="queue-info">
                    <div class="queue-track-name">${this.escapeHtml(track.title)}</div>
                    <div class="queue-track-album">${this.escapeHtml(track.albumTitle || '')}</div>
                    <div class="queue-track-stats">
                        <span class="queue-stat" title="Лайки">👍 ${this.formatStatNumber(track.likes || 0)}</span>
                        <span class="queue-stat" title="Просмотры">👁️ ${this.formatStatNumber(track.views || 0)}</span>
                    </div>
                </div>
                <span class="queue-duration">${this.formatTime(track.duration || 0)}</span>
            </li>
        `).join('');

        queueList.querySelectorAll('.queue-item').forEach((item, index) => {
            item.addEventListener('click', () => this.playTrack(index));
        });
    }

    formatStatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
    
    updateQueueHighlight() {
        const items = this.container?.querySelectorAll('.queue-item');
        if (items) {
            items.forEach((item, index) => {
                item.classList.toggle('active', index === this.currentIndex);
            });
        }
    }

    updateAlbumTrackHighlight(currentTrackId) {
        const targetId = String(currentTrackId); 
        
        document.querySelectorAll('.track-playable').forEach(item => {
            const trackId = item.dataset.trackId;
            item.classList.toggle('is-playing', trackId === targetId);
        });
    }
    
    togglePlay() {
        const media = this.getCurrentMedia();
        if (!media) return;
        
        if (this.isPlaying) {
            media.pause();
        } else {
            media.play().catch(err => {
                console.error('❌ Play error:', err);
                this.showError('Не удалось воспроизвести медиа');
            });
        }
    }
    
    playTrack(index) {
        this.loadTrack(index);
        const media = this.getCurrentMedia();
        if (media) {
            media.play().catch(err => {
                console.error('❌ Play error:', err);
                this.showError('Не удалось воспроизвести трек');
            });
        }
    }

    setTrackAndPlay(newTrackData) {
        const existingIndex = this.queue.findIndex(t => t.id == newTrackData.id);

        if (existingIndex !== -1) {
            this.playTrack(existingIndex);
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const albumId = urlParams.get('id');

        if (albumId) {
            this.loadPlaylist(parseInt(albumId)).then(() => {
                 const loadedIndex = this.queue.findIndex(t => t.id == newTrackData.id);
                 if(loadedIndex !== -1) {
                    this.playTrack(loadedIndex);
                 }
            });
        } else {
            const trackForQueue = {
                id: newTrackData.id,
                fullAudioPath: newTrackData.fullAudioPath,
                title: newTrackData.title,
                coverImagePath: newTrackData.coverImagePath,
                albumTitle: newTrackData.albumTitle || 'Single',
            };
            this.queue = [trackForQueue];
            this.renderQueue();
            this.playTrack(0);
        }
    }
    
    nextTrack() {
        if (this.queue.length === 0) return;
        
        if (this.repeatMode === 'one') {
            this.loadTrack(this.currentIndex);
        } else if (this.isShuffle) {
            this.currentIndex = Math.floor(Math.random() * this.queue.length);
            this.loadTrack(this.currentIndex);
        } else {
            this.currentIndex++;
            if (this.currentIndex >= this.queue.length) {
                this.currentIndex = this.repeatMode === 'all' ? 0 : this.queue.length - 1;
            }
            this.loadTrack(this.currentIndex);
        }
        
        const media = this.getCurrentMedia();
        if (media) media.play().catch(err => console.error('❌ Play error:', err));
    }
    
    prevTrack() {
        if (this.queue.length === 0) return;
        
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.queue.length - 1;
        }
        
        this.loadTrack(this.currentIndex);
        const media = this.getCurrentMedia();
        if (media) media.play().catch(err => console.error('❌ Play error:', err));
    }
    
    toggleRepeat() {
        const modes = ['none', 'all', 'one'];
        const idx = modes.indexOf(this.repeatMode);
        this.repeatMode = modes[(idx + 1) % modes.length];
        
        const btn = this.container?.querySelector('[data-action="repeat"]');
        if (btn) {
            const icons = { none: '🔁', all: '🔁', one: '🔂' };
            btn.textContent = icons[this.repeatMode];
            btn.classList.toggle('active', this.repeatMode !== 'none');
        }
    }
    
    toggleShuffle() {
        this.isShuffle = !this.isShuffle;
        
        const btn = this.container?.querySelector('[data-action="shuffle"]');
        if (btn) {
            btn.classList.toggle('active', this.isShuffle);
        }
    }
    
    switchMode(mode) {
        this.currentMode = mode;
        
        const display = this.container?.querySelector('.player-display');
        const queue = this.container?.querySelector('.queue-container');
        const lyrics = this.container?.querySelector('.lyrics-container');
        const equalizer = this.container?.querySelector('.equalizer-container');
        const video = this.container?.querySelector('video');
        const audio = this.container?.querySelector('audio');
        const cover = this.container?.querySelector('.player-cover');
        
        if (display) display.style.display = 'none';
        if (queue) queue.style.display = 'none';
        if (lyrics) lyrics.style.display = 'none';
        if (equalizer) equalizer.style.display = 'none';
        
        const buttons = this.container?.querySelectorAll('.mode-btn');
        if (buttons) {
            buttons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.mode === mode);
            });
        }
        
        const track = this.queue[this.currentIndex];
        
        switch(mode) {
            case 'audio':
                if (display) display.style.display = 'block';
                if (cover) cover.style.display = 'block';
                if (video) video.style.display = 'none';
                if (audio) audio.style.display = 'block';
                if (track) this.loadAudio(track);
                break;
                
            case 'video':
                if (display) display.style.display = 'block';
                if (cover) cover.style.display = 'none';
                if (video) video.style.display = 'block';
                if (audio) audio.style.display = 'none';
                
                if (track?.videoPath) {
                    this.loadVideo(track);
                } else {
                    this.showError('Видео не доступно');
                    this.switchMode('audio');
                }
                break;
                
            case 'queue':
                if (queue) queue.style.display = 'block';
                break;
                
            case 'lyrics':
                if (lyrics) lyrics.style.display = 'block';
                break;
                
            case 'equalizer':
                if (equalizer) equalizer.style.display = 'block';
                break;
        }
    }
    
    seekTo(e) {
        const progressBar = this.container?.querySelector('.progress-bar');
        const media = this.getCurrentMedia();

        if (!progressBar || !media) return;

        const rect = progressBar.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));

        if (isFinite(media.duration) && media.duration > 0) {
            media.currentTime = percent * media.duration;
        } else if (media.buffered.length > 0) {
            // Если duration=Infinity (стриминг/неправильный WAV-заголовок)
            // — перематываем внутри буферизованного диапазона
            const bufferedEnd = media.buffered.end(media.buffered.length - 1);
            media.currentTime = percent * bufferedEnd;
        }
    }
    
    updateProgress() {
        const media = this.getCurrentMedia();
        if (!media) return;

        const duration = isFinite(media.duration) ? media.duration : 0;
        const percent = duration ? (media.currentTime / duration) * 100 : 0;
        const fill = this.container?.querySelector('.progress-fill');
        const times = this.container?.querySelectorAll('.time');

        if (fill) fill.style.width = percent + '%';
        if (times?.[0]) times[0].textContent = this.formatTime(media.currentTime);
        if (times?.[1]) times[1].textContent = duration ? this.formatTime(duration) : '0:00';
    }
    
    updateDuration() {
        const media = this.getCurrentMedia();
        if (!media || !media.duration) return;
        
        const duration = Math.floor(media.duration);
        if (this.queue[this.currentIndex]) {
            this.queue[this.currentIndex].duration = duration;
        }
    }
    
    updatePlayButton() {
        const btn = this.container?.querySelector('.play-btn');
        if (btn) {
            btn.textContent = this.isPlaying ? '⏸' : '▶';
        }
    }
    
    onTrackEnded() {
        this.nextTrack();
    }
    
    getCurrentMedia() {
        if (this.currentMode === 'video') {
            return this.container?.querySelector('video');
        }
        return this.container?.querySelector('audio');
    }
    
    normalizePath(path) {
        if (!path) return '';
        let normalized = path.replace(/\/+/g, '/');
        if (!normalized.startsWith('/')) {
            normalized = '/' + normalized;
        }
        return normalized;
    }
    
    formatTime(seconds) {
        if (!seconds || isNaN(seconds) || !isFinite(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    escapeHtml(text) {
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
        return String(text || '').replace(/[&<>"']/g, m => map[m]);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('epic-player')) {
        window.epicPlayer = new EpicPlayer('epic-player');
        console.log('✅ Epic Player v4.4 with Equalizer Ready!');
    }
    
    document.querySelectorAll('.track-playable').forEach(item => {
        item.addEventListener('click', (event) => {
            if (event.target.closest('a')) return;
            
            const trackId = item.dataset.trackId;
            const trackUrl = item.dataset.trackUrl;
            const trackTitle = item.dataset.trackTitle;
            const trackCover = item.dataset.trackCover;
            
            if (trackId && trackUrl && window.epicPlayer) {
                const trackData = {
                    id: trackId,
                    fullAudioPath: trackUrl,
                    title: trackTitle,
                    coverImagePath: trackCover,
                    albumTitle: item.dataset.trackAlbum || 'Master of Illusion',
                    views: parseInt(item.dataset.trackViews || '0', 10)
                };

                window.epicPlayer.setTrackAndPlay(trackData);
            }
        });
    });
});