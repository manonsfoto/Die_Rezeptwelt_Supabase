import { FC } from "react";
import { Link } from "react-router-dom";
import { Recipe } from "../../utils/types";

interface TopCardProps {
  recipe: Recipe;
}

const TopCard: FC<TopCardProps> = ({ recipe }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="h-52">
        {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.name} />}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{recipe.name}</h2>
        <p className="h-16">{recipe.description}</p>
        <p>⭐{recipe.rating}/5</p>

        <div className="card-actions justify-start">
          <Link to={`/details/${recipe.id}`}>
            {" "}
            <button className="btn btn-primary">Zum Rezept</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopCard;
