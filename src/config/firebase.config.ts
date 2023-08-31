// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "fir-101-1c18f.firebaseapp.com",
  projectId: "fir-101-1c18f",
  storageBucket: "fir-101-1c18f.appspot.com",
  messagingSenderId: "1071380394046",
  appId: "1:1071380394046:web:e18349a124fa4f4ad4a16f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// SERVICES
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// UTILS
onAuthStateChanged(auth, (user) => {
  if (user === null) {
    console.log("No User");
  } else {
    console.log("User Logged out", user);
  }
});
