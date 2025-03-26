import StyledLinks from "../components/StyledLinks";
import RecipeList from "../components/RecipeList";
import {
  fetchNewRecipes,
  fetchTopRecipes,
  searchRecipes,
} from "../lib/supabase/actions";
import { useState, useEffect } from "react";
import SortingBar from "../components/SortingBar";
import { SortType, sortRecipes } from "../lib/sorting";
import { Recipe } from "../lib/supabase/types";
import Card from "../components/Card";

const Rezepte = () => {
  const [sortType, setSortType] = useState<SortType>("rating");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "5162be92-4ab3-4cdf-ba2e-2d9a0e10943f"
  );
  const [categoryRecipes, setCategoryRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategoryRecipes = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await searchRecipes("", selectedCategory);

        if (error) {
          console.error("Fehler beim Laden der Rezepte:", error);
          setCategoryRecipes([]);
        } else {
          const sortedRecipes = sortRecipes(data, sortType);
          setCategoryRecipes(sortedRecipes);
        }
      } catch (err) {
        console.error("Unerwarteter Fehler:", err);
        setCategoryRecipes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryRecipes();
  }, [selectedCategory, sortType]);

  return (
    <section className="max-w-7xl w-full">
      <StyledLinks bgColor="bg-base-100" />

      <RecipeList
        title="Neueste Rezepte"
        fetchRecipes={fetchNewRecipes}
        className="mt-10 mb-16"
      />
      <RecipeList
        title="Die beliebtesten Rezepte"
        fetchRecipes={fetchTopRecipes}
        className="mb-16"
      />

      <section className="mt-16 mb-8">
        <h2 className="headline-1 w-full mt-8 pb-4 border-b-2 border-black">
          Rezepte nach Kategorien
        </h2>

        <SortingBar
          sortType={sortType}
          setSortType={setSortType}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {isLoading ? (
          <div className="flex-center mt-8">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        ) : categoryRecipes.length > 0 ? (
          <ul className="flex-center flex-row gap-4 flex-wrap mt-8">
            {categoryRecipes.map((recipe) => (
              <li key={recipe.id}>
                <Card recipe={recipe} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center p-8 mt-8">
            <p className="text-3xl md:text-5xl  font-caprasimo">
              Keine Rezepte in dieser Kategorie gefunden.
            </p>
          </div>
        )}
      </section>
    </section>
  );
};

export default Rezepte;
