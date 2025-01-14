import { useState, useEffect } from "react";
import { Tables } from "../utils/supabase";
import { supabase } from "../utils/supabaseClient";
import TopCard from "./TopCard";

export type Recipe = Tables<"recipes">;

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTopRecipes = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("recipes")
          .select("*")
          .order("rating", { ascending: false })
          .limit(3);

        if (error) {
          console.error("Fehler beim Laden der Rezepte:", error.message);
        } else {
          setRecipes(data || []);
        }
      } catch (err) {
        console.error("Unerwarteter Fehler:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRecipes();
  }, []);

  return (
    <div>
      <h1>Die beliebtesten Rezepte</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <TopCard recipe={recipe} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Recipes;
