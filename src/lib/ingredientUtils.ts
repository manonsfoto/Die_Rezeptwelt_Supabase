import { supabase } from "./supabase/supabaseClient";
import { Ingredient, RecipeIngredient } from "./supabase/types";

/**
 * Fetches all ingredients from the database
 * @returns Promise containing the ingredients array
 */
export const fetchIngredients = async (): Promise<Ingredient[]> => {
  try {
    const { data, error } = await supabase
      .from("ingredients")
      .select("*")
      .order("name");

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  } catch (err) {
    console.error("Fehler beim Laden der Zutaten:", err);
    throw err;
  }
};

/**
 * Adds a new ingredient to the database
 * @param name - The name of the ingredient
 * @param unit - The unit of the ingredient
 * @param additionalInfo - Optional additional information about the ingredient
 * @returns Promise containing the new ingredient
 */
export const addNewIngredient = async (
  name: string,
  unit: "g" | "ml" | "Stück" | "TL" | "EL" | "Prise" | "",
  additionalInfo: string
): Promise<Ingredient> => {
  if (!name.trim() || !unit.trim()) {
    throw new Error("Name und Einheit sind erforderlich");
  }

  try {
    // Unit must be one of the predefined values
    const newIngredient = {
      name: name.trim(),
      unit: unit.trim() as "g" | "ml" | "Stück" | "TL" | "EL" | "Prise",
      additional_info: additionalInfo.trim() || null,
    };

    const { data, error } = await supabase
      .from("ingredients")
      .insert(newIngredient)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      throw new Error("Zutat konnte nicht erstellt werden");
    }

    return data[0];
  } catch (err) {
    console.error("Fehler beim Erstellen der Zutat:", err);
    throw err;
  }
};

/**
 * Saves recipe ingredients to the database
 * @param recipeId - The ID of the recipe
 * @param ingredients - The ingredients to save
 */
export const saveRecipeIngredients = async (
  recipeId: string,
  ingredients: RecipeIngredient[]
): Promise<void> => {
  try {
    const recipeIngredientsToInsert = ingredients.map((ingredient) => ({
      recipe_id: recipeId,
      ingredient_id: ingredient.ingredient_id,
      quantity: ingredient.quantity,
    }));

    const { error } = await supabase
      .from("recipes_ingredients")
      .insert(recipeIngredientsToInsert);

    if (error) {
      throw new Error(`Fehler beim Speichern der Zutaten: ${error.message}`);
    }
  } catch (err) {
    console.error("Fehler beim Speichern der Zutaten:", err);
    throw err;
  }
};