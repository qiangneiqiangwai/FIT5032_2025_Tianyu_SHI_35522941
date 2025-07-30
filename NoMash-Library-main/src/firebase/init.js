// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCteWO1TbWW_ABvJ5oX21NYDlFGwlGa3vA',
  authDomain: 'week5-tianyu.firebaseapp.com',
  projectId: 'week5-tianyu',
  storageBucket: 'week5-tianyu.firebasestorage.app',
  messagingSenderId: '1057429251955',
  appId: '1:1057429251955:web:c2fe7c31160bd4df36c706'
}

// Initialize Firebase
initializeApp(firebaseConfig)

// Initialize Firestore
const db = getFirestore()
export { db }
