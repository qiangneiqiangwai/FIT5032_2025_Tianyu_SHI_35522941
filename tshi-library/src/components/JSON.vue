<!-- JSONLab.vue -->
<template>
  <div class="json-lab">
    <h1>🗄️ JSON Data & Vue Directives Lab</h1>

    <section class="lab-section">
      <h2>📚 Working with JSON Arrays</h2>
      <p>Our <code>authors.json</code> contains an array of author objects.</p>

      <h3>Iterating through Arrays</h3>
      <!-- Add search input -->
      <input
        v-model="searchQuery"
        class="search-input"
        type="text"
        placeholder="Search authors by name..."
      />
      <!-- Activity 6: Render a list containing author names and their birth years. Hint: Make use of the v-for directive to iterate through the array of authors. -->
      <!-- TODO: CODE TO RENDER LIST OF AUTHORS HERE -->
      <ul>
        <li
          v-for="author in filteredAuthors"
          :key="author.id"
          :class="{ highlight: selectedAuthorId === author.id }"
          @click="selectedAuthorId = selectedAuthorId === author.id ? null : author.id"
        >
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>

      <h3>Filtering Arrays</h3>
      <!-- Activity 7: Render a list containing authors born after 1850. Hint: Make use of the v-for directive to iterate through the array of authors that you have filtered out. -->
      <p>Authors born after 1850:</p>
      <!-- TODO: CODE TO RENDER LIST OF AUTHORS HERE -->
      <ul>
        <li v-for="author in modernAuthors" :key="author.id">
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>

      <h3>Mapping Arrays</h3>
      <p>Famous works:</p>
      <ul>
        <!-- Activity 8: Render a list of all famous works. Hint: Use the v-for directive to iterate through the array of authors that you have filtered out. -->
        <!-- TODO: CODE TO RENDER LIST OF FAMOUS WORKS HERE -->
        <li v-for="(work, index) in allFamousWorks" :key="index">
          {{ work }}
        </li>
      </ul>

      <h3>Finding in Arrays</h3>
      <div v-if="orwell" class="author-details">
        <h4>Author Details: {{ orwell.name }}</h4>
        <h4>Famous Works:</h4>
        <ul>
          <li v-for="work in orwell.famousWorks" :key="work.title">
            {{ work.title }} ({{ work.year }})
          </li>
        </ul>
      </div>
      <p v-else>Author not found</p>

      <h3>Nested Arrays/Objects</h3>
      <p>{{ austen?.name }}'s works:</p>
      <!-- Activity 9: Render a list of Austen's works. Hint: Use the v-for directive to iterate through the array of authors that you have filtered out. -->
      <!-- TODO: CODE TO RENDER LIST OF AUSTEN'S WORKS HERE -->
      <ul v-if="austen">
        <li v-for="work in austen.famousWorks" :key="work.title">
          {{ work.title }}
        </li>
      </ul>
    </section>

    <section class="lab-section">
      <h2>🏢 Working with JSON Objects</h2>
      <p>Our <code>bookstores.json</code> is a JSON object.</p>

      <h3>Accessing Properties</h3>
      <p>
        Company:
        <!-- Activity 9a: Get the company name from the bookstores object. -->
        <code>{{ bookstores.name }}</code>
      </p>

      <p>
        Total Stores:<code>{{ bookstores.totalStores }}</code>
      </p>
      <!-- Activity 9b: Get the total number of stores from the bookstores object. -->

      <h3>Iterating Object Properties</h3>
      <p>Store Types:</p>
      <!-- Activity 10: Iterate through the storeTypes array and display the store type and the number of stores that use that type. -->
      <!-- TODO: CODE TO RENDER LIST OF STORE TYPES HERE -->
      <ul>
        <li v-for="(count, type) in bookstores.storeTypes" :key="type">
          {{ type }}: {{ count }} {{ count > 1 ? 'stores' : 'store' }}
        </li>
      </ul>

      <h3>Nested Objects</h3>
      <p>Opening Hours:</p>
      <!-- Activity 11: Iterate through the openingHours object and display the day of the week and the opening and closing times. -->
      <!-- TODO: CODE TO RENDER LIST OF OPENING HOURS HERE -->
      <ul>
        <li v-for="(schedule, period) in bookstores.openingHours" :key="period">
          <strong>{{ period }}:</strong> {{ schedule.open }} - {{ schedule.close }}
        </li>
      </ul>

      <h3>Working with Arrays in Objects</h3>
      <!-- Activity 12: Get the top sellers from the bookstores object. -->
      <!-- TODO: CODE TO GET TOP SELLERS HERE -->
      <p>
        We operate in:
        <code>
          <span v-for="(country, index) in bookstores.countries" :key="country">
            {{ country }}{{ index < bookstores.countries.length - 1 ? ', ' : '' }}
          </span>
        </code>
      </p>
      <p>Top Sellers:</p>
      <ol>
        <li v-for="book in bookstores.topSellers" :key="book">
          {{ book }}
        </li>
      </ol>
    </section>

    <section class="lab-section">
      <h2>v-if & v-else</h2>
      <p>Toggle visibility based on a condition.</p>
      <!-- Activity 13: Toggle the message visibility when the button is clicked. -->
      <!-- TODO: CODE TO TOGGLE MESSAGE VISIBILITY HERE. Hint: Use the v-if directive. -->
      <button @click="showMessage = !showMessage">Toggle Message</button>

      <p v-if="showMessage" class="message success">✨ You're a Vue superstar! ✨</p>
      <p v-else class="message">Click the button to see a message.</p>
    </section>

    <section class="lab-section">
      <h2>Attribute, Class and Style Binding with <code>v-bind</code></h2>
      <p>Highlighting Specific Authors:</p>
      <p>
        Click on any author in the list under "Iterating through Arrays" to see the highlight effect
        in action. This is achieved using <code>@click</code> and <code>class</code> binding.
      </p>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Activity 1: Import JSON files (authors.json and bookstores.json)
// TODO: CODE TO IMPORT JSON FILES HERE
import authors from '../assets/json/authors.json'
import bookstores from '../assets/json/bookstores.json'
const showMessage = ref(false)

// For Author Highlighting
const selectedAuthorId = ref(null)

// For Activity 14
const searchQuery = ref('')

// For Activity 14: A new computed property to filter authors based on searchQuery
const filteredAuthors = computed(() => {
  if (!searchQuery.value) {
    return authors // If search query is empty, return all authors
  }
  return authors.filter((author) =>
    author.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

// Activity 2: Get authors born after 1850
const modernAuthors = computed(() => {
  return authors.filter((author) => author.birthYear > 1850)
})

// Activity 3: Get all famous works
const allFamousWorks = computed(() => {
  return authors.flatMap((author) => author.famousWorks.map((work) => work.title))
})

// Activity 4: Find author by name
const orwell = computed(() => {
  // TODO: CODE TO FIND AUTHOR BY NAME HERE
  return authors.find((author) => author.name === 'George Orwell')
})

// Activity 5: Find author by ID
const austen = computed(() => {
  // TODO: CODE TO FIND AUTHOR BY ID HERE
  return authors.find((author) => author.id === 2)
})
</script>

<style scoped>
.json-lab {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1,
h2 {
  color: #333;
}
h1 {
  text-align: center;
}

.lab-section {
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.message {
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.success {
  background-color: #e7faf3;
  color: #42b883;
  border: 1px solid #42b883;
}

.highlight {
  background-color: #42b883;
  color: white;
  cursor: pointer;
}

code {
  background-color: #e0e0e0;
  padding: 2px 5px;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  background-color: #f0f0f0;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  transition: background-color 0.2s;
}
.search-input {
  width: 100%;
  padding: 8px 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
