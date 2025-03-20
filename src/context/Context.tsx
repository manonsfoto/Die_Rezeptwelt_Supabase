
import { createContext } from "react";
import { GroceryList } from "../lib/supabase/types";

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


