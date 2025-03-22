import { useEffect, useState } from "react";
import { Recipe } from "../lib/supabase/types";
import EmptyHero from "../components/EmptyHero";
import Card from "../components/Card";
import { useSearchParams } from "react-router-dom";
import { searchRecipes } from "../lib/supabase/actions";
import SkeletonCard from "../components/SkeletonCard";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSearchResult = async () => {
      setLoading(true);
      try {
        const { data, error } = await searchRecipes(searchQuery);

        if (error) {
          console.error("Fehler beim Laden der Suchergebnisse:", error);
        } else {
          setRecipes(data);
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
      <section className="flex-center flex-col  max-w-7xl w-full">
        <h1 className="headline-1 w-full my-12 pb-4 border-b-2 border-black">
          Suchergebnisse
        </h1>
        {loading ? (
          <ul className="flex-center flex-row gap-4 flex-wrap  min-h-screen">
            {[...Array(6)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </ul>
        ) : recipes.length > 0 ? (
          <ul className="flex-center flex-row gap-4 flex-wrap ">
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                <Card recipe={recipe} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyHero
            mainText={`Keine Ergebnisse gefunden für "${searchQuery}"`}
          />
        )}
      </section>
    </>
  );
};

export default SearchResult;
