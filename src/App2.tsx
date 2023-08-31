import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Modal from "./components/Modal";
import { auth, db } from "./config/firebase.config";

const App = () => {
  const [displayName, setDisplayName] = useState<string | null>("");
  const [photo, setPhoto] = useState<string | null>("");
  const [authName, setAuthName] = useState("Sign In");
  const [openModal, setOpenModal] = useState(false);

  // on page load
  useEffect(() => {
    const storedData = localStorage.getItem("authData");
    if (storedData) {
      const { displayName, photo } = JSON.parse(storedData);
      setDisplayName(displayName);
      setPhoto(photo);
      setAuthName("Logout");
    }
  }, []);

  async function handleAuth() {
    if (auth.currentUser) {
      try {
        await signOut(auth);
        setDisplayName("");
        setAuthName("Sign In");
        setPhoto("");
        localStorage.removeItem("authData");

        await auth.signOut();
      } catch (error) {
        console.log("Error Logging out", error);
      }
    } else {
      try {
        const currentUser = await signInWithPopup(
          auth,
          new GoogleAuthProvider()
        );
        console.log("current", currentUser);

        if (currentUser.user) {
          setDisplayName(currentUser.user.displayName);
          setAuthName("Logout");
          setPhoto(currentUser.user.photoURL);
        }
        // persist data to storage
        const authData = {
          displayName: currentUser.user.displayName,
          photo: currentUser.user.photoURL,
        };
        localStorage.setItem("authData", JSON.stringify(authData));

        // create a users collection in the DB

        const userCollectionRef = collection(db, "users");
        await addDoc(userCollectionRef, {
          uid: currentUser.user.uid,
          displayName: currentUser.user.displayName,
          photoURL: currentUser.user.photoURL,
          email: currentUser.user.email,
          createdAt: currentUser.user.metadata.creationTime,
          lastLoginAt: currentUser.user.metadata.lastSignInTime,
        });
      } catch (error) {
        console.log("Error", error);
      }
    }
  }

  return (
    <Main>
      <Header
        handleAuth={handleAuth}
        displayName={displayName}
        photo={photo}
        authName={authName}
      />
      {openModal && (
        <Overlay onClick={() => setOpenModal(false)}>
          <ModalContent>
            <Modal />
          </ModalContent>
        </Overlay>
      )}
    </Main>
  );
};
export default App;

const Main = styled.main`
  font-size: larger;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // Semi-transparent black background
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; // Ensure the overlay is above other content
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;
