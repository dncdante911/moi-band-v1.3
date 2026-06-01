<template>
  <div>
    <div class="about-banner">
      <div class="banner-overlay"></div>
      <div class="banner-glow banner-glow-1"></div>
      <div class="banner-glow banner-glow-2"></div>
      <div class="banner-content">
        <h1 class="banner-title">🎸 Master of Illusion</h1>
        <p class="banner-subtitle">Музыкальный проект, рождённый в пламени AI</p>
      </div>
    </div>

    <div class="container page-content about-page">
      <section class="intro-section">
        <div class="intro-content">
          <h2 class="section-title">✨ О проекте</h2>
          <p class="intro-text">
            <strong>Master of Illusion</strong> — это музыкальный проект, рождённый в пламени нейросети,
            где холодный код встречается с неукротимым духом рока. Это доказательство того, что даже в
            алгоритмах может жить душа настоящего метала.
          </p>
          <p class="intro-text">
            Всё началось как эксперимент в мире AI-музыки <strong>Suno</strong>, но быстро переросло в нечто
            большее. Каждая композиция создаётся с использованием современных технологий, а тексты пишутся
            вручную, вкладывая в них эмоции и историю.
          </p>
        </div>
        <div class="stats-grid">
          <div class="stat-card" v-for="s in stats" :key="s.label">
            <div class="stat-number">{{ s.number }}</div>
            <div class="stat-label">{{ s.label }}</div>
          </div>
        </div>
      </section>

      <section class="genres-section">
        <h2 class="section-title">🎸 Жанры</h2>
        <div class="genres-grid">
          <div v-for="g in genres" :key="g.title" class="genre-card">
            <div class="genre-icon">{{ g.icon }}</div>
            <h3 class="genre-title">{{ g.title }}</h3>
            <p class="genre-description">{{ g.description }}</p>
            <div class="genre-influences">
              <h4>Влияния:</h4>
              <ul>
                <li v-for="inf in g.influences" :key="inf">{{ inf }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="tech-section">
        <h2 class="section-title">🤖 Технологии</h2>
        <div class="tech-grid">
          <div v-for="t in techStack" :key="t.name" class="tech-card">
            <div class="tech-icon">{{ t.icon }}</div>
            <h3>{{ t.name }}</h3>
            <p>{{ t.description }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const stats = [
  { number: '9', label: 'Альбомов' },
  { number: '100+', label: 'Треков' },
  { number: '4', label: 'Жанра' },
  { number: '∞', label: 'Эпичности' },
]

const genres = [
  {
    icon: '⚔️', title: 'Power Metal',
    description: 'Эпические сражения, легенды и триумф. Быстрые гитары, мощные хоры и симфонические аранжировки.',
    influences: ['Helloween', 'Blind Guardian', 'Epidemia', 'Sabaton'],
  },
  {
    icon: '🦇', title: 'Gothic Metal',
    description: 'Тьма, меланхолия и красота. Тяжёлые риффы сочетаются с атмосферными клавишными.',
    influences: ['Paradise Lost', 'Type O Negative', 'Lacuna Coil'],
  },
  {
    icon: '📚', title: 'Literary Dark',
    description: 'Музыкальная литература. Тексты, вдохновлённые великими произведениями и историческими событиями.',
    influences: ['Пушкин', 'Толстой', 'Булгаков'],
  },
  {
    icon: '🤘', title: 'Punk Rock',
    description: 'Сырая энергия, бунт и свобода. Простые риффы, быстрый темп, мощный посыл.',
    influences: ['Sex Pistols', 'The Clash', 'Ramones'],
  },
]

const techStack = [
  { icon: '🤖', name: 'SUNO AI', description: 'Основной инструмент создания музыки — нейросеть SUNO генерирует аудио по текстовым промптам.' },
  { icon: '✍️', name: 'Авторские тексты', description: 'Все тексты написаны вручную на русском языке с глубоким смысловым наполнением.' },
  { icon: '🎚️', name: 'Web Audio API', description: 'Эквалайзер и визуализатор на основе Web Audio API для качественного звука.' },
  { icon: '💻', name: 'Vue 3 + Vite', description: 'Современный фронтенд на Vue 3 с быстрой сборкой через Vite.' },
]
</script>
