import styled from "styled-components";
import { useTheme } from "../context/ThemeContext";

interface IProps {
  handleAuth?: () => void;
  photo?: string | null;
  displayName?: string | null;
  authName?: string | null;
}

import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

const Header: React.FC<IProps> = () => {
  const { toggleTheme, theme } = useTheme();
  return (
    <Wrapper theme={theme}>
      <h1>
        FIrebase + <span>FireStore</span>
      </h1>
      <button onClick={toggleTheme}>
        {theme === "light" ? (
          <MdDarkMode size={25} />
        ) : (
          <MdOutlineDarkMode size={25} />
        )}
      </button>
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
  justify-content: space-between;
  font-size: larger;
  background-color: ${(props) => (props.theme === "light" ? "dark" : "light")};
  color: ${(props) => (props.theme === "light" ? "dark" : "light")};
`;
