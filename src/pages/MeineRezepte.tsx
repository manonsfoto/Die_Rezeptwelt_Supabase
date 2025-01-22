import { useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Recipe } from "../utils/types";
import { UserContext } from "../context/Context";
import NewCard from "../components/card/NewCard";

const MeineRezepte = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("recipe_favorites")
          .select(`*,  recipes(*)`)
          .eq("user_id", user.id);

        if (error) {
          console.error("Fehler beim Laden der Rezepte:", error.message);
        } else {
          const mappedData = data.map((singleItem) => {
            return singleItem.recipes;
          });

          setFavoriteRecipes(mappedData);
        }
      }
    };

    fetchFavorites();
  }, [user]);

  return (
    <>
      <section className="flex flex-col justify-center items-center mb-16">
        <h1 className="font-bold text-3xl	my-12 ">Meine Rezepte 🥰</h1>
        {
          <ul className="flex flex-col gap-4 flex-wrap">
            {favoriteRecipes.map((recipe) => (
              <li key={recipe.id}>
                <NewCard recipe={recipe} />
              </li>
            ))}
          </ul>
        }
      </section>
    </>
  );
};

export default MeineRezepte;
