import { FC } from "react";
import { Link } from "react-router-dom";
import { Recipe } from "../lib/supabase/types";
import HeartIcon from "./icons/HeartIcon";
import { useFavoritesStore } from "../store/favoritesStore";
import { useAuthStore } from "../store/authStore";

interface CardProps {
  recipe: Recipe;
}

const Card: FC<CardProps> = ({ recipe }) => {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { user } = useAuthStore();
  const isFav = isFavorite(recipe.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) {
      toggleFavorite(recipe);
    }
  };

  return (
    <div className="max-w-96 relative">
      {" "}
      <Link to={`/details/${recipe.id}`}>
        <figure className="rounded-3xl flex-center  h-80 overflow-hidden ">
          {recipe.imageUrl && (
            <img
              className="w-full h-full object-cover "
              src={recipe.imageUrl}
              alt={recipe.name}
            />
          )}
        </figure>{" "}
      </Link>
      <div className="pt-6">
        <Link to={`/details/${recipe.id}`}>
          <h2 className="headline-2">{recipe.name}</h2>
        </Link>
        <div className="flex-between border-b-2 border-black">
          <Link to={`/details/${recipe.id}`}>
            <p className=" h-16 flex items-center pr-5 font-semibold leading-none ">
              {recipe.description}
            </p>
          </Link>
          <div
            className="border-l-2 border-black h-full p-5 cursor-pointer"
            onClick={handleFavoriteClick}
          >
            <HeartIcon isFilled={isFav} />
          </div>
        </div>
        <p className="font-gaegu absolute top-3 right-3 text-xl font-bold w-14 h-14 -rotate-12 bg-accent text-center flex-center rounded-full">
          {recipe.rating}/5
        </p>
      </div>
    </div>
  );
};

export default Card;
