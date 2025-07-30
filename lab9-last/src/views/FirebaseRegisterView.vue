<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="text-center mb-4">Create an Account</h1>
        <form @submit.prevent="register">
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
          <div class="mb-3 text-center">
            <button type="submit" class="btn btn-primary">Save to Firebase</button>
          </div>
        </form>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <div v-if="success" class="alert alert-success">Registration successful!</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import '../firebase/init.js'

const email = ref('')
const password = ref('')
const error = ref('')
const success = ref(false)
const router = useRouter()
const auth = getAuth()

const register = () => {
  error.value = ''
  success.value = false

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      // eslint-disable-line no-unused-vars
      console.log('Firebase Register Successful!')
      console.log('User ID:', data.user.uid)
      console.log('User Email:', data.user.email)
      success.value = true

      setTimeout(() => {
        router.push('/FireLogin')
      }, 1500)
    })
    .catch((err) => {
      error.value = err.message
      console.log(err.code)
    })
}
</script>
