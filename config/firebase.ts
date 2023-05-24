// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6-IKkhQswbq9mk3GqbkXh2EAobPhZgHo",
  authDomain: "brogrammer-blog.firebaseapp.com",
  projectId: "brogrammer-blog",
  storageBucket: "brogrammer-blog.appspot.com",
  messagingSenderId: "987715170533",
  appId: "1:987715170533:web:f1440536c3a8dc29b3a40c",
  measurementId: "G-GH989V40Z3",
}

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig)

export default firebase_app
