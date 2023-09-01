import { FormEvent, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const FormField = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #192404;

  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const SignIn = () => {
  const { toSignUp, closeModal } = useModal();
  const { signInHandler } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Email:", email);
    console.log("Password:", password);

    await signInHandler(email, password);
    setEmail("");
    setPassword("");
    setTimeout(() => {
      closeModal();
    }, 1000);
  };
  return (
    <SignInContainer>
      <SignInForm onSubmit={handleSubmit}>
        <FormField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton type="submit">Sign In</SubmitButton>
      </SignInForm>
      <Pre>
        Don't have an account ? <button onClick={toSignUp}>Sign Up</button>
      </Pre>
    </SignInContainer>
  );
};

export default SignIn;

const Pre = styled.div`
  padding: 1rem;
  display: flex;
  gap: 1rem;
  font-size: small;
  align-items: center;
`;
