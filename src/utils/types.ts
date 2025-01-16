import { Tables } from "./supabase";

export type Recipe = Tables<"recipes">;

export type JoinedRecipe = Tables<"recipes"> & {
  categories: Pick<Tables<"categories">, "name">;
  recipes_ingredients: (Pick<Tables<"recipes_ingredients">, "quantity"> & {
    ingredients: Pick<
      Tables<"ingredients">,
      "name" | "unit" | "additional_info"
    >;
  })[];
};
