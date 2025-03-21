import StyledLinks from "../components/StyledLinks";
import RecipeList from "../components/RecipeList";
import { fetchNewRecipes, fetchTopRecipes } from "../lib/supabase/actions";

const Rezepte = () => {
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
      />
    </section>
  );
};

export default Rezepte;
