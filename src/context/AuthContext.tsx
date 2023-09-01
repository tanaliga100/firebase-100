import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { createContext, useContext, useState } from "react";
import { auth } from "../config/firebase.config";

export interface IAuthContext {
  user?: User | unknown;
  authLoading?: boolean;
  hasUser: boolean;
  signUpHandler: (email: string, password: string) => void;
  signInHandler: (email: string, password: string) => void;
  logoutHandler: () => void;
  googleSignInHandler: () => void;
  error?: unknown | string;
  photo: unknown | string;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Must be within the Provider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // state and functions and side effects
  const [user, setUser] = useState<unknown | undefined>();
  const [photo, setPhoto] = useState<unknown | string>("");
  const [authLoading, setAuthLoading] = useState(false);
  const [hasUser, setHasUser] = useState(false);
  const [error, setError] = useState<unknown | string>(null);

  React.useEffect(() => {
    setAuthLoading(true);
    const listen = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        console.log("No User");
      } else {
        console.log("current User", currentUser);

        setUser(currentUser.email);
        setAuthLoading(false);
        setHasUser(true);
      }
    });
    return () => listen();
  }, [auth.onAuthStateChanged]);

  async function googleSignInHandler() {
    const provider = new GoogleAuthProvider();

    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      console.log("Signed in with google" + user);
      setPhoto(user.photoURL);
    } catch (error) {
      setError(error);
      throw new Error("Google Error" + error);
    }
  }

  async function signUpHandler(email: string, password: string) {
    try {
      const curr = await createUserWithEmailAndPassword(auth, email, password);
      console.log("current User", curr.user);
    } catch (error) {
      setError(error);
      throw new Error("Registering Error" + error);
    }
  }
  async function signInHandler(email: string, password: string) {
    try {
      const curr = await signInWithEmailAndPassword(auth, email, password);
      console.log("signed User", curr.user);
    } catch (error: unknown) {
      setError(error);

      throw new Error("Signing Error" + error);
    }
  }

  async function logoutHandler() {
    await auth.signOut();
    setHasUser(false);
  }

  // bundled
  const values = {
    user: user,
    photo: photo,
    authLoading: authLoading,
    hasUser: hasUser,
    error: error,
    signUpHandler: signUpHandler,
    signInHandler: signInHandler,
    logoutHandler: logoutHandler,
    googleSignInHandler: googleSignInHandler,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
