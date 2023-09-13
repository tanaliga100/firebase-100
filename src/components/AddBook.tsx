import { FormEvent, useState } from "react";
import styled from "styled-components";
import { addBands } from "./Services";

export interface IBandsData {
  name: string;
  id?: string;
  founded: number;
  grammy: boolean;
  members: number;
}

const AddBook = () => {
  const [formData, setFormData] = useState({
    name: "",
    founded: 1990,
    grammy: false,
    members: 0,
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // logic
    const { name, founded, grammy, members } = formData;
    if (!name || !founded || !grammy || !members) {
      alert("All Fields are required");
      return;
    }
    // handle submit
    await addBands(formData);
    setFormData({ name: "", founded: 0, grammy: false, members: 0 });
    setTimeout(() => {
      alert("Bands Added");
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <Form>
          <input
            type="text"
            name="name"
            id=""
            placeholder="Add Band Name"
            onChange={handleChange}
            value={formData.name}
          />
          <input
            type="number"
            name="founded"
            id=""
            placeholder="Date Founded"
            onChange={handleChange}
            value={formData.founded}
          />
          <input
            type="checkbox"
            name="grammy"
            id=""
            placeholder="Win a Grammy"
            onChange={handleChange}
            checked={formData.grammy as boolean}
          />
          <input
            type="number"
            name="members"
            id=""
            placeholder="Consisting of..."
            onChange={handleChange}
            value={formData.members}
          />
          <button>Add Band</button>
        </Form>
      </form>
    </>
  );
};
export default AddBook;

const Form = styled.div`
  display: flex;
  width: 50%;
  padding: 2px 3rem;
  padding-top: 1rem;
  margin: 0 auto;
  flex-direction: column;
  gap: 0.3rem;

  input {
    padding: 0.5rem;
  }

  button {
    color: teal;
    font-size: 1rem;
    padding: 1rem;
    width: 40%;
    margin: 0 auto;
  }
`;
