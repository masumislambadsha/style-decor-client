// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClkLr1clo3L_rITzd0unX82QWPAe8TJSs",
  authDomain: "style-decor-5b2fb.firebaseapp.com",
  projectId: "style-decor-5b2fb",
  storageBucket: "style-decor-5b2fb.firebasestorage.app",
  messagingSenderId: "753772524948",
  appId: "1:753772524948:web:3d181d7b3d3720de4dcb81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
