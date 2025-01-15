import { FC } from "react";
import { Link } from "react-router-dom";
import { Recipe } from "../../utils/types";

interface NewCardProps {
  recipe: Recipe;
}

const NewCard: FC<NewCardProps> = ({ recipe }) => {
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure className=" w-52 h-52 ">
        {recipe.imageUrl && (
          <img className=" h-full" src={recipe.imageUrl} alt={recipe.name} />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{recipe.name}</h2>
        <p>{recipe.description}</p>
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

export default NewCard;
