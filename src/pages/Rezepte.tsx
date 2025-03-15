import { useContext, useEffect } from "react";

import NewRecipes from "../components/NewRecipes";
import TopRecipes from "../components/TopRecipes";
import { UserContext } from "../context/Context";
import { Link, useNavigate } from "react-router-dom";

const Rezepte = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      <div className="w-full relative mt-12">
        <Link to={"/meine_rezepte"} className="w-full">
          {" "}
          <div className="flex items-center justify-between pb-8 bg-primary w-full text-2xl   p-4 font-caprasimo  rounded-t-3xl">
            <p>Meine Rezepte</p>
            <p>→</p>
          </div>
        </Link>
        <Link to={"/create_recipe"} className="w-full">
          {" "}
          <div className="flex absolute z-10 top-14 items-center  pb-8 justify-between bg-neutral w-full text-2xl   p-4 font-caprasimo  rounded-t-3xl">
            <p>Create New Recipe</p>
            <p>→</p>
          </div>
        </Link>
        <div className=" absolute z-20 top-28  bg-base-100 w-full    p-4   rounded-t-3xl"></div>
      </div>
      <NewRecipes />
      <TopRecipes />
    </>
  );
};

export default Rezepte;
