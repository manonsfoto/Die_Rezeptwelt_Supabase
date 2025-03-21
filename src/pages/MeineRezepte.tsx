import { useEffect } from "react";
import EmptyHero from "../components/EmptyHero";
import Card from "../components/Card";
import { useFavoritesStore } from "../store/favoritesStore";
import SkeletonCard from "../components/SkeletonCard";

const MeineRezepte = () => {
  const { favorites, isLoading, fetchFavorites } = useFavoritesStore();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <>
      <section className="flex-center flex-col  mb-16 w-full">
        <h1 className=" w-full my-12 pb-4 headline-1 border-b-2 border-black">
          Meine Rezepte
        </h1>
        {isLoading ? (
          <ul className="flex-center flex-row gap-4 flex-wrap">
            {[...Array(3)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </ul>
        ) : favorites.length > 0 ? (
          <ul className="flex flex-col gap-4 flex-wrap min-h-screen md:flex-row">
            {favorites.map((recipe) => (
              <li key={recipe.id}>
                <Card recipe={recipe} />
              </li>
            ))}
          </ul>
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
