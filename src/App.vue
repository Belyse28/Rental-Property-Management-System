<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <component :is="Component" @alert="showAlert" />
    </router-view>
    <AlertDialog ref="alertDialog" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AlertDialog from './components/AlertDialog.vue'

const alertDialog = ref(null)

const showAlert = (message, type = 'info') => {
  alertDialog.value?.show(message, type)
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  width: 100%;
  min-height: 100vh;
}
</style>
