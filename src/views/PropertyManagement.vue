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
        Add Property
      </button>
    </div>

    <div v-if="showForm" class="form-modal" @click="showForm = false">
      <div class="form-container" @click.stop>
        <h3>{{ editingId ? 'Edit' : 'Add' }} Property</h3>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Property Name *</label>
            <input v-model="form.name" required />
          </div>
          <div class="form-group">
            <label>Address *</label>
            <input v-model="form.address" required />
          </div>
          <div class="form-group">
            <label>Monthly Rent *</label>
            <input v-model.number="form.rent" type="number" required />
          </div>
          <div class="form-group">
            <label>Property Image URL</label>
            <input v-model="form.image" type="url" placeholder="https://example.com/image.jpg" />
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary">{{ editingId ? 'Update' : 'Add' }}</button>
            <button type="button" @click="showForm = false" class="btn-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showAssignForm" class="form-modal" @click="showAssignForm = false">
      <div class="form-container" @click.stop>
        <h3>Assign Tenant to {{ selectedProperty?.name }}</h3>
        <form @submit.prevent="handleAssignTenant">
          <div class="form-group">
            <label>Tenant Name *</label>
            <input v-model="tenantForm.name" required />
          </div>
          <div class="form-group">
            <label>Email *</label>
            <input v-model="tenantForm.email" type="email" required />
          </div>
          <div class="form-group">
            <label>Contact *</label>
            <input v-model="tenantForm.contact" required />
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary">Assign Tenant</button>
            <button type="button" @click="showAssignForm = false" class="btn-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Address</th>
          <th>Rent</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="property in properties" :key="property.id">
          <td>{{ property.id }}</td>
          <td>{{ property.name }}</td>
          <td>{{ property.address }}</td>
          <td>{{ property.rent }} RWF</td>
          <td><span :class="['status', property.status.toLowerCase()]">{{ property.status }}</span></td>
          <td>
            <button @click="editProperty(property)" class="btn-edit">Edit</button>
            <button @click="deleteProperty(property.id)" class="btn-delete">Delete</button>
            <button v-if="property.status === 'Available'" @click="assignTenant(property)" class="btn-assign">Assign Tenant</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePropertyStore } from '../stores/property'
import { useAuthStore } from '../stores/auth'

const emit = defineEmits(['alert', 'back'])

const propertyStore = usePropertyStore()
const authStore = useAuthStore()

const properties = computed(() => propertyStore.getProperties)
const showForm = ref(false)
const editingId = ref(null)
const form = ref({ name: '', address: '', rent: 0, image: '' })
const showAssignForm = ref(false)
const selectedProperty = ref(null)
const tenantForm = ref({ name: '', email: '', contact: '' })

const resetForm = () => {
  form.value = { name: '', address: '', rent: 0, image: '' }
}

const editProperty = (property) => {
  editingId.value = property.id
  form.value = { ...property }
  showForm.value = true
}

const handleSubmit = () => {
  try {
    const data = {
      ...form.value,
      ownerId: authStore.currentUser.id
    }
    
    if (editingId.value) {
      propertyStore.updateProperty(editingId.value, data)
      emit('alert', 'Property updated successfully', 'success')
    } else {
      propertyStore.addProperty(data)
      emit('alert', 'Property added successfully', 'success')
    }
    
    showForm.value = false
    resetForm()
  } catch (error) {
    emit('alert', error.message, 'error')
  }
}

const deleteProperty = (id) => {
  if (confirm('Are you sure you want to delete this property?')) {
    try {
      propertyStore.deleteProperty(id)
      emit('alert', 'Property deleted successfully', 'success')
    } catch (error) {
      emit('alert', error.message, 'error')
    }
  }
}

const assignTenant = (property) => {
  selectedProperty.value = property
  tenantForm.value = { name: '', email: '', contact: '' }
  showAssignForm.value = true
}

const handleAssignTenant = async () => {
  try {
    const { useTenantStore } = await import('../stores/tenant')
    const tenantStore = useTenantStore()
    
    const tenantData = {
      ...tenantForm.value,
      propertyId: selectedProperty.value.id,
      landlordId: authStore.currentUser.id
    }
    
    tenantStore.addTenant(tenantData)
    emit('alert', 'Tenant assigned successfully', 'success')
    showAssignForm.value = false
  } catch (error) {
    emit('alert', error.message, 'error')
  }
}
</script>

<style scoped>
@import './shared-styles.css';

.btn-add {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-add:hover {
  background: linear-gradient(135deg, #5568d3 0%, #63408a 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-edit {
  background: #3b82f6;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.btn-edit:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.btn-delete {
  background: #ef4444;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  margin-left: 8px;
}

.btn-delete:hover {
  background: #dc2626;
  transform: translateY(-1px);
}

.btn-assign {
  background: #10b981;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  margin-left: 8px;
}

.btn-assign:hover {
  background: #059669;
  transform: translateY(-1px);
}

.status {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status.available {
  background: #d1fae5;
  color: #065f46;
}

.status.occupied {
  background: #fee2e2;
  color: #991b1b;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #5568d3 0%, #63408a 100%);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-cancel {
  background: #6b7280;
  color: white;
}

.btn-cancel:hover {
  background: #4b5563;
}

table tbody tr:hover {
  background: #f9fafb;
  transform: scale(1.01);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
</style>
