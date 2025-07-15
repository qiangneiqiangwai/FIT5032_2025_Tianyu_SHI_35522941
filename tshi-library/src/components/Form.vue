<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

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
  validateName(true)
  validatePassword(true)
  validateGender(true)
  validateIsAustralian(true)
  validateReason(true)
  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.gender &&
    !errors.value.isAustralian &&
    !errors.value.reason
  ) {
    submittedCards.value.push({ ...formData.value })
    clearForm()
  }
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

const errors = ref({
  username: null,
  password: null,
  isAustralian: null,
  gender: null,
  reason: null,
})

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Username must be at least 3 characters.'
    else errors.value.username = 'At least 3 characters.'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const validateGender = (blur) => {
  if (!formData.value.gender) {
    if (blur) errors.value.gender = 'Please select a gender.'
    else errors.value.gender = 'Gender is required.'
  } else {
    errors.value.gender = null
  }
}

const validateIsAustralian = (blur) => {
  if (formData.value.isAustralian !== true) {
    if (blur) errors.value.isAustralian = 'You must be an Australian resident.'
    else errors.value.isAustralian = 'Australian resident required.'
  } else {
    errors.value.isAustralian = null
  }
}

const validateReason = (blur) => {
  if (!formData.value.reason || formData.value.reason.length < 5) {
    if (blur) errors.value.reason = 'Reason must be at least 5 characters.'
    else errors.value.reason = 'At least 5 characters.'
  } else {
    errors.value.reason = null
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
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="formData.username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <div class="col-12 col-md-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>

          <div class="row mb-3 align-items-center">
            <div class="col-12 col-md-6 mb-3 mb-md-0">
              <label for="gender" class="form-label">Gender</label>
              <select
                class="form-select"
                id="gender"
                v-model="formData.gender"
                @blur="() => validateGender(true)"
                @change="() => validateGender(false)"
              >
                <option value="" disabled>-- Please select --</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-check mt-md-4">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="isAustralian"
                  v-model="formData.isAustralian"
                  @change="() => validateIsAustralian(false)"
                  @blur="() => validateIsAustralian(true)"
                />
                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
                <div v-if="errors.isAustralian" class="text-danger">{{ errors.isAustralian }}</div>
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
              @blur="() => validateReason(true)"
              @input="() => validateReason(false)"
            ></textarea>
            <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>

        <!-- PrimeVue DataTable 展示区域 -->
        <div class="row mt-5" v-if="submittedCards.length > 0">
          <div class="col-12">
            <DataTable :value="submittedCards" tableStyle="min-width: 100%">
              <Column field="username" header="Username" />
              <Column field="password" header="Password" />
              <Column
                field="isAustralian"
                header="Australian Resident"
                :body="(row) => (row.isAustralian ? 'Yes' : 'No')"
              />
              <Column field="gender" header="Gender" />
              <Column field="reason" header="Reason" />
            </DataTable>
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
