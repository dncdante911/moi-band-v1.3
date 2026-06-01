<template>
  <footer class="site-footer">
    <div class="container">
      <p>
        &copy; {{ year }} <strong>Master of Illusion</strong>. Музыка создана с помощью
        <a href="https://suno.com" target="_blank" rel="noopener">SUNO AI</a>.
      </p>
      <nav class="footer-nav">
        <RouterLink to="/about">О проекте</RouterLink>
        <RouterLink to="/news">Новости</RouterLink>
        <RouterLink to="/gallery">Галерея</RouterLink>
      </nav>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
