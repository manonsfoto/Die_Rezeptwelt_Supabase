import { Tables } from "./supabaseDatabase";

export type Recipe = Tables<"recipes">;

export type JoinedRecipe = Tables<"recipes"> & {
  categories: Pick<Tables<"categories">, "name">;
  recipes_ingredients: (Pick<Tables<"recipes_ingredients">, "quantity"> & {
    ingredients: Pick<
      Tables<"ingredients">,
      "id" | "name" | "unit" | "additional_info"
    >;
  })[];
};

export type InsertRecipeFavorites = Pick<
  Tables<"recipe_favorites">,
  "user_id" | "recipe_id"
>;

export type GroceryList = Tables<"grocerylist_ingredients"> & {
  ingredients: Pick<Tables<"ingredients">, "name" | "unit">;
};

export type GroceryItem = Pick<
  {
    ingredient_id: string;
    quantity: number | null;
    recipe_id: string;
  },
  "quantity"
> & {
  ingredients: Pick<
    Tables<"ingredients">,
    "id" | "name" | "unit" | "additional_info"
  >;
};
