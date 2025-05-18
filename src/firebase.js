// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAehZJpf2q2G8eN4sXbI2a_4AD9aJBywf4",
  authDomain: "portfolio-76487.firebaseapp.com",
  projectId: "portfolio-76487",
  storageBucket: "portfolio-76487.appspot.com",
  messagingSenderId: "798677173768",
  appId: "1:798677173768:web:bba9186c31cddffbeab3bd",
  measurementId: "G-SCB2CMW3QM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, db, auth, storage }; 