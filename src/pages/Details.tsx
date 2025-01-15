import { useParams } from "react-router-dom";
import { Recipe } from "../utils/types";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const Details = () => {
  const { recipe_id } = useParams<{ recipe_id: string }>();

  const [singleRecipe, setSingleRecipes] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSingleRecipe = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("recipes")
          .select("*")
          .eq("id", recipe_id)
          .single();

        if (error) {
          console.error("Fehler beim Laden der Rezepte:", error.message);
        } else {
          setSingleRecipes(data);
          console.log("single Recipe", data);
        }
      } catch (err) {
        console.error("Unerwarteter Fehler:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleRecipe();
  }, []);

  return (
    <section>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <article>
          <h1>{singleRecipe?.name}</h1>
          <h3>Zutaten</h3>
          {/* <p>{singleRecipe?.}</p> */}
          <h3>Zubereitung</h3>
          <p>{singleRecipe?.instructions}</p>
          <h3>Zusätzliche Informationen</h3>
        </article>
      )}
    </section>
  );
};

export default Details;
