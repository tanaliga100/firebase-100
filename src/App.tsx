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
  );
};
export default App;

const Main = styled.main`
  font-size: larger;
`;

// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5); // Semi-transparent black background
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000; // Ensure the overlay is above other content
// `;

// const ModalContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 10px;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
// `;
