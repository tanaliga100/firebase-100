// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// COLLECTIONS
export const booksCollectionRef = collection(db, "books");
export const ordersCollectionRef = collection(db, "orders");

// UTILS
// onAuthStateChanged(auth, (user) => {
//   if (user === null) {
//     console.log("No User");
//   } else {
//     console.log(user);
//     return user;
//   }
// });

// GETTING ALL COLLECTIONS
// export const getAllColls = async () => {
//   const colls: ((options?: SnapshotOptions | undefined) => DocumentData)[] = [];

//   const qSnap = await getDocs(collection(db, "books"));
//   qSnap.forEach((doc) => colls.push(doc.data));

//   return colls;
// };
// COLLECTION REFERENCES
export const bandsRef = collection(db, "bands");
export const ordersRef = collection(db, "orders");
export const specialOfTheDayRef = collection(db, "specialOfTheDay");

