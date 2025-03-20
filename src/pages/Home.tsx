import Greeting from "../components/Greeting";
import HomeHero from "../components/HomeHero";
import TopRecipes from "../components/TopRecipes";

import { useAuthStore } from "../store/authStore";

const Home = () => {
  const { user } = useAuthStore();
  return (
    <>
      {user && <Greeting />}
      <HomeHero />
      <TopRecipes />
    </>
  );
};

export default Home;
