import { useEffect, useState } from "react";
import { Recipe } from "../lib/supabase/types";
import EmptyHero from "../components/EmptyHero";
import Card from "../components/Card";
import { useSearchParams } from "react-router-dom";
import { searchRecipes } from "../lib/supabase/actions";
import SkeletonCard from "../components/SkeletonCard";
import { sortRecipes, SortType } from "../lib/sorting";
import SortingBar from "../components/SortingBar";
import SkeletonSortingBar from "../components/SkeletonSortingBar";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortType, setSortType] = useState<SortType>("asc");

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

  const sortedRecipes: Recipe[] = sortRecipes(recipes, sortType);

  return (
    <>
      {" "}
      <section className="flex-center flex-col  max-w-7xl w-full">
        <h1 className="headline-1 w-full mt-12 pb-4 border-b-2 border-black">
          Suchergebnisse
        </h1>
        {loading ? (<>
          <SkeletonSortingBar />
          <ul className="flex justify-center  flex-row gap-4 flex-wrap  min-h-screen">
            {[...Array(6)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </ul></>
        ) : recipes.length > 0 ? (
          <>
            <SortingBar sortType={sortType} setSortType={setSortType} />

            <ul className="flex justify-center  flex-row gap-4 flex-wrap min-h-screen">
              {sortedRecipes.map((recipe) => (
                <li key={recipe.id} className="h-fit">
                  <Card recipe={recipe} />
                </li>
              ))}
            </ul>
          </>
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
