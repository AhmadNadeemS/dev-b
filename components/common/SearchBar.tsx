import { FC } from "react";

interface Props {}

const SearchBar: FC<Props> = (props): JSX.Element => {
  return (
    <input
      type="text"
      placeholder="search"
      className="border-2 border-secondary-dark p-2 rounded outline-none bg-transparent dark:text-primary text-primary-dark
              focus:border-primary-dark
              dark:focus:border-primary transition
        "
    />
  );
};

export default SearchBar;
