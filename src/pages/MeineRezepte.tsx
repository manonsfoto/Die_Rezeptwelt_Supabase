import { useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Recipe } from "../utils/types";
import { UserContext } from "../context/Context";
import NewCard from "../components/card/NewCard";

import Hero from "../components/Hero";
import ZumLogin from "../components/ZumLogin";

const MeineRezepte = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
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
      }
    };

    fetchFavorites();
  }, [user]);

  return (
    <>
      {user ? (
        <>
          {" "}
          <Hero
            text={
              "Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft und erleben Sie unvergessliche Momente bei Tisch."
            }
            imgUrl={
              "https://images.unsplash.com/photo-1577308856961-8e9ec50d0c67?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
          <section className="flex flex-col justify-center items-center mb-16">
            <h1 className="font-bold text-3xl	my-12 ">Meine Rezepte 🥰</h1>
            {favoriteRecipes.length > 0 ? (
              <ul className="flex flex-col gap-4 flex-wrap min-h-96">
                {favoriteRecipes.map((recipe) => (
                  <li key={recipe.id}>
                    <NewCard recipe={recipe} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col justify-center items-center gap-4 my-36">
                {" "}
                <p className="text-2xl font-bold text-gray-600">
                  No favorite Recipes found
                </p>
                <p className="texl-xl text-gray-400">
                  When you click a 🩶 button on detailed recipes, it will appear
                  here.
                </p>
              </div>
            )}
          </section>
        </>
      ) : (
        <ZumLogin />
      )}
    </>
  );
};

export default MeineRezepte;
