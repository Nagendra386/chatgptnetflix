// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChfSyhIQbz_q2RZZ2rDDCu8nSqxoFKAaE",
  authDomain: "chatnetflix-688d9.firebaseapp.com",
  projectId: "chatnetflix-688d9",
  storageBucket: "chatnetflix-688d9.appspot.com",
  messagingSenderId: "1011001152660",
  appId: "1:1011001152660:web:aa9a0747b95c8dd3d7d081",
  measurementId: "G-2595CC744V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();