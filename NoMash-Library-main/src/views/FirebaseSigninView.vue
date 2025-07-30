<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="text-center mb-4">Sign in</h1>
        <form @submit.prevent="signin">
          <div class="mb-3">
            <input type="text" class="form-control" placeholder="Email" v-model="email" required />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="password"
              required
            />
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="adminCheck" v-model="isAdmin" />
              <label class="form-check-label" for="adminCheck"> Login as Administrator </label>
            </div>
          </div>
          <div class="mb-3 text-center">
            <button type="submit" class="btn btn-primary">Sign in via Firebase</button>
          </div>
        </form>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <div v-if="success" class="alert alert-success">Login successful!</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import '../firebase/init.js'

const email = ref('')
const password = ref('')
const isAdmin = ref(false)
const error = ref('')
const success = ref(false)
const router = useRouter()
const auth = getAuth()

const signin = () => {
  error.value = ''
  success.value = false

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      // eslint-disable-line no-unused-vars
      console.log('User ID:', data.user.uid)
      console.log('User Email:', data.user.email)
      console.log('User Data:', data.user)
      console.log('Is Admin:', isAdmin.value)
      console.log('Firebase Login Successful!')

      if (isAdmin.value) {
        console.log('Admin login successful!')
      }

      success.value = true

      setTimeout(() => {
        router.push('/')
      }, 1500)
      console.log(auth.currentUser)
    })
    .catch((error) => {
      error.value = error.message
      console.log(error.code)
    })
}
</script>
