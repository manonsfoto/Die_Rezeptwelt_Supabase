import { supabase } from "./supabaseClient";
import { Recipe, GroceryItem, JoinedRecipe } from "./types";
import { signupSchema } from "../validation";
import { User } from "@supabase/supabase-js";

export type SignUpData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
};

export const fetchNewRecipes = async (
  limit: number = 3
): Promise<{ data: Recipe[] | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase
      .from("recipes")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Fehler beim Laden der Rezepte:", error.message);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.error("Unerwarteter Fehler:", err);
    return { data: null, error: err as Error };
  }
};

export const fetchTopRecipes = async (
  limit: number = 3
): Promise<{ data: Recipe[] | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase
      .from("recipes")
      .select("*")
      .order("rating", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Fehler beim Laden der Rezepte:", error.message);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.error("Unerwarteter Fehler:", err);
    return { data: null, error: err as Error };
  }
};

export const fetchSingleRecipe = async (
  recipeId: string
): Promise<{ data: JoinedRecipe | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase
      .from("recipes")
      .select(
        `*,
        categories(name),
        recipes_ingredients(
          quantity,
          ingredients(id,name, unit, additional_info)
        )`
      )
      .eq("id", recipeId)
      .single();

    if (error) {
      console.error("Fehler beim Laden des Rezepts:", error.message);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.error("Unerwarteter Fehler:", err);
    return { data: null, error: err as Error };
  }
};

export const deleteGroceryItem = async (
  ingredient_id: string
): Promise<{ success: boolean; error: Error | null }> => {
  try {
    const { error } = await supabase
      .from("grocerylist_ingredients")
      .delete()
      .eq("ingredient_id", ingredient_id);

    if (error) {
      console.error("Fehler beim Löschen des Eintrags:", error.message);
      return { success: false, error };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error("Unerwarteter Fehler:", err);
    return { success: false, error: err as Error };
  }
};

export const updateGroceryItemQuantity = async (
  ingredient_id: string,
  action: "increase" | "decrease",
  currentQuantity: number
): Promise<{ success: boolean; error: Error | null }> => {
  try {
    const newQuantity =
      action === "increase"
        ? currentQuantity + 1
        : Math.max(1, currentQuantity - 1);

    const { error } = await supabase
      .from("grocerylist_ingredients")
      .update({ quantity: newQuantity })
      .eq("ingredient_id", ingredient_id);

    if (error) {
      console.error("Fehler beim Aktualisieren der Menge:", error.message);
      return { success: false, error };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error("Unerwarteter Fehler:", err);
    return { success: false, error: err as Error };
  }
};

export const updateGroceryItemStatus = async (
  ingredient_id: string,
  completed: boolean
): Promise<{ success: boolean; error: Error | null }> => {
  try {
    const { error } = await supabase
      .from("grocerylist_ingredients")
      .update({ completed })
      .eq("ingredient_id", ingredient_id);

    if (error) {
      console.error("Fehler beim Aktualisieren des Status:", error.message);
      return { success: false, error };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error("Unerwarteter Fehler:", err);
    return { success: false, error: err as Error };
  }
};

export const clearGroceryList = async (
  grocerylist_id: string
): Promise<{ success: boolean; error: Error | null }> => {
  try {
    const { error } = await supabase
      .from("grocerylist_ingredients")
      .delete()
      .eq("grocerylist_id", grocerylist_id);

    if (error) {
      console.error("Fehler beim Leeren der Einkaufsliste:", error.message);
      return { success: false, error };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error("Unerwarteter Fehler:", err);
    return { success: false, error: err as Error };
  }
};

export const addToGroceryList = async (
  item: GroceryItem,
  userId: string
): Promise<{ success: boolean; error: Error | null }> => {
  if (!userId) {
    return { success: false, error: new Error("Kein Benutzer angemeldet") };
  }

  try {
    const { data, error } = await supabase
      .from("grocerylists")
      .select()
      .eq("user_id", userId);

    if (error) {
      console.error(error);
      return { success: false, error };
    }

    if (!data) {
      return { success: false, error: new Error("Keine Daten gefunden") };
    }

    if (data.length > 0) {
      const { error } = await supabase.from("grocerylist_ingredients").insert({
        grocerylist_id: data[0].id,
        user_id: userId,
        ingredient_id: item.ingredients.id,
      });

      if (error) {
        console.error(error);
        return { success: false, error };
      }

      return { success: true, error: null };
    } else {
      const { data: newListData, error: createError } = await supabase
        .from("grocerylists")
        .insert({ user_id: userId })
        .select();

      if (createError) {
        console.error(createError);
        return { success: false, error: createError };
      }

      if (!newListData || newListData.length === 0) {
        return {
          success: false,
          error: new Error("Fehler beim Erstellen der Einkaufsliste"),
        };
      }

      const { error: addIngredientError } = await supabase
        .from("grocerylist_ingredients")
        .insert({
          grocerylist_id: newListData[0].id,
          user_id: userId,
          ingredient_id: item.ingredients.id,
        });

      if (addIngredientError) {
        console.error(addIngredientError);
        return { success: false, error: addIngredientError };
      }

      return { success: true, error: null };
    }
  } catch (err) {
    console.error("Unerwarteter Fehler:", err);
    return { success: false, error: err as Error };
  }
};

export const searchRecipes = async (
  searchQuery: string,
  categoryId?: string
): Promise<{ data: Recipe[]; error: Error | null }> => {
  try {
    let query = supabase.from("recipes").select(`*, categories(id, name)`);

    if (searchQuery) {
      query = query.ilike("name", `%${searchQuery}%`);
    }

    if (categoryId) {
      query = query.eq("category_id", categoryId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Fehler beim Laden der Rezepte:", error.message);
      return { data: [], error };
    }

    return { data: data || [], error: null };
  } catch (err) {
    console.error("Unerwarteter Fehler:", err);
    return { data: [], error: err as Error };
  }
};

export const signUp = async (
  userData: SignUpData
): Promise<{
  success: boolean;
  user: User | null;
  error: Error | null;
}> => {
  try {
    const { email, password, firstName, lastName, confirmPassword } = userData;

    const validationResult = signupSchema.safeParse({
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
    });

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();
      const errorMessage = Object.values(formattedErrors)
        .filter(
          (error) =>
            typeof error === "object" &&
            (error as unknown as { _errors: string[] })._errors
        )
        .map((error) => (error as unknown as { _errors: string[] })._errors[0])
        .join(", ");

      return {
        success: false,
        user: null,
        error: new Error(errorMessage || "Validierungsfehler"),
      };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      console.error("Fehler bei der Registrierung:", error.message);
      return { success: false, user: null, error };
    }

    return { success: true, user: data.user, error: null };
  } catch (err) {
    console.error("Unerwarteter Fehler bei der Registrierung:", err);
    return { success: false, user: null, error: err as Error };
  }
};
