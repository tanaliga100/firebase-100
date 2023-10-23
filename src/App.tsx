import styled from "styled-components";
import Header from "./components/Header";
import Todo from "./components/Todos/Todo";
import { useTheme } from "./context/ThemeContext";

const App = () => {
  const { theme } = useTheme();
  return (
    <div className={`app ${theme}`}>
      <Header />

      <Section theme={theme}>
        <Todo />
      </Section>
    </div>
  );
};

export default App;

const Section = styled.section<{ theme: string }>`
  font-size: larger;
  padding: 2rem;
  color: ${(props) =>
    props.theme === "dark" ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)"};
  transition: background-color 0.9s, color 0.5s;

  background-color: ${(props) =>
    props.theme === "dark" ? "rgb(248, 248, 248)" : "rgb(2, 2, 34)"};
`;
