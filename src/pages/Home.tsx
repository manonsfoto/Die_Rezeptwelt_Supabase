import Hero from "../components/Hero";
import TopRecipes from "../components/TopRecipes";
import Greeting from "../components/Greeting";
import { useContext } from "react";
import { UserContext } from "../context/Context";

const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      {user && <Greeting />}
      <Hero
        text={"Lassen Sie sich inspirieren und kochen Sie mit Leidenschaft."}
        imgUrl={
          "https://images.unsplash.com/photo-1486419952281-2b1734713e54?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
      <TopRecipes />
    </>
  );
};

export default Home;
