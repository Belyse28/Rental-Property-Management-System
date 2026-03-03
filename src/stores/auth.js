import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref(null)
  const users = ref([
    { id: 1, username: 'Belyse', password: 'admin123', role: 'admin', name: 'Belyse Umwali' },
    { id: 2, username: 'Ines', password: 'ines123', role: 'landlord', name: 'Ines Ihirwe' },
    { id: 3, username: 'landlord2', password: 'land123', role: 'landlord', name: 'Jane Owner' },
    { id: 4, username: 'Teana1', password: 'teana123', role: 'tenant', name: 'Or Teana', email: 'alice@email.com', contact: '1234567890' }
  ])

  const isAuthenticated = computed(() => !!currentUser.value)

  function login(username, password) {
    const user = users.value.find(u => u.username === username && u.password === password)
    if (!user) throw new Error('Invalid credentials')
    currentUser.value = user
    return user
  }

  function logout() {
    currentUser.value = null
  }

  function register(userData) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userData.email)) throw new Error('Invalid email format')
    if (!/^\d{10,15}$/.test(userData.contact)) throw new Error('Contact must be 10-15 digits')
    if (users.value.find(u => u.username === userData.username)) throw new Error('Username already exists')
    
    const id = Math.max(...users.value.map(u => u.id), 0) + 1
    const newUser = { id, ...userData, role: 'tenant' }
    users.value.push(newUser)
    return newUser
  }

  return { currentUser, users, isAuthenticated, login, logout, register }
})
