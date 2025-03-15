import { User } from "@supabase/supabase-js";
import { createContext } from "react";
import { GroceryList } from "../utils/types";

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

interface IGroceryListContext {
  groceryList: GroceryList[] | null;
  setGroceryList: React.Dispatch<React.SetStateAction<GroceryList[] | null>>;
}
export const GroceryListContext = createContext<IGroceryListContext>(null!);

interface IRefreshGroceryListContext {
  refreshGroceryList: boolean;
  setRefreshGroceryList: React.Dispatch<React.SetStateAction<boolean>>;
}
export const RefreshGroceryListContext =
  createContext<IRefreshGroceryListContext>(null!);

interface ISessionContext {
  session: {
    isLoading: boolean;
    isAuthenticated: boolean;
  };
  setSession: React.Dispatch<
    React.SetStateAction<{
      isLoading: boolean;
      isAuthenticated: boolean;
    }>
  >;
}
export const SessionContext = createContext<ISessionContext>(null!);
