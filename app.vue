<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    { name: 'description', content: 'HelloBot - Your personal greeting bot for Discord and chat servers. Manage custom greetings and schedule them by weekday.' },
    { name: 'author', content: 'BlackEye Studio' },
    
    // PWA & Mobile
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'theme-color', content: '#1E4545' },
    
    // iOS Specific
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'apple-mobile-web-app-title', content: 'HelloBot' },
    
    // Open Graph
    { property: 'og:title', content: 'HelloBot' },
    { property: 'og:description', content: 'Your personal greeting bot for Discord and chat servers' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://hellobot.blackeyestudio.de' },
    { property: 'og:image', content: 'https://hellobot.blackeyestudio.de/pwa-512x512.png' },
  ],
  link: [
    // iOS Icons
    { rel: 'apple-touch-icon', sizes: '192x192', href: '/pwa-192x192.png' },
    { rel: 'apple-touch-icon', sizes: '512x512', href: '/pwa-512x512.png' },
  ]
});
</script>
