import { useState } from "react";
import styled from "styled-components";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchFn = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    console.log("from component hook", searchTerm);
  };
  return (
    <FieldInput>
      <input
        type="text"
        placeholder="Search for the book"
        value={searchTerm}
        onChange={searchFn}
      />
    </FieldInput>
  );
};

const FieldInput = styled.div`
  input {
    padding: 0.3rem 1rem;
  }
`;
