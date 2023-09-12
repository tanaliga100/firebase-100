import styled from "styled-components";
import AddBook from "./components/AddBook";
import Bands from "./components/Bands";
import Header from "./components/Header";

const App = () => {
  return (
    <Main>
      <Header />
      <AddBook />

      <Bands />
    </Main>
  );
};
export default App;

const Main = styled.main`
  font-size: larger;
`;
