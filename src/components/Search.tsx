import React from "react";

interface IProps {
  searchTerm?: string;
  setSearchTerm?: (searchTerm: string) => void | undefined;
  placeholder: string;
}

const Search: React.FC<IProps> = ({
  searchTerm,
  setSearchTerm,
  placeholder,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.currentTarget.value;
    if (setSearchTerm) {
      setSearchTerm(newSearchTerm);
    }
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={handleChange}
    />
  );
};
export default Search;
