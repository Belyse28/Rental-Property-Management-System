import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'
import { usePropertyStore } from './property'

export const useTenantStore = defineStore('tenant', () => {
  const tenants = ref([
    { id: 1, name: 'Alice Smith', email: 'alice@email.com', contact: '1234567890', propertyId: 2, landlordId: 2 }
  ])

  const getTenants = computed(() => {
    const authStore = useAuthStore()
    if (!authStore.currentUser) return []
    if (authStore.currentUser.role === 'admin') return tenants.value
    return tenants.value.filter(t => t.landlordId === authStore.currentUser.id)
  })

  function addTenant(tenant) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(tenant.email)) throw new Error('Invalid email format')
    if (!/^\d{10,15}$/.test(tenant.contact)) throw new Error('Contact must be 10-15 digits')
    
    const propertyStore = usePropertyStore()
    const property = propertyStore.properties.find(p => p.id === tenant.propertyId)
    if (property && property.status === 'Occupied') {
      throw new Error('Property is already occupied')
    }
    
    const id = Math.max(...tenants.value.map(t => t.id), 0) + 1
    const newTenant = { id, ...tenant }
    tenants.value.push(newTenant)
    
    if (property) property.status = 'Occupied'
    
    return newTenant
  }

  function updateTenant(id, updates) {
    const index = tenants.value.findIndex(t => t.id === id)
    if (index === -1) throw new Error('Tenant not found')
    tenants.value[index] = { ...tenants.value[index], ...updates }
    return tenants.value[index]
  }

  function deleteTenant(id) {
    const tenant = tenants.value.find(t => t.id === id)
    if (!tenant) throw new Error('Tenant not found')
    
    const propertyStore = usePropertyStore()
    const property = propertyStore.properties.find(p => p.id === tenant.propertyId)
    if (property) property.status = 'Available'
    
    const index = tenants.value.indexOf(tenant)
    tenants.value.splice(index, 1)
  }

  return { tenants, getTenants, addTenant, updateTenant, deleteTenant }
})
