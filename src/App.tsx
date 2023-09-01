import styled from "styled-components";
import Header from "./components/Header";
import { useTheme } from "./context/ThemeContext";

const App = () => {
  const { theme } = useTheme();
  console.log({ theme });

  return (
    <Main className={`app ${theme}`}>
      <Header />
    </Main>
  );
};
export default App;

const Main = styled.main`
  font-size: larger;
`;
