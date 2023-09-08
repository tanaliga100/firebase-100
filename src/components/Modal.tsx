import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignWithGoogle from "./SignWithGoogle";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  div {
    color: teal;
  }
`;

const Modal: React.FC = () => {
  const { closeModal, isOpen, isSignIn } = useModal();
  const { error } = useAuth();
  console.log("from error", error);

  return (
    <>
      {isOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <div>
              {/* Modal content goes here */}
              {/* {error && <p>{error}</p>} */}
              {isSignIn ? <SignIn /> : <SignUp />}
              <SignWithGoogle />
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Modal;
