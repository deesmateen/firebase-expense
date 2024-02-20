// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzpuX7wSJ60M8AFXj4Q5ivIOR9XqWcuwU",
  authDomain: "fir-expense-8e7fc.firebaseapp.com",
  projectId: "fir-expense-8e7fc",
  storageBucket: "fir-expense-8e7fc.appspot.com",
  messagingSenderId: "108775306105",
  appId: "1:108775306105:web:7c454b25265c1741d075a8",
  measurementId: "G-2K8NL1P8SV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
