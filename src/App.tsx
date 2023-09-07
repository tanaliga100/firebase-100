import styled from "styled-components";
import Header from "./components/Header";

const App = () => {
  return (
    <Main>
      <Header />
      <Section></Section>
    </Main>
  );
};
export default App;

const Main = styled.main`
  font-size: larger;
`;

const Section = styled.main`
  font-size: larger;
  padding-top: 2rem;
`;
