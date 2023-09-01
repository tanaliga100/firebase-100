import styled from "styled-components";
import { useModal } from "../context/ModalContext";

interface IProps {}

const Header: React.FC<IProps> = () => {
  const { openModal } = useModal();
  return (
    <Wrapper>
      <h1>
        FIrebase + <span>Auth</span>
      </h1>
      <button onClick={() => openModal()}>Register / Login</button>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  padding: 4rem;
  flex-direction: row;
  align-items: center;
  padding: 0 1rem;
  justify-content: space-between;
  background: black;
  font-size: larger;
  color: white;

  span {
    color: #aae63a;
  }

  h1 {
    font-weight: 900;
    font-size: larger;
  }
  section {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    span {
      font-size: medium;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }
  button {
    margin: 1rem;
    font-size: medium;
    font-weight: 500;
  }
`;
