import { addDoc, onSnapshot } from "firebase/firestore";
import { bandsRef } from "../config/firebase.config";
import { IBandsData } from "./AddBook";

//    const unsubscribe = onSnapshot(bandsRef, (snapshot) => {
//      try {
//        const bandsData: Band[] = snapshot.docs.map((doc) => ({
//          id: doc.id,
//          ...doc.data(),
//        }));
//        setBands(bandsData);
//        setLoading(false);
//        setError(null);
//      } catch (err: any) {
//        setError(err.message);
//        setLoading(false);
//      }
//    });

//    return () => unsubscribe();

export interface APIRes {
  id: string;
}

export type ICallBack = () => IBandsData;

export const currentState = (callback) => {
  onSnapshot(bandsRef, (snapShot) => {
    try {
      const bandsData = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      if (bandsData.length === 0) {
        callback("No data are listed on the database");
      } else {
        callback(bandsData);
      }

      //  return bondsData here... @tanaliga
    } catch (error) {
      console.log(error);
    }
  });
};

export const addBands = async (newBand: IBandsData) => {
  try {
    //     const data = await addDoc(bandsRef, newBands);
    console.log("NEW DATA ADDED", newBand);
    await addDoc(bandsRef, newBand);
  } catch (error) {
    console.log("ERROR", error);
  }
};

export async function searchBands() {
  try {
    const q = query(bandsRef, where("name", "==", searchTerm.toLowerCase()));
    const querySnap = await getDocs(q);

    const foundBands: Band[] = querySnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(foundBands);

    //  setBands(foundBands);
  } catch (error) {
    console.log(error);
  }
}
