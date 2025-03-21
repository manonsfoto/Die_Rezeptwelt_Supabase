import { useState, useEffect } from "react";
import { Recipe } from "../lib/supabase/types";
import Card from "./Card";

type RecipeListProps = {
  title: string;
  fetchRecipes: (limit?: number) => Promise<{ data: Recipe[] | null; error: Error | null }>;
  className?: string;
  limit?: number;
};

const RecipeList = ({ title, fetchRecipes, className = "", limit = 3 }: RecipeListProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadRecipes = async () => {
      setLoading(true);
      try {
        const { data, error } = await fetchRecipes(limit);

        if (error) {
          console.error("Fehler beim Laden der Rezepte:", error);
        } else {
          setRecipes(data || []);
        }
      } catch (err) {
        console.error("Unerwarteter Fehler:", err);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, [fetchRecipes, limit]);

  return (
    <section className={`flex-center flex-col  ${className}`}>
      <h1 className="headline-1 w-full my-12 pb-4  border-b-2 border-black">
        {title}
      </h1>
      {loading ? (
        <div className="skeleton h-80 w-full"></div>
      ) : (
        <ul className="flex-center flex-row gap-4 flex-wrap ">
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <Card recipe={recipe} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default RecipeList;