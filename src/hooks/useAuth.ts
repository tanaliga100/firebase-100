import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { auth } from "../config/firebase.config";

export const useAuth = () => {
  React.useEffect(() => {
    const unsub = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          console.log("USER", user);
        } else {
          console.log("NO USER FOUND");
        }
      },
      (error) => {
        console.log("Authentication Error", error);
      }
    );
    // cleanup
    return () => unsub();
  }, []);
};
