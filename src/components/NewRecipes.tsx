import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import NewCard from "./card/NewCard";
import { Recipe } from "../utils/types";
import LoaderNewRecipes from "./loader/LoaderNewRecipes";

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
    <section className="flex flex-col justify-center items-center my-16">
      <h1 className="font-bold text-3xl	my-12 ">Neueste Rezepte</h1>
      {loading ? (
        <LoaderNewRecipes />
      ) : (
        <ul className="flex flex-col gap-4 flex-wrap">
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
