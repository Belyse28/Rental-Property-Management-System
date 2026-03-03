<template>
  <div class="management">
    <div class="page-header">
      <button @click="$emit('back')" class="btn-back" aria-label="Back to dashboard">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M12 4L6 10L12 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Back to Dashboard
      </button>
      <button @click="showForm = true; editingId = null; resetForm()" class="btn-add">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 4V16M4 10H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Add Landlord
      </button>
    </div>

    <div v-if="showForm" class="form-modal" @click="showForm = false">
      <div class="form-container" @click.stop>
        <h3>{{ editingId ? 'Edit' : 'Add' }} Landlord</h3>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Name *</label>
            <input v-model="form.name" required />
          </div>
          <div class="form-group">
            <label>Username *</label>
            <input v-model="form.username" required />
          </div>
          <div class="form-group">
            <label>Password *</label>
            <input v-model="form.password" type="password" required />
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary">{{ editingId ? 'Update' : 'Add' }}</button>
            <button type="button" @click="showForm = false" class="btn-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Username</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in landlords" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td><span class="role-badge">{{ user.role }}</span></td>
          <td>
            <button @click="editUser(user)" class="btn-edit">Edit</button>
            <button @click="deleteUser(user.id)" class="btn-delete">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'

const emit = defineEmits(['alert', 'back'])

const authStore = useAuthStore()

const landlords = computed(() => authStore.users.filter(u => u.role === 'landlord'))
const showForm = ref(false)
const editingId = ref(null)
const form = ref({ name: '', username: '', password: '' })

const resetForm = () => {
  form.value = { name: '', username: '', password: '' }
}

const editUser = (user) => {
  editingId.value = user.id
  form.value = { name: user.name, username: user.username, password: user.password }
  showForm.value = true
}

const handleSubmit = () => {
  try {
    if (editingId.value) {
      const index = authStore.users.findIndex(u => u.id === editingId.value)
      if (index !== -1) {
        authStore.users[index] = { ...authStore.users[index], ...form.value }
        emit('alert', 'Landlord updated successfully', 'success')
      }
    } else {
      const id = Math.max(...authStore.users.map(u => u.id), 0) + 1
      authStore.users.push({ id, ...form.value, role: 'landlord' })
      emit('alert', 'Landlord added successfully', 'success')
    }
    
    showForm.value = false
    resetForm()
  } catch (error) {
    emit('alert', error.message, 'error')
  }
}

const deleteUser = (id) => {
  if (confirm('Are you sure you want to delete this landlord? All their properties and tenants will remain.')) {
    try {
      const index = authStore.users.findIndex(u => u.id === id)
      if (index !== -1) {
        authStore.users.splice(index, 1)
        emit('alert', 'Landlord deleted successfully', 'success')
      }
    } catch (error) {
      emit('alert', error.message, 'error')
    }
  }
}
</script>

<style scoped>
@import './shared-styles.css';
</style>
