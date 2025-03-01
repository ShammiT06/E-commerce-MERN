// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDD9V5RhkYyzz3KjgdiWIeVctijIhX-y_8",
  authDomain: "e-commerce-4c744.firebaseapp.com",
  projectId: "e-commerce-4c744",
  storageBucket: "e-commerce-4c744.firebasestorage.app",
  messagingSenderId: "667494270629",
  appId: "1:667494270629:web:e5f36ae234e85e3b026f4c",
  measurementId: "G-LHBZ3TQMJ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)

export default auth