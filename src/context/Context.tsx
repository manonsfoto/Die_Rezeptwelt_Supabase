import { User } from "@supabase/supabase-js";
import { createContext } from "react";

interface ISearchInputContext {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}
export const SearchInputContext = createContext<ISearchInputContext>(null!);

interface IRefreshContext {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}
export const RefreshContext = createContext<IRefreshContext>(null!);

interface IUserContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
export const UserContext = createContext<IUserContext>(null!);
