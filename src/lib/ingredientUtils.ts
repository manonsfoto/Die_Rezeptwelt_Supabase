import { supabase } from "./supabase/supabaseClient";
import { Ingredient, RecipeIngredient } from "./supabase/types";


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


export const addNewIngredient = async (
  name: string,
  unit: "g" | "ml" | "Stück" | "TL" | "EL" | "Prise" | "",
  additionalInfo: string
): Promise<Ingredient> => {
  if (!name.trim() || !unit.trim()) {
    throw new Error("Name und Einheit sind erforderlich");
  }

  try {
  
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