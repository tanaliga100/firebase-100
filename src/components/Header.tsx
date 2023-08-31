import styled from "styled-components";
import { useTheme } from "../context/AuthContext";

interface IProps {
  handleAuth?: () => void;
  photo?: string | null;
  displayName?: string | null;
  authName?: string | null;
}

const Header: React.FC<IProps> = () => {
  const { theme } = useTheme();

  return (
    <Wrapper theme={theme}>
      <h1>
        FIrebase + <span>Theming</span>
      </h1>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div<{ theme: string }>`
  display: flex;
  padding: 4rem;
  flex-direction: row;
  align-items: center;
  padding: 0 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 6px 8px rgba(0, 0, 0, 0.15);
  justify-content: space-between;
  background: ${(props) => (props.theme === "light" ? "black" : "white")};
  font-size: larger;
  color: ${(props) => (props.theme === "light" ? "white" : "black")};

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
