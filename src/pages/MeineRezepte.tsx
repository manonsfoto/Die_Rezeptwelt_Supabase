import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase/supabaseClient";
import { Recipe } from "../lib/supabase/types";


import EmptyHero from "../components/EmptyHero";
import Card from "../components/Card";


const MeineRezepte = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);


  useEffect(() => {
 

    const fetchFavorites = async () => {
      const { data, error } = await supabase
        .from("recipe_favorites")
        .select(`*,  recipes(*)`);

      if (error) {
        console.error("Fehler beim Laden der Rezepte:", error.message);
      } else {
        const mappedData = data.map((singleItem) => {
          return singleItem.recipes;
        });

        setFavoriteRecipes(mappedData);
      }
    };

    fetchFavorites();
  }, [ ]);

  return (
    <>
      <section className="flex flex-col justify-center items-center mb-16 w-full">
        <h1 className="text-3xl w-full my-12 pb-4 font-caprasimo border-b-2 border-black">
          Meine Rezepte
        </h1>
        {favoriteRecipes.length > 0 ? (
          <ul className="flex flex-col gap-4 flex-wrap min-h-screen md:flex-row">
            {favoriteRecipes.map((recipe) => (
              <li key={recipe.id}>
                <Card recipe={recipe} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyHero
            mainText="No favorite Recipes found"
            subText="When you click a 🩶 button on detailed recipes, it will appear here."
          />
        )}
      </section>
    </>
  );
};

export default MeineRezepte;
