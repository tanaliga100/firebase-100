import styled from "styled-components";
import Header from "./components/Header";
import Modal from "./components/Modal";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { hasUser, user } = useAuth();
  console.log("has user", hasUser);
  console.log(" user", user);

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
