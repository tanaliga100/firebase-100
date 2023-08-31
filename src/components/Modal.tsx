import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import styled from "styled-components";

interface IData {
  email: string;
  password: string;
}

const Modal = () => {
  const [formData, setFormData] = useState<IData>({
    email: "",
    password: "",
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData: IData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Perform form submission or other actions here
    console.log("Form Data:", formData);
  }

  return (
    <Wrapper>
      <form action="" onSubmit={handleSubmit}>
        <section>
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            name="email"
            id=""
            placeholder="email here..."
          />
        </section>
        <section>
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            name="password"
            id=""
            placeholder="password here..."
          />
        </section>
      </form>
      <button>
        <FcGoogle /> Sign in With Google
      </button>
    </Wrapper>
  );
};
export default Modal;

const Wrapper = styled.div`
  width: 20%;
  gap: 1rem;
  background-color: tan;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem;
  margin: 0 auto;

  form {
    display: flex;
    justify-content: space-around;
    gap: 1rem;
    padding: 0.3rem;
    input {
      padding: 0.5rem;
    }
  }
  button {
    padding: 1rem;
  }
`;
