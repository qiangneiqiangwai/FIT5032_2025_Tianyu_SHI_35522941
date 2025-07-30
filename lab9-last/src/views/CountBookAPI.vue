<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Count Book API</h1>

    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p>Loading authors data...</p>
    </div>

    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-if="apiResponse" class="api-response">
      <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import authorsData from '../assets/json/authors.json'

const authors = ref([])
const loading = ref(false)
const error = ref(null)
const apiResponse = ref(null)

const authorsCount = ref(0)
const totalBooks = ref(0)

const calculateStats = () => {
  authorsCount.value = authors.value.length
  totalBooks.value = authors.value.reduce((total, author) => {
    return total + author.famousWorks.length
  }, 0)
}

const getApiData = async () => {
  loading.value = true
  error.value = null

  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    authors.value = authorsData
    calculateStats()

    apiResponse.value = {
      success: true,
      data: {
        authorsCount: authorsCount.value,
        totalBooks: totalBooks.value,
        authors: authors.value.map((author) => ({
          name: author.name,
          bookCount: author.famousWorks.length
        }))
      },
      timestamp: new Date().toISOString()
    }
  } catch (err) {
    error.value = `Error loading authors data: ${err.message}`
    console.error('Error loading authors data:', err)

    apiResponse.value = {
      success: false,
      data: {
        authorsCount: 0,
        totalBooks: 0,
        authors: []
      },
      timestamp: new Date().toISOString(),
      error: err.message
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getApiData()
})

defineExpose({
  getApiData
})
</script>

<style scoped>
.api-response {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  padding: 1rem;
  margin-top: 1rem;
}

.api-response pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>
