import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";

const SignWithGoogle = () => {
  const { googleSignInHandler } = useAuth();
  const { closeModal } = useModal();
  //   setTimeout(() => {
  //     closeModal();
  //     return () => closeModal;
  //   }, 1000);

     return (
  );
};
export default SignWithGoogle;

const GoogleSignInButton = styled.button`
  padding: 10px 20px;
  background-color: #8c190a;
  color: white;
  border: none;
  margin: 0 auto;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  display: flex;
  align-items: center;
  gap: 10px;
`;
