import { useState } from "react";
import styled from "styled-components";
import { useCrudBooks } from "../../hooks/useCrudBooks";

interface IProps {
  closeModal: () => void;
  //   addBook: (data: { name: string; author: string }) => void;
}
const Form: React.FC<IProps> = ({ closeModal }) => {
  const { addBookHandler } = useCrudBooks();

  const [bookName, setBookName] = useState<string>("");
  const [bookAuthor, setBookAuthor] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookAuthor.length > 0 || bookName.length > 0) {
      // passed the value here...
      addBookHandler({ name: bookName, author: bookAuthor });
      setBookName("");
      setBookAuthor("");
      setTimeout(() => closeModal(), 500);
    }
  };

  return (
    <FormWrapper>
      <h5>Add A Book</h5>{" "}
      <form onSubmit={handleSubmit}>
        <section>
          <label htmlFor="">Book Name</label>
          <input
            type="text"
            placeholder="Enter Book Name"
            value={bookName}
            required
            onChange={(e) => setBookName(e.target.value)}
          />
        </section>
        <section>
          <label htmlFor="">Book Name</label>
          <input
            type="text"
            placeholder="Enter Book Name"
            value={bookAuthor}
            required
            onChange={(e) => setBookAuthor(e.target.value)}
          />
        </section>
        <button type="submit">Add Book</button>
      </form>
    </FormWrapper>
  );
};
export default Form;

const FormWrapper = styled.main`
  color: rgb(0, 14, 27);

  h2 {
  }

  form {
    width: 100%;
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;

    section {
      display: flex;
      gap: 1rem;
      margin: 0 12px;
    }

    label {
      font-size: small;
    }

    button {
      width: 100%;
    }
  }
`;
