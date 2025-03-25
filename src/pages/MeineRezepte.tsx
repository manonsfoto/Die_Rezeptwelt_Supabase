import { useEffect, useState } from "react";
import EmptyHero from "../components/EmptyHero";
import Card from "../components/Card";
import { useFavoritesStore } from "../store/favoritesStore";
import SkeletonCard from "../components/SkeletonCard";
import { sortRecipes, SortType } from "../lib/sorting";
import SortingBar from "../components/SortingBar";
import SkeletonSortingBar from "../components/SkeletonSortingBar";

const MeineRezepte = () => {
  const { favorites, isLoading, fetchFavorites } = useFavoritesStore();
  const [sortType, setSortType] = useState<SortType>("asc");

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const sortedFavorites = sortRecipes(favorites, sortType);

  return (
    <>
      <section className="max-w-7xl w-full">
        <h1 className="w-full mt-12 pb-4 headline-1 border-b-2 border-black">
          Meine Rezepte
        </h1>

        {isLoading ? (
          <>
            <SkeletonSortingBar />
            <ul className="flex justify-center gap-4 flex-wrap min-h-screen">
              {[...Array(3)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </ul>
          </>
        ) : favorites.length > 0 ? (
          <>
            <SortingBar
              sortType={sortType}
              setSortType={setSortType}
          
            />

            <ul className="flex justify-center gap-4 flex-wrap min-h-screen">
              {sortedFavorites.map((recipe) => (
                <li key={recipe.id}>
                  <Card recipe={recipe} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <EmptyHero
            mainText="Keine Lieblingsrezepte gefunden"
            subText="Wenn du auf ein 🩶 bei einem Rezept klickst, erscheint es hier."
          />
        )}
      </section>
    </>
  );
};

export default MeineRezepte;
