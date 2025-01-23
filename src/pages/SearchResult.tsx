import { useContext, useEffect, useState } from "react";
import {
  RefreshContext,
  SearchInputContext,
  UserContext,
} from "../context/Context";
import { Recipe } from "../utils/types";
import TopCard from "../components/card/TopCard";
import { supabase } from "../utils/supabaseClient";
import { Link } from "react-router-dom";

const SearchResult = () => {
  const { user } = useContext(UserContext);
  const { searchInput } = useContext(SearchInputContext);
  const { refresh } = useContext(RefreshContext);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSearchResult = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("recipes")
          .select()
          .ilike("name", `%${searchInput}%`);

        if (error) {
          console.error("Fehler beim Laden der Rezepte:", error.message);
        } else {
          setRecipes(data || []);
        }
      } catch (err) {
        console.error("Unerwarteter Fehler:", err);
      } finally {
        setLoading(false);
      }
    };

    getSearchResult();
  }, [refresh]);
  return user ? (
    <section className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-3xl	my-12 ">Search Results</h1>
      {loading ? (
        <p>Loading...</p>
      ) : recipes.length > 0 ? (
        <ul className="flex flex-row gap-4 flex-wrap justify-center items-center">
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <TopCard recipe={recipe} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-red-500">
          Sorry, No results found for{" "}
          <span className="font-bold">{searchInput}</span>
        </p>
      )}
    </section>
  ) : (
    <Link to={"/login"} className="btn btn-secondary mt-24">
      Zum Login
    </Link>
  );
};

export default SearchResult;
