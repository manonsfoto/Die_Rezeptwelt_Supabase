import HomeHero from "../components/HomeHero";
import TopRecipes from "../components/TopRecipes";
import Greeting from "../components/Greeting";
import { useContext } from "react";
import { UserContext } from "../context/Context";

const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      {user && <Greeting />}
      <HomeHero />
      <TopRecipes />
    </>
  );
};

export default Home;
