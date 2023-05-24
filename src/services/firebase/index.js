import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
apiKey: "AIzaSyBBrCu9Uqqy5tq8YzqhPXS5D7Gkv2gTaC8",
authDomain: "jybquesos-8c7e7.firebaseapp.com",
projectId: "jybquesos-8c7e7",
storageBucket: "jybquesos-8c7e7.appspot.com",
messagingSenderId: "928619740725",
appId: "1:928619740725:web:0f4ca79a7da65f8e1bfb7c"

/*   apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId */
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);
