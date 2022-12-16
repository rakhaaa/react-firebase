import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbd0sYK9rJ9GLzD6LLimb4eBUdT8soqv0",
  authDomain: "react-firebase-955c8.firebaseapp.com",
  projectId: "react-firebase-955c8",
  storageBucket: "react-firebase-955c8.appspot.com",
  messagingSenderId: "923783356763",
  appId: "1:923783356763:web:bd4deb7adf0bec1660fa7e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
