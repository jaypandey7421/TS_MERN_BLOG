// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-bb326.firebaseapp.com",
  projectId: "mern-blog-bb326",
  storageBucket: "mern-blog-bb326.firebasestorage.app",
  messagingSenderId: "283523203930",
  appId: "1:283523203930:web:85039555412651ba83a963"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);