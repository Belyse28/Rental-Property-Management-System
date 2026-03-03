import { reactive } from 'vue'

// Mock data store
const state = reactive({
  currentUser: null,
  users: [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'System Admin' },
    { id: 2, username: 'landlord1', password: 'land123', role: 'landlord', name: 'John Landlord' },
    { id: 3, username: 'landlord2', password: 'land123', role: 'landlord', name: 'Jane Owner' }
  ],
  properties: [
    { id: 1, name: 'Sunset Villa', address: '123 Main St', rent: 1500, status: 'Available', ownerId: 2 },
    { id: 2, name: 'Ocean View Apt', address: '456 Beach Rd', rent: 2000, status: 'Occupied', ownerId: 2 },
    { id: 3, name: 'Downtown Loft', address: '789 City Ave', rent: 1800, status: 'Available', ownerId: 3 }
  ],
  tenants: [
    { id: 1, name: 'Alice Smith', email: 'alice@email.com', contact: '1234567890', propertyId: 2, landlordId: 2 }
  ],
  payments: [
    { id: 1, tenantId: 1, propertyId: 2, amount: 2000, date: '2024-01-15', landlordId: 2 }
  ]
})

// Validation Rules
export const validators = {
  // TECHNICAL VALIDATION RULES
  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regex.test(email)) throw new Error('Email must follow a valid format')
  },
  
  validateContact(contact) {
    if (!/^\d{10,15}$/.test(contact)) throw new Error('Contact must be numeric and 10-15 digits')
  },
  
  validateRequired(value, fieldName) {
    if (!value || value.toString().trim() === '') throw new Error(`${fieldName} is required`)
  },
  
  validateUniqueUsername(username, excludeId = null) {
    const exists = state.users.find(u => u.username === username && u.id !== excludeId)
    if (exists) throw new Error('Username already exists')
  },
  
  validateDate(date) {
    if (isNaN(Date.parse(date))) throw new Error('Invalid date format')
  },

  // BUSINESS VALIDATION RULES
  validatePropertyOwner(ownerId) {
    if (!ownerId) throw new Error('Property cannot be added without owner ID')
  },
  
  validateTenantAssignment(propertyId) {
    const property = state.properties.find(p => p.id === propertyId)
    if (property && property.status === 'Occupied') {
      throw new Error('Tenant cannot be assigned to an occupied property')
    }
  },
  
  validatePaymentAmount(amount) {
    if (!amount || parseFloat(amount) <= 0) throw new Error('Payment amount must be greater than zero')
  },
  
  validateLandlordAccess(resourceOwnerId, currentUserId) {
    if (state.currentUser.role === 'landlord' && resourceOwnerId !== currentUserId) {
      throw new Error('Landlord can only access their own records')
    }
  },
  
  updatePropertyStatus(propertyId, status) {
    const property = state.properties.find(p => p.id === propertyId)
    if (property) property.status = status
  }
}

export const store = {
  state,
  
  login(username, password) {
    const user = state.users.find(u => u.username === username && u.password === password)
    if (!user) throw new Error('Invalid credentials')
    state.currentUser = user
    return user
  },
  
  logout() {
    state.currentUser = null
  },
  
  // Property CRUD
  getProperties() {
    if (state.currentUser.role === 'admin') return state.properties
    return state.properties.filter(p => p.ownerId === state.currentUser.id)
  },
  
  addProperty(property) {
    validators.validateRequired(property.name, 'Property name')
    validators.validateRequired(property.address, 'Address')
    validators.validateRequired(property.rent, 'Rent')
    validators.validatePropertyOwner(property.ownerId)
    
    const id = Math.max(...state.properties.map(p => p.id), 0) + 1
    const newProperty = { id, ...property, status: 'Available' }
    state.properties.push(newProperty)
    return newProperty
  },
  
  updateProperty(id, updates) {
    const index = state.properties.findIndex(p => p.id === id)
    if (index === -1) throw new Error('Property not found')
    
    validators.validateLandlordAccess(state.properties[index].ownerId, state.currentUser.id)
    validators.validateRequired(updates.name, 'Property name')
    validators.validateRequired(updates.address, 'Address')
    
    state.properties[index] = { ...state.properties[index], ...updates }
    return state.properties[index]
  },
  
  deleteProperty(id) {
    const property = state.properties.find(p => p.id === id)
    if (!property) throw new Error('Property not found')
    
    validators.validateLandlordAccess(property.ownerId, state.currentUser.id)
    
    const index = state.properties.indexOf(property)
    state.properties.splice(index, 1)
  },
  
  // Tenant CRUD
  getTenants() {
    if (state.currentUser.role === 'admin') return state.tenants
    return state.tenants.filter(t => t.landlordId === state.currentUser.id)
  },
  
  addTenant(tenant) {
    validators.validateRequired(tenant.name, 'Tenant name')
    validators.validateEmail(tenant.email)
    validators.validateContact(tenant.contact)
    validators.validateTenantAssignment(tenant.propertyId)
    
    const id = Math.max(...state.tenants.map(t => t.id), 0) + 1
    const newTenant = { id, ...tenant }
    state.tenants.push(newTenant)
    
    // Update property status to Occupied
    validators.updatePropertyStatus(tenant.propertyId, 'Occupied')
    
    return newTenant
  },
  
  updateTenant(id, updates) {
    const index = state.tenants.findIndex(t => t.id === id)
    if (index === -1) throw new Error('Tenant not found')
    
    validators.validateLandlordAccess(state.tenants[index].landlordId, state.currentUser.id)
    validators.validateRequired(updates.name, 'Tenant name')
    validators.validateEmail(updates.email)
    validators.validateContact(updates.contact)
    
    state.tenants[index] = { ...state.tenants[index], ...updates }
    return state.tenants[index]
  },
  
  deleteTenant(id) {
    const tenant = state.tenants.find(t => t.id === id)
    if (!tenant) throw new Error('Tenant not found')
    
    validators.validateLandlordAccess(tenant.landlordId, state.currentUser.id)
    
    // Update property status to Available
    validators.updatePropertyStatus(tenant.propertyId, 'Available')
    
    const index = state.tenants.indexOf(tenant)
    state.tenants.splice(index, 1)
  },
  
  // Payment CRUD
  getPayments() {
    if (state.currentUser.role === 'admin') return state.payments
    return state.payments.filter(p => p.landlordId === state.currentUser.id)
  },
  
  addPayment(payment) {
    validators.validateRequired(payment.tenantId, 'Tenant')
    validators.validateRequired(payment.propertyId, 'Property')
    validators.validatePaymentAmount(payment.amount)
    validators.validateDate(payment.date)
    
    const id = Math.max(...state.payments.map(p => p.id), 0) + 1
    const newPayment = { id, ...payment }
    state.payments.push(newPayment)
    return newPayment
  },
  
  updatePayment(id, updates) {
    const index = state.payments.findIndex(p => p.id === id)
    if (index === -1) throw new Error('Payment not found')
    
    validators.validateLandlordAccess(state.payments[index].landlordId, state.currentUser.id)
    validators.validatePaymentAmount(updates.amount)
    validators.validateDate(updates.date)
    
    state.payments[index] = { ...state.payments[index], ...updates }
    return state.payments[index]
  },
  
  deletePayment(id) {
    const payment = state.payments.find(p => p.id === id)
    if (!payment) throw new Error('Payment not found')
    
    validators.validateLandlordAccess(payment.landlordId, state.currentUser.id)
    
    const index = state.payments.indexOf(payment)
    state.payments.splice(index, 1)
  },
  
  // User CRUD (Admin only)
  getLandlords() {
    return state.users.filter(u => u.role === 'landlord')
  },
  
  addUser(user) {
    if (state.currentUser.role !== 'admin') throw new Error('Only admin can add users')
    
    validators.validateRequired(user.name, 'Name')
    validators.validateRequired(user.username, 'Username')
    validators.validateRequired(user.password, 'Password')
    validators.validateUniqueUsername(user.username)
    
    const id = Math.max(...state.users.map(u => u.id), 0) + 1
    const newUser = { id, ...user, role: 'landlord' }
    state.users.push(newUser)
    return newUser
  },
  
  updateUser(id, updates) {
    if (state.currentUser.role !== 'admin') throw new Error('Only admin can update users')
    
    const index = state.users.findIndex(u => u.id === id)
    if (index === -1) throw new Error('User not found')
    if (state.users[index].role === 'admin') throw new Error('Cannot edit admin user')
    
    validators.validateRequired(updates.name, 'Name')
    validators.validateRequired(updates.username, 'Username')
    validators.validateUniqueUsername(updates.username, id)
    
    state.users[index] = { ...state.users[index], ...updates }
    return state.users[index]
  },
  
  deleteUser(id) {
    if (state.currentUser.role !== 'admin') throw new Error('Only admin can delete users')
    
    const user = state.users.find(u => u.id === id)
    if (!user) throw new Error('User not found')
    if (user.role === 'admin') throw new Error('Cannot delete admin user')
    
    const index = state.users.indexOf(user)
    state.users.splice(index, 1)
  }
}
