<script setup>
import { ref } from 'vue'

defineOptions({
  name: 'UserForm',
})

const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: '',
})

const submittedCards = ref([])

const submitForm = () => {
  submittedCards.value.push({
    ...formData.value,
  })
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: '',
  }
}
</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10 col-12">
        <h1 class="text-center mb-4">User Information Form</h1>

        <form @submit.prevent="submitForm" class="p-4 border rounded-3 bg-light">
          <div class="row mb-3">
            <div class="col-12 col-md-6 mb-3 mb-md-0">
              <label for="username" class="form-label">Username</label>
              <input type="text" class="form-control" id="username" v-model="formData.username" />
            </div>
            <div class="col-12 col-md-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
              />
            </div>
          </div>

          <div class="row mb-3 align-items-center">
            <div class="col-12 col-md-6 mb-3 mb-md-0">
              <label for="gender" class="form-label">Gender</label>
              <select class="form-select" id="gender" v-model="formData.gender">
                <option value="" disabled>-- Please select --</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-check mt-md-4">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="isAustralian"
                  v-model="formData.isAustralian"
                />
                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="reason" class="form-label">Reason For Joining</label>
            <textarea
              class="form-control"
              id="reason"
              rows="3"
              v-model="formData.reason"
            ></textarea>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>

        <!-- 卡片显示区域 -->
        <div class="row mt-5" v-if="submittedCards.length > 0">
          <div class="col-12">
            <div class="d-flex flex-wrap justify-content-center">
              <!-- 卡片循环 -->
              <div
                v-for="(card, index) in submittedCards"
                :key="index"
                class="card m-2"
                style="width: 18rem"
              >
                <div class="card-header">User Information</div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"><strong>Username:</strong> {{ card.username }}</li>
                  <li class="list-group-item"><strong>Password:</strong> {{ card.password }}</li>
                  <li class="list-group-item">
                    <strong>Australian Resident:</strong> {{ card.isAustralian ? 'Yes' : 'No' }}
                  </li>
                  <li class="list-group-item">
                    <strong>Gender:</strong> {{ card.gender || 'Not specified' }}
                  </li>
                  <li class="list-group-item">
                    <strong>Reason:</strong> {{ card.reason || 'N/A' }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-outer {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
.form-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
}

input[type='text'],
input[type='password'],
textarea,
select {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Important for padding and width */
}

input[type='checkbox'] {
  /* Align checkbox with its label */
  margin-bottom: 1rem;
}
</style>
