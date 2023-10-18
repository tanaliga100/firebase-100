import styled from "styled-components";
import Header from "./components/Header";

import { useTheme } from "./context/AuthContext";

const App = () => {
  const ctx = useTheme();
  console.log("context", ctx);

  return (
    <div className={`app ${ctx.theme}`}>
      <Main>
        <Header />
      </Main>
      <h1>Theme Switcher</h1>
      <p>Current Theme: {ctx.theme}</p>
      <button onClick={ctx.toggleTheme}>Toggle Theme</button>
    </div>
=======

const App = () => {
  return (
    <Main>
      <Header />
    </Main>

  );
};
export default App;

const Main = styled.main`
  font-size: larger;
`;

