import styled from "styled-components";

interface IProps {
  handleAuth: () => void;
  photo: string | null;
  displayName: string | null;
  authName: string | null;
}

const Header: React.FC<IProps> = (props) => {
  console.log(props);

  return (
    <Wrapper>
      <h1>
        FIrebaseCrud + <span>Auth</span>
      </h1>
      <section>
        {props.displayName && (
          <span>
            Welcome, <p>{props.displayName}</p>
          </span>
        )}
        {props.photo && <img src={props.photo} width={30} height={30} />}
        <button onClick={props.handleAuth}>{props.authName}</button>
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
