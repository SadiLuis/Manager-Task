import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA28Q58_hDb6WZANZZc28oGAScN3ld6Jio",
  authDomain: "toodoapp-20d19.firebaseapp.com",
  projectId: "toodoapp-20d19",
  storageBucket: "toodoapp-20d19.appspot.com",
  messagingSenderId: "731764326025",
  appId: "1:731764326025:web:ed9ab4c1b7637080d71058"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)