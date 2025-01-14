import { useState, useEffect } from "react";
import { Tables } from "../utils/supabase";
import { supabase } from "../utils/supabaseClient";
import TopCard from "./TopCard";

export type Recipe = Tables<"recipes">;

const TopRecipes = () => {
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
    <section className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-3xl	my-12 ">Die beliebtesten Rezepte</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="flex flex-row gap-4">
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <TopCard recipe={recipe} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default TopRecipes;
