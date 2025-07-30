import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isAuthenticated = ref(false)

const HARDCODED_USER = 'user'
const HARDCODED_PASS = 'password123'

export function useAuth() {
  const login = (username, password) => {
    if (username === HARDCODED_USER && password === HARDCODED_PASS) {
      isAuthenticated.value = true
      return true
    }
    isAuthenticated.value = false
    return false
  }

  const logout = () => {
    isAuthenticated.value = false
  }

  return { isAuthenticated, login, logout }
}
