import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase/supabaseClient";

import { Recipe } from "../lib/supabase/types";

import Card from "./Card";


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
    <section className="flex flex-col justify-center items-center mt-10 mb-16 ">
      <h1 className="text-3xl w-full my-12 pb-4 font-caprasimo border-b-2 border-black">
        Neueste Rezepte
      </h1>
      {loading ? (
        <div className="skeleton h-80 w-full"></div>
      ) : (
        <ul className="flex flex-row gap-4 flex-wrap justify-center items-center">
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <Card recipe={recipe} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default NewRecipes;
