import { useState, useEffect } from "react";
import { Tables } from "../utils/supabase";
import { supabase } from "../utils/supabaseClient";
import NewCard from "./NewCard";

export type Recipe = Tables<"recipes">;

const NewRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNewRecipes = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("recipes")
          .select("*")
          .order("created_at", { ascending: false })
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

    fetchNewRecipes();
  }, []);

  return (
    <section className="flex flex-col justify-center items-center mb-16">
      <h1 className="font-bold text-3xl	my-12 ">Neueste Rezepte</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <NewCard recipe={recipe} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default NewRecipes;
