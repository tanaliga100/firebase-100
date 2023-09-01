import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";

interface IProps {}

const Header: React.FC<IProps> = () => {
  const { openModal } = useModal();
  const { user, hasUser, logoutHandler } = useAuth();

  console.log("header", user);

  return (
    <Wrapper>
      <h1>
        FIrebase + <span>Auth</span>
      </h1>
      {hasUser && <pre> Welcome, {user as string}</pre>}
      {/* {photo && <img src={photo} alt="dp" width={30} height={30} />} */}
      {hasUser && <button onClick={() => logoutHandler()}>Logout</button>}
      {!hasUser && (
        <button onClick={() => openModal()}>Register / Login</button>
      )}
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
