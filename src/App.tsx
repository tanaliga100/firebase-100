import styled from "styled-components";
import Header from "./components/Header";

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
