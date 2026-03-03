<template>
  <Teleport to="body">
    <div v-if="visible" :class="['alert-overlay', type]" @click="close">
      <div class="alert-box" @click.stop>
        <div class="alert-icon">{{ icon }}</div>
        <div class="alert-message">{{ message }}</div>
        <button @click="close" class="alert-btn">OK</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'

const visible = ref(false)
const message = ref('')
const type = ref('info')

const icon = computed(() => {
  switch(type.value) {
    case 'success': return '✓'
    case 'error': return '✕'
    case 'warning': return '⚠'
    default: return 'ℹ'
  }
})

const show = (msg, alertType = 'info') => {
  message.value = msg
  type.value = alertType
  visible.value = true
}

const close = () => {
  visible.value = false
}

defineExpose({ show })
</script>

<style scoped>
.alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.alert-box {
  background: white;
  padding: 30px;
  border-radius: 8px;
  min-width: 300px;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.alert-icon {
  font-size: 48px;
  margin-bottom: 15px;
}

.success .alert-icon { color: #4caf50; }
.error .alert-icon { color: #f44336; }
.warning .alert-icon { color: #ff9800; }
.info .alert-icon { color: #2196f3; }

.alert-message {
  font-size: 16px;
  margin-bottom: 20px;
  color: #333;
}

.alert-btn {
  background: #2196f3;
  color: white;
  border: none;
  padding: 10px 30px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.alert-btn:hover {
  background: #1976d2;
}
</style>
