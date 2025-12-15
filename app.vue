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
    { property: 'og:title', content: 'HelloBot' },
    { property: 'og:description', content: 'Your personal greeting bot for Discord and chat servers' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://hellobot.blackeyestudio.de' },
  ]
});
</script>
