import { useEffect } from "react";
import EmptyHero from "../components/EmptyHero";
import Card from "../components/Card";
import { useFavoritesStore } from "../store/favoritesStore";

const MeineRezepte = () => {
  const { favorites, isLoading, fetchFavorites } = useFavoritesStore();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <>
      <section className="flex flex-col justify-center items-center mb-16 w-full">
        <h1 className="text-3xl w-full my-12 pb-4 font-caprasimo border-b-2 border-black">
          Meine Rezepte
        </h1>
        {isLoading ? (
          <div className="skeleton h-80 w-full"></div>
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
