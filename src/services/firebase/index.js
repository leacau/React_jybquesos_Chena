import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBBrCu9Uqqy5tq8YzqhPXS5D7Gkv2gTaC8",
  authDomain: "jybquesos-8c7e7.firebaseapp.com",
  projectId: "jybquesos-8c7e7",
  storageBucket: "jybquesos-8c7e7.appspot.com",
  messagingSenderId: "928619740725",
  appId: "1:928619740725:web:0f4ca79a7da65f8e1bfb7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)