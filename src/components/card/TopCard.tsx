import { FC } from "react";
import { Link } from "react-router-dom";
import { Recipe } from "../../utils/types";

interface TopCardProps {
  recipe: Recipe;
}

const TopCard: FC<TopCardProps> = ({ recipe }) => {
  return (
    <Link to={`/details/${recipe.id}`}>
      {" "}
      <div className=" w-96 relative ">
        <figure className="rounded-3xl flex items-center justify-center  h-80 overflow-hidden ">
          {recipe.imageUrl && (
            <img
              className="w-full h-full object-cover "
              src={recipe.imageUrl}
              alt={recipe.name}
            />
          )}
        </figure>
        <div className="pt-6">
          <h2 className="text-3xl font-caprasimo">{recipe.name}</h2>
          <div className="flex items-center justify-between border-b-2 border-black">
            <p className="h-16 pt-2 pr-5 font-semibold leading-none ">
              {recipe.description}
            </p>
            <p className="border-l-2 border-black h-full p-5 text-xl">🖤</p>
          </div>
          <p className="font-gaegu absolute top-3 right-3 text-xl font-bold w-14 h-14 -rotate-12 bg-accent text-center flex items-center justify-center rounded-full">
            {recipe.rating}/5
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TopCard;
