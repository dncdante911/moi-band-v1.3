/**
 * SIMPLE AMBILIGHT v3.0 — теперь реально реагирует на музыку
 *
 * Раньше здесь был requestAnimationFrame-цикл, крутящийся вечно и не
 * делающий вообще ничего ("без анализа басов" — бас-анализ когда-то
 * вырезали, а цикл забыли остановить). Плавная пульсация фона на самом
 * деле целиком реализована в CSS (@keyframes в visualizer.css) и от
 * этого JS-цикла никак не зависела — это была чистая трата кадров.
 *
 * v3.0 использует уже существующий AnalyserNode из Web Audio API
 * (window.epicPlayer.analyser, тот же узел, что и у эквалайзера) чтобы
 * по-настоящему подсвечивать фон в такт басам трека. Работает только
 * пока трек реально играет (стартует/останавливается по событиям
 * трека, а не вечный цикл), и обновляет DOM не чаще ~15 раз в секунду —
 * для плавного свечения этого более чем достаточно, а нагрузка на
 * порядок меньше, чем частый цикл на 60 кадров/сек.
 */

class SimpleAmbilight {
    constructor(player) {
        this.player = player;
        this.currentGenre = 'flat';

        this._rafId = null;
        this._frameSkip = 0;
        this._freqData = null;

        this.init();
    }

    init() {
        document.body.classList.add('visualizer-active');

        window.addEventListener('trackPlaying', () => this.start());
        window.addEventListener('trackPaused', () => this.stop());
        window.addEventListener('trackEnded', () => this.stop());

        if (this.player?.isPlaying) this.start();

        console.log('🎨 Simple Ambilight v3.0 — bass-reactive Ready!');
    }

    start() {
        if (this._rafId !== null) return; // уже крутится
        this._tick();
    }

    stop() {
        if (this._rafId !== null) {
            cancelAnimationFrame(this._rafId);
            this._rafId = null;
        }
        // Плавно гасим подсветку вместо резкого скачка в 0
        document.documentElement.style.setProperty('--bass-level', '0');
    }

    _tick() {
        this._rafId = requestAnimationFrame(() => this._tick());

        // Обновляем DOM не на каждый кадр — глазу достаточно ~15 раз/сек
        // для плавного восприятия, а нагрузка на рендер в разы меньше.
        this._frameSkip = (this._frameSkip + 1) % 4;
        if (this._frameSkip !== 0) return;

        const analyser = this.player?.analyser;
        if (!analyser) return; // Web Audio ещё не инициализирован

        if (!this._freqData || this._freqData.length !== analyser.frequencyBinCount) {
            this._freqData = new Uint8Array(analyser.frequencyBinCount);
        }
        analyser.getByteFrequencyData(this._freqData);

        // Басы — примерно первые 12% частотных бинов
        const bassEnd = Math.max(1, Math.floor(this._freqData.length * 0.12));
        const bass = this.getAverage(this._freqData, 0, bassEnd) / 255; // 0..1

        document.documentElement.style.setProperty('--bass-level', bass.toFixed(3));
    }

    updateGenre(genre) {
        const genres = ['power-metal', 'heavy-metal', 'rock', 'punk-rock', 'gothic', 'symphonic', 'flat'];
        genres.forEach(g => document.body.classList.remove('genre-' + g));

        document.body.classList.add('genre-' + genre);
        this.currentGenre = genre;

        console.log('🎨 Background color:', genre);
    }

    getAverage(array, start, end) {
        let sum = 0;
        let count = 0;

        for (let i = start; i < end && i < array.length; i++) {
            sum += array[i];
            count++;
        }

        return count > 0 ? sum / count : 0;
    }
}

// Инициализация после загрузки плеера
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.epicPlayer) {
            window.simpleAmbilight = new SimpleAmbilight(window.epicPlayer);

            // Обновляем цвет при смене пресета эквалайзера
            const originalApplyEQ = window.epicPlayer.applyEQPreset.bind(window.epicPlayer);
            window.epicPlayer.applyEQPreset = function(preset) {
                originalApplyEQ(preset);
                if (window.simpleAmbilight) {
                    window.simpleAmbilight.updateGenre(preset);
                }
            };

            console.log('✅ Simple Ambilight Active!');
        }
    }, 1000);
});
