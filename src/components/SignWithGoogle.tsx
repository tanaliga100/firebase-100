import styled from "styled-components";

const SignWithGoogle = () => {
  return <GoogleSignInButton>Sign in with Google</GoogleSignInButton>;
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
