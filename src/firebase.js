// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBDzIHxBit5uMC6hCvRZ2kC6dsyH9ZKrIY",
    authDomain: "notes-app-70b1f.firebaseapp.com",
    projectId: "notes-app-70b1f",
    storageBucket: "notes-app-70b1f.firebasestorage.app",
    messagingSenderId: "39759400275",
    appId: "1:39759400275:web:1d57ddc3e8f1b95638a5a6"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
