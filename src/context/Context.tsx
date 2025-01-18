import { createContext } from "react";
interface ISearchInputContext {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}
export const SearchInputContext = createContext<ISearchInputContext>(null!);
