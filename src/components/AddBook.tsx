import { addDoc } from "firebase/firestore";
import { FormEvent, useState } from "react";
import styled from "styled-components";
import { bandsRef } from "../config/firebase.config";

const AddBook = () => {
  const [formData, setFormData] = useState({
    name: "",
    founded: 1990,
    grammy: false,
    members: 0,
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData({ name: "", founded: 0, grammy: false, members: 0 });

    // logic
    const { name, founded, grammy, members } = formData;
    if (!name || !founded || !grammy || !members) {
      alert("All Fields are required");
      return;
    }
    await addDoc(bandsRef, formData);
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
          <label htmlFor="">Band Name</label>
          <input
            type="text"
            name="name"
            id=""
            placeholder="Add Band Name"
            onChange={handleChange}
            value={formData.name}
          />
          <label htmlFor="">Founded</label>
          <input
            type="number"
            name="founded"
            id=""
            placeholder="Date Founded"
            onChange={handleChange}
            value={formData.founded}
          />{" "}
          <label htmlFor="">has Grammy</label>
          <input
            type="checkbox"
            name="grammy"
            id=""
            placeholder="Win a Grammy"
            onChange={handleChange}
            checked={formData.grammy as boolean}
          />
          <label htmlFor="">Members</label>
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
  padding: 2px 3rem;
  flex-direction: column;
  gap: 0.3rem;

  button {
    color: teal;
    font-size: 1rem;
    padding: 1rem;
    width: 40%;
    margin: 0 auto;
  }
`;
