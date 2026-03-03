import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'

export const usePaymentStore = defineStore('payment', () => {
  const payments = ref([
    { id: 1, tenantId: 1, propertyId: 2, amount: 200000, date: '2024-01-15', landlordId: 2 }
  ])

  const getPayments = computed(() => {
    const authStore = useAuthStore()
    if (!authStore.currentUser) return []
    if (authStore.currentUser.role === 'admin') return payments.value
    return payments.value.filter(p => p.landlordId === authStore.currentUser.id)
  })

  function addPayment(payment) {
    if (!payment.amount || payment.amount <= 0) throw new Error('Amount must be greater than zero')
    if (!payment.date) throw new Error('Date is required')
    
    const id = Math.max(...payments.value.map(p => p.id), 0) + 1
    const newPayment = { id, ...payment }
    payments.value.push(newPayment)
    return newPayment
  }

  function updatePayment(id, updates) {
    const index = payments.value.findIndex(p => p.id === id)
    if (index === -1) throw new Error('Payment not found')
    payments.value[index] = { ...payments.value[index], ...updates }
    return payments.value[index]
  }

  function deletePayment(id) {
    const index = payments.value.findIndex(p => p.id === id)
    if (index === -1) throw new Error('Payment not found')
    payments.value.splice(index, 1)
  }

  return { payments, getPayments, addPayment, updatePayment, deletePayment }
})
