import styled from "styled-components";

interface IProps {}

const Header: React.FC<IProps> = () => {
  return (
    <Wrapper>
      <h1>
        FIrebase + <span>Auth</span>
      </h1>
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
