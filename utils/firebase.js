import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAUTlpyNBTvRnr9BZlR4R7q3GjuN8mkjZ0",
    authDomain: "restaurants-90bb2.firebaseapp.com",
    projectId: "restaurants-90bb2",
    storageBucket: "restaurants-90bb2.appspot.com",
    messagingSenderId: "493162229513",
    appId: "1:493162229513:web:dc0ac3350e2cafb54fedd8"
  };
  
  // Initialize Firebase
  initializeApp(firebaseConfig);
  export const db = getFirestore();