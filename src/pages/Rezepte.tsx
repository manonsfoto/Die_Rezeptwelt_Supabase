import { useContext } from "react";
import Hero from "../components/Hero";
import NewRecipes from "../components/NewRecipes";
import TopRecipes from "../components/TopRecipes";
import { UserContext } from "../context/Context";
import { Link } from "react-router-dom";

const Rezepte = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      {user ? (
        <>
          <Hero
            text={
              "Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft und erleben Sie unvergessliche Momente bei Tisch."
            }
            imgUrl={
              "https://images.unsplash.com/photo-1577308856961-8e9ec50d0c67?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
          <div className="flex justify-end gap-6 w-5/6">
            <Link to={"/meine_rezepte"}>
              {" "}
              <button className="btn btn-success mt-24 text-yellow-50">
                Meine Rezepte 💖
              </button>
            </Link>
            <Link to={"/create_recipe"}>
              {" "}
              <button className="btn btn-info mt-24 text-yellow-50">
                Create New Recipe
              </button>
            </Link>
          </div>
          <TopRecipes />
          <NewRecipes />
        </>
      ) : (
        <>
          {" "}
          <Hero
            text={
              "Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft und erleben Sie unvergessliche Momente bei Tisch."
            }
            imgUrl={
              "https://images.unsplash.com/photo-1577308856961-8e9ec50d0c67?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
          <Link to={"/login"} className="btn btn-secondary  mt-24 ">
            Zum Login
          </Link>
        </>
      )}
    </>
  );
};

export default Rezepte;
