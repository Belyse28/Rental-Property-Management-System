import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'

export const usePropertyStore = defineStore('property', () => {
  const properties = ref([
    { id: 1, name: ' Villa', address: 'KK 634', rent: 400000, status: 'Available', ownerId: 2, image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400' },
    { id: 2, name: 'View Apt', address: 'KG 611', rent: 200000, status: 'Occupied', ownerId: 2, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400' },
    { id: 3, name: 'Makuza house', address: 'KK 124 Ave', rent: 300000, status: 'Available', ownerId: 3, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400' }
  ])

  const bookingRequests = ref([])

  const getProperties = computed(() => {
    const authStore = useAuthStore()
    if (!authStore.currentUser) return []
    if (authStore.currentUser.role === 'admin') return properties.value
    if (authStore.currentUser.role === 'tenant') return properties.value
    return properties.value.filter(p => p.ownerId === authStore.currentUser.id)
  })

  const getBookingRequests = computed(() => {
    const authStore = useAuthStore()
    if (!authStore.currentUser) return []
    if (authStore.currentUser.role === 'admin') return bookingRequests.value
    if (authStore.currentUser.role === 'tenant') {
      return bookingRequests.value.filter(r => r.tenantId === authStore.currentUser.id)
    }
    return bookingRequests.value.filter(r => {
      const property = properties.value.find(p => p.id === r.propertyId)
      return property && property.ownerId === authStore.currentUser.id
    })
  })

  function addProperty(property) {
    if (!property.name || !property.address || !property.rent) throw new Error('All fields required')
    const id = Math.max(...properties.value.map(p => p.id), 0) + 1
    const newProperty = { id, ...property, status: 'Available' }
    properties.value.push(newProperty)
    return newProperty
  }

  function updateProperty(id, updates) {
    const index = properties.value.findIndex(p => p.id === id)
    if (index === -1) throw new Error('Property not found')
    properties.value[index] = { ...properties.value[index], ...updates }
    return properties.value[index]
  }

  function deleteProperty(id) {
    const index = properties.value.findIndex(p => p.id === id)
    if (index === -1) throw new Error('Property not found')
    properties.value.splice(index, 1)
  }

  function createBookingRequest(propertyId, tenantId) {
    const property = properties.value.find(p => p.id === propertyId)
    if (!property) throw new Error('Property not found')
    if (property.status === 'Occupied') throw new Error('Property is already occupied')
    
    const id = Math.max(...bookingRequests.value.map(r => r.id), 0) + 1
    const request = {
      id,
      propertyId,
      tenantId,
      status: 'Pending',
      createdAt: new Date().toISOString()
    }
    bookingRequests.value.push(request)
    return request
  }

  function approveBookingRequest(requestId) {
    const request = bookingRequests.value.find(r => r.id === requestId)
    if (!request) throw new Error('Request not found')
    
    request.status = 'Approved'
    const property = properties.value.find(p => p.id === request.propertyId)
    if (property) property.status = 'Occupied'
    
    return request
  }

  function rejectBookingRequest(requestId) {
    const request = bookingRequests.value.find(r => r.id === requestId)
    if (!request) throw new Error('Request not found')
    request.status = 'Rejected'
    return request
  }

  return {
    properties,
    bookingRequests,
    getProperties,
    getBookingRequests,
    addProperty,
    updateProperty,
    deleteProperty,
    createBookingRequest,
    approveBookingRequest,
    rejectBookingRequest
  }
})
