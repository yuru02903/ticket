// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole'

export const useUserStore = defineStore('app', () => {
  const token = ref('')
  const account = ref('')
  const email = ref('')
  const nationalIdNumber = ref(0)
  const role = ref(UserRole.USER)

  const login = (data) => {
    if (data.token) {
      token.value = data.token
    }
    account.value = data.account
    email.value = data.email
    nationalIdNumber.value = data.nationalIdNumber
    role.value = data.role
  }

  const isLogin = computed(() => {
    return token.value.length > 0
  })

  const isAdmin = computed(() => {
    return role.value === UserRole.ADMIN
  })

  return {
    token,
    account,
    email,
    nationalIdNumber,
    role,
    login,
    isLogin,
    isAdmin
  }
})
