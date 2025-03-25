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

export const categories = [
  { id: "", name: "Alle Kategorien" },
  { id: "5162be92-4ab3-4cdf-ba2e-2d9a0e10943f", name: "Vorspeise" },
  { id: "4e29dd29-d50b-4f8b-8120-4d0487f76b96", name: "Hauptspeise" },
  { id: "933f18c3-052b-4989-9f74-4d692fda1473", name: "Dessert" },
  { id: "891d36b2-07ee-4afe-ac06-996fd4c793ed", name: "Frühstück" },
  { id: "12595269-31df-4a3a-b3c7-7494fe5661c5", name: "Getränke" },
  { id: "53085e10-fe7a-4f4b-8238-2933a63783cd", name: "Snack" },
];
