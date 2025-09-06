// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZmvqwyPhOXzwYhNkzphlrnz775MCtQFE",
  authDomain: "campuscare-3a887.firebaseapp.com",
  projectId: "campuscare-3a887",
  storageBucket: "campuscare-3a887.firebasestorage.app",
  messagingSenderId: "871251847754",
  appId: "1:871251847754:web:6c2b87e77ea073330e14b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);