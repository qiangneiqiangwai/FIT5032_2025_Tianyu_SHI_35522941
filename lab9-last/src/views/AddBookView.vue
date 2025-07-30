<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="text-center mb-4">Add Book</h1>
        <form @submit.prevent="addBook">
          <div class="mb-3">
            <label for="isbn" class="form-label">ISBN:</label>
            <input type="text" class="form-control" v-model="isbn" id="isbn" required />
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" v-model="name" id="name" required />
          </div>
          <div class="mb-3 text-center">
            <button type="submit" class="btn btn-primary">Add Book</button>
          </div>
        </form>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <div v-if="success" class="alert alert-success">Book added successfully!</div>
      </div>
    </div>
    <div class="row justify-content-center mt-5">
      <div class="col-md-8">
        <BookList />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase/init.js'
import BookList from '../components/BookList.vue'

const isbn = ref('')
const name = ref('')
const error = ref('')
const success = ref(false)

const addBook = async () => {
  error.value = ''
  success.value = false

  try {
    // Convert isbn to number
    const isbnNumber = Number(isbn.value)

    // Add document to Firestore collection
    await addDoc(collection(db, 'books'), {
      isbn: isbnNumber,
      name: name.value
    })

    success.value = true

    // Clear form fields
    isbn.value = ''
    name.value = ''

    console.log('Book added successfully!')
  } catch (err) {
    error.value = err.message
    console.error('Error adding book:', err)
  }
}
</script>
