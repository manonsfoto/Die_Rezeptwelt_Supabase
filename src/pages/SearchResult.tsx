import { useContext, useEffect, useState } from "react";
import {
  RefreshContext,
  SearchInputContext,
  UserContext,
} from "../context/Context";
import { Recipe } from "../utils/types";
import TopCard from "../components/card/TopCard";
import { supabase } from "../utils/supabaseClient";

import Hero from "../components/Hero";
import ZumLogin from "../components/ZumLogin";

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
      <section className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl	my-20 ">Search Results</h1>
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
    </>
  ) : (
    <ZumLogin />
  );
};

export default SearchResult;
