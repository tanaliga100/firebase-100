import styled from "styled-components";
import Header from "./components/Header";
import Modal from "./components/Modal";

const App = () => {
  return (
    <Main>
      <Header />
      <Modal />
    </Main>
  );
};
export default App;

const Main = styled.main`
  font-size: larger;
`;
