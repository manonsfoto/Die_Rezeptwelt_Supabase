import Hero from "../components/Hero";
import NewRecipes from "../components/NewRecipes";
import TopRecipes from "../components/TopRecipes";

const Rezepte = () => {
  return (
    <>
      <Hero
        text={
          "Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft und erleben Sie unvergessliche Momente bei Tisch."
        }
        imgUrl={
          "https://images.unsplash.com/photo-1577308856961-8e9ec50d0c67?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
      <TopRecipes />
      <NewRecipes />
    </>
  );
};

export default Rezepte;
