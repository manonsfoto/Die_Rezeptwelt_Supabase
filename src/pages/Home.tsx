import Greeting from "../components/Greeting";
import HomeHero from "../components/HomeHero";
import RecipeList from "../components/RecipeList";
import { fetchTopRecipes } from "../lib/supabase/actions";
import { useAuthStore } from "../store/authStore";

const Home = () => {
  const { user } = useAuthStore();
  return (
    <>
      {user && <Greeting />}
      <HomeHero />
      <RecipeList
      title="Die beliebtesten Rezepte"
      fetchRecipes={fetchTopRecipes}
    />
    </>
  );
};

export default Home;
