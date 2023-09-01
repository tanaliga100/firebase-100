import styled from "styled-components";
import Header from "./components/Header";
import Todo from "./components/Todos/Todo";

const App = () => {
  return (
    <Main>
      <Header />
      <Section>
        <Todo />
      </Section>
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
