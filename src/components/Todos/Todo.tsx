import { useEffect, useState } from "react";
import styled from "styled-components";
import { useCrudBooks } from "../../hooks/useCrudBooks";
import Form from "./Form";

export interface IBook {
  id?: string;
  name: string;
  author: string;
}
const Todo = () => {
  // HOOKS
  const { deleteBookHandler, getAllBooks } = useCrudBooks();
  const [books, setBooks] = useState<IBook[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  // GETTING ALL THE DOCUMENTS HERE...
  //   useEffect(() => {
  //     const unsubscribe = onSnapshot(booksCollection, (snapshots) => {
  //       if (!snapshots.empty) {
  //         const books: IBook[] = [];
  //         snapshots.docs.forEach((book) => {
  //           books.push({
  //             id: book.id,
  //             name: book.data().name,
  //             author: book.data().author,
  //           });
  //         });
  //         setBooks(books);
  //       }
  //     });
  //     return () => unsubscribe();
  //   }, []);

  // SIMULATION
  useEffect(() => {
    getAllBooks();
  }, []);

  // ADDING DOCUMENTS HERE...
  // DELETING DOCUMENT HERE...
  // EARLY  RETURN

  return (
    <Wrapper>
      <h1>
        {books.length === 0 && <pre>No Books are listed in the database</pre>}
      </h1>
      <button onClick={() => setShowModal(true)}>Add Book</button>
      <ModalOverlay isOpen={showModal}>
        <ModalContent>
          <CloseButton onClick={() => setShowModal(false)}>&times;</CloseButton>
          <Form closeModal={() => setShowModal(false)} />
        </ModalContent>
      </ModalOverlay>
      <Chart>
        {books &&
          books.map((book) => (
            <Card key={book?.id}>
              <pre>{book?.id?.slice(0, 10)}...</pre>
              <pre>{book?.name}</pre>
              <p>{book?.author}</p>
              <button onClick={() => book?.id && deleteBookHandler(book?.id)}>
                Delete
              </button>
            </Card>
          ))}
      </Chart>
    </Wrapper>
  );
};

export default Todo;
const Wrapper = styled.div``;
const Chart = styled.div`
  max-height: 50vh;
  width: 100%;
  margin-top: 1rem;
  overflow-y: auto;
  background-color: #fff; /* Set the background to white */
  position: relative; /* Necessary for z-index to work */
  z-index: 1; /* Put the Chart "under" other content */
`;
const Card = styled.div`
  display: flex;
  padding: 0 4rem 0 0;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  color: #01112e;
`;

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  min-width: 30%;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  position: relative;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  color: #333;
`;
