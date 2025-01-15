import { Tables } from "./supabase";

export type Recipe = Tables<"recipes">;
export type Categories = Tables<"categories">;
export type Recipes_ingredients = Tables<"recipes_ingredients">;
export type Ingredients = Tables<"ingredients">;

export type JoinedRecipe = Tables<"recipes"> & {
  categories: Pick<Tables<"categories">, "name">;
  recipes_ingredients: (Pick<Tables<"recipes_ingredients">, "quantity"> & {
    ingredients: Pick<
      Tables<"ingredients">,
      "name" | "unit" | "additional_info"
    >;
  })[];
};
