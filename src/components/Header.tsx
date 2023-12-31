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
        Firebase + <span className="">FireStore</span>
      </h1>
      <button onClick={toggleTheme}>
        {theme === "light" ? (
          <MdDarkMode size={10} />
        ) : (
          <MdOutlineDarkMode size={10} />
        )}
      </button>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div<{ theme: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0.3rem;
  font-weight: 900;
  justify-content: space-between;
  font-size: small;
  /* background-color: ${(props) =>
    props.theme === "light" ? "dark" : "light"};
  color: ${(props) => (props.theme === "light" ? "dark" : "light")};

  span {
    color: ${(props) => (props.theme === "light" ? "purple" : "white")};
    transition: color 1s; */
`;
