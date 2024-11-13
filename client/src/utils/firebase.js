import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// import dotenv from 'dotenv';

// dotenv.config();


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "clone-cdc6c.firebaseapp.com",
  projectId: "clone-cdc6c",
  storageBucket: "clone-cdc6c.appspot.com",
  messagingSenderId: "170678720202",
  appId: "1:170678720202:web:622b7eae4382bf3e330633"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();


export default app;