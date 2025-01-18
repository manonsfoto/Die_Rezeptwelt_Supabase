import { useContext } from "react";
import { SearchInputContext } from "../context/Context";

const SearchResult = () => {
  const { searchInput } = useContext(SearchInputContext);
  console.log("search Input;", searchInput);

  return (
    <>
      <h1>Result!</h1>
    </>
  );
};

export default SearchResult;
