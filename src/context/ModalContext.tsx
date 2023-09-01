import React, { createContext, useContext, useState } from "react";

interface IModalContext {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isSignIn: boolean;
  toSignIn: () => void;
  toSignUp: () => void;
}

const ModalContext = createContext<IModalContext | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Must be within modal provider");
  }
  return context;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // state and functions

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
    console.log("clicked");
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const [isSignIn, setIsSignIn] = useState(true);
  const toSignIn = () => {
    setIsSignIn(true);
  };
  const toSignUp = () => {
    setIsSignIn(false);
  };

  // bundled
  const values = {
    isOpen: isOpen,
    openModal: openModal,
    closeModal: closeModal,
    isSignIn: isSignIn,
    toSignIn: toSignIn,
    toSignUp: toSignUp,
  };

  return (
    <ModalContext.Provider value={values}>{children}</ModalContext.Provider>
  );
};
