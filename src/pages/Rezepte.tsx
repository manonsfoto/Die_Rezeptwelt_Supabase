import { useContext, useEffect } from "react";

import NewRecipes from "../components/NewRecipes";
import TopRecipes from "../components/TopRecipes";
import { UserContext } from "../context/Context";
import { useNavigate } from "react-router-dom";
import StyledLinks from "../components/StyledLinks";

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
      <StyledLinks bgColor="bg-base-100" />
      <NewRecipes />
      <TopRecipes />
    </>
  );
};

export default Rezepte;
