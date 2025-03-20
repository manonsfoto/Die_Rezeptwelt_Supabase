import { FC } from "react";
import { Link } from "react-router-dom";
import { Recipe } from "../lib/supabase/types";
import HeartIcon from "./icons/HeartIcon";

interface CardProps {
  recipe: Recipe;
}

const Card: FC<CardProps> = ({ recipe }) => {
  return (
    <div className=" max-w-96 relative  ">
      {" "}
      <Link to={`/details/${recipe.id}`}>
        <figure className="rounded-3xl flex items-center justify-center  h-80 overflow-hidden ">
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
          <h2 className="text-2xl font-caprasimo">{recipe.name}</h2>
        </Link>
        <div className="flex items-center justify-between border-b-2 border-black">
          <Link to={`/details/${recipe.id}`}>
            <p className=" h-16 flex items-center pr-5 font-semibold leading-none ">
              {recipe.description}
            </p>
          </Link>
          <div className="border-l-2 border-black h-full p-5 ">
            <HeartIcon />
          </div>
        </div>
        <p className="font-gaegu absolute top-3 right-3 text-xl font-bold w-14 h-14 -rotate-12 bg-accent text-center flex items-center justify-center rounded-full">
          {recipe.rating}/5
        </p>
      </div>
    </div>
  );
};

export default Card;
