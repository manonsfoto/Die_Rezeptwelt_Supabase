import { useEffect, useState } from "react";
import { Recipe } from "../lib/supabase/types";
import { supabase } from "../lib/supabase/supabaseClient";

import EmptyHero from "../components/EmptyHero";
import Card from "../components/Card";
import { useSearchParams } from "react-router-dom";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSearchResult = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("recipes")
          .select()
          .ilike("name", `%${searchQuery}%`);

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

    getSearchResult();
  }, [searchQuery]);

  return (
    <>
      {" "}
      <section className="flex flex-col justify-center items-center w-full">
        <h1 className="text-3xl w-full my-12 pb-4 font-caprasimo border-b-2 border-black">
          Search Results
        </h1>
        {loading ? (
          <div className="skeleton h-80 w-full"></div>
        ) : recipes.length > 0 ? (
          <ul className="flex flex-row gap-4 flex-wrap justify-center items-center">
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                <Card recipe={recipe} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyHero
            mainText={`Sorry, No results found for "${searchQuery}"`}
          />
        )}
      </section>
    </>
  );
};

export default SearchResult;
