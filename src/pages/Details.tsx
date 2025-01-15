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
    <section className="flex justify-center items-center mt-12">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <article className="flex flex-col gap-7">
          <h1 className="text-4xl font-bold">{singleRecipe?.name}</h1>
          <h3 className="text-2xl font-semibold">Zutaten</h3>

          <h3 className="text-2xl font-semibold">Zubereitung</h3>
          <ol>
            {singleRecipe?.instructions.split(";").map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>
      )}
    </section>
  );
};

export default Details;
