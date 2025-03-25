import { Recipe } from "./supabase/types";

export type SortType = "asc" | "desc" | "rating";

export const sortRecipes = (recipes: Recipe[], sortType: SortType) => {
  return [...recipes].sort((a, b) => {
    if (sortType === "asc") {
      return a.name.localeCompare(b.name, "de");
    } else if (sortType === "desc") {
      return b.name.localeCompare(a.name, "de");
    } else {
         return (b.rating || 0) - (a.rating || 0);
    }
  });
};