import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";

interface IProps {}

const Header: React.FC<IProps> = () => {
  const { openModal } = useModal();
  const { user, hasUser, logoutHandler } = useAuth();

  return (
    <Wrapper>
      <h1>
        FIrebase + <span>Auth</span>
      </h1>
      <section>
        <div>
          {hasUser && (
            <pre>
              {" "}
              Welcome,
              <span>{user as string}</span>
            </pre>
          )}
        </div>
        {/* {photo && <img src={photo} alt="dp" width={30} height={30} />} */}
        {hasUser && <button onClick={() => logoutHandler()}>Logout</button>}
        {!hasUser && (
          <button onClick={() => openModal()}>Register / Login</button>
        )}
      </section>
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
  section {
    display: flex;

    pre {
      color: #aae63a;
      padding: 0 1rem;
      display: flex;

      span {
        font-size: 1rem;
        padding: 0 3rem;
        color: red;
        font-weight: 900;
      }
    }
  }

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
