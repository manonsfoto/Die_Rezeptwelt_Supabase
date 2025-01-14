import { FC } from "react";
import { Recipe } from "./Recipes";

interface NewCardProps {
  recipe: Recipe;
}

const NewCard: FC<NewCardProps> = ({ recipe }) => {
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure>
        {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.name} />}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{recipe.name}</h2>
        <p>{recipe.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Zum Rezept</button>
        </div>
      </div>
    </div>
  );
};

export default NewCard;
