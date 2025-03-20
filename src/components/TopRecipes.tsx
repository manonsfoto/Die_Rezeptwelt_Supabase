import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase/supabaseClient";

import { Recipe } from "../lib/supabase/types";

import Card from "./Card";


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
      <h1 className=" text-3xl w-full my-12 pb-4 font-caprasimo border-b-2 border-black ">
        Die beliebtesten Rezepte
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

export default TopRecipes;
