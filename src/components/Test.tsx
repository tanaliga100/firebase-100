import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import React from "react";
import { fireStore } from "../config/firebase.config";

const Test = () => {
  React.useEffect(() => {
    listenToDocument();
  }, []);
  const data = {
    description: "Sinigang",
    price: 19.34,
    milk: "wala",
    vegan: true,
  };

  return (
    <>
      <button onClick={() => writeCollection(data)}>Write Collection</button>
      <button onClick={() => addCollection()}>Add Collection</button>
      <button onClick={() => readSingleDocument()}>
        Read Single Document{" "}
      </button>
      <button onClick={() => readMultipleDocument()}>
        Read Multiple Documents
      </button>
    </>
  );
};

export default Test;

// CREATE
interface DataToAdd {
  description: string;
  milk: string;
  price: number;
  vegan: boolean;
}

// REFERENCE
const specialOfTheDay = doc(fireStore, "specialOfTheDay/2026");
const ordersCollection = collection(fireStore, "orders");
const specicalQuery = query(collection(fireStore, "specialOfTheDay"));

// LISTEN TO CHANGES
async function listenToDocument() {
  onSnapshot(specialOfTheDay, (docSnapshot) => {
    if (docSnapshot.exists()) {
      console.log("In realtime data", docSnapshot.data());
    }
  });
  onSnapshot(specicalQuery, (specialQuerySnapshot) => {
    console.log(
      `Special of the day`,
      specialQuerySnapshot.docs.map((e) => e.data())
    );
  });
}

//   WRITE
async function writeCollection(dataToAdd: DataToAdd) {
  try {
    // write the reference
    await setDoc(specialOfTheDay, dataToAdd, { merge: true });
    console.log("Data Up");
  } catch (error) {
    console.log("Error adding document" + error);
  }
}
// ADD
async function addCollection() {
  try {
    // write the reference
    const newDoc = await addDoc(ordersCollection, {
      customer: "Jordan",
      drink: "Coffee",
      totalCost: (100 + Math.floor(Math.random() * 400)) / 100,
    });
    console.log("Doc Created", newDoc.id);
  } catch (error) {
    console.log("Error adding document" + error);
  }
}

// READ | Single Documemts
async function readSingleDocument() {
  try {
    const mySnapShot = await getDoc(specialOfTheDay);
    if (mySnapShot.exists()) {
      const data = mySnapShot.data();
      console.log("My data is " + JSON.stringify(data));
    }
  } catch (error) {
    console.log("Error getting document" + error);
  }
}
// READ | Multiple Documents
async function readMultipleDocument() {
  try {
    // make reference
    const ordersQuery = query(collection(fireStore, "orders"));
    // query
    const querySnap = await getDocs(ordersQuery);
    console.log(
      "all docs",
      querySnap.docs.map((data) => data.data())
    );

    //     const allDocs = querySnap.forEach((snap) => {
    //       console.log(
    //         `Document
    //         ${snap.id} contains
    //         ${JSON.stringify(snap.data())}
    //         `
    //       );
    //     });

    //     console.log(allDocs);
  } catch (error) {
    console.log("Error getting documents" + error);
  }
}
