<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <div v-if="books.length === 0" class="alert alert-info">No books found with ISBN > 1000</div>
    <div v-else>
      <div v-for="book in books" :key="book.id" class="card mb-3">
        <div class="card-body">
          <div v-if="editingId !== book.id">
            <h5 class="card-title">{{ book.name }}</h5>
            <p class="card-text">ISBN: {{ book.isbn }}</p>
            <button @click="startEdit(book)" class="btn btn-primary btn-sm me-2">Edit</button>
            <button @click="deleteBook(book.id)" class="btn btn-danger btn-sm">Delete</button>
          </div>
          <div v-else>
            <div class="mb-3">
              <label class="form-label">Book Name:</label>
              <input v-model="editForm.name" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">ISBN:</label>
              <input v-model="editForm.isbn" type="number" class="form-control" required />
            </div>
            <button @click="updateBook(book.id)" class="btn btn-success btn-sm me-2">Save</button>
            <button @click="cancelEdit" class="btn btn-secondary btn-sm">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="message"
      class="alert"
      :class="messageType === 'success' ? 'alert-success' : 'alert-danger'"
    >
      {{ message }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { db } from '../firebase/init.js'
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'

export default {
  setup() {
    const books = ref([])
    const editingId = ref(null)
    const editForm = ref({ name: '', isbn: '' })
    const message = ref('')
    const messageType = ref('')

    const fetchBooks = async () => {
      try {
        const q = query(collection(db, 'books'), where('isbn', '>', 1000))
        const querySnapshot = await getDocs(q)
        const booksArray = []
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() })
        })
        books.value = booksArray
      } catch (error) {
        console.error('Error fetching books: ', error)
        showMessage('Error fetching books', 'error')
      }
    }

    const startEdit = (book) => {
      editingId.value = book.id
      editForm.value = {
        name: book.name,
        isbn: book.isbn
      }
    }

    const cancelEdit = () => {
      editingId.value = null
      editForm.value = { name: '', isbn: '' }
    }

    const updateBook = async (bookId) => {
      try {
        const bookRef = doc(db, 'books', bookId)
        await updateDoc(bookRef, {
          name: editForm.value.name,
          isbn: Number(editForm.value.isbn)
        })

        showMessage('Book updated successfully!', 'success')
        cancelEdit()
        fetchBooks() // Refresh the list
      } catch (error) {
        console.error('Error updating book: ', error)
        showMessage('Error updating book', 'error')
      }
    }

    const deleteBook = async (bookId) => {
      if (confirm('Are you sure you want to delete this book?')) {
        try {
          await deleteDoc(doc(db, 'books', bookId))
          showMessage('Book deleted successfully!', 'success')
          fetchBooks() // Refresh the list
        } catch (error) {
          console.error('Error deleting book: ', error)
          showMessage('Error deleting book', 'error')
        }
      }
    }

    const showMessage = (msg, type) => {
      message.value = msg
      messageType.value = type
      setTimeout(() => {
        message.value = ''
      }, 3000)
    }

    onMounted(() => {
      fetchBooks()
    })

    return {
      books,
      editingId,
      editForm,
      message,
      messageType,
      startEdit,
      cancelEdit,
      updateBook,
      deleteBook
    }
  }
}
</script>
