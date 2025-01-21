import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { JoinedRecipe } from "../utils/types";
import Hero from "../components/Hero";

const Details = () => {
  const { recipe_id } = useParams<{ recipe_id: string }>();

  const [singleRecipe, setSingleRecipes] = useState<JoinedRecipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSingleRecipe = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("recipes")
          .select(
            `*,
            categories(name),
            recipes_ingredients(
              quantity,
              ingredients(name, unit, additional_info)
            )`
          )
          .eq("id", `${recipe_id && recipe_id}`)
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
    <>
      {" "}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {" "}
          <Hero text={singleRecipe?.name} imgUrl={singleRecipe?.imageUrl} />
          <section className="flex flex-col justify-center items-center">
            <article className="flex flex-col gap-7 mt-12">
              <h1 className="text-4xl font-bold">{singleRecipe?.name}</h1>
              <h3 className="text-2xl font-semibold">Kategorie</h3>
              <p>{singleRecipe?.categories.name}</p>
              <h3 className="text-2xl font-semibold">Zutaten</h3>
              <p className="font-semibold">{singleRecipe?.servings} Servings</p>
              <ul className="list-disc">
                {singleRecipe?.recipes_ingredients.map((item) => (
                  <li key={item.ingredients.name}>
                    {item.ingredients.name} {item.quantity}{" "}
                    {item.ingredients.unit} ({item.ingredients.additional_info})
                  </li>
                ))}
              </ul>
              <h3 className="text-2xl font-semibold">Zubereitung</h3>
              <ol>
                {singleRecipe?.instructions.split(";").map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </article>{" "}
          </section>{" "}
        </>
      )}
    </>
  );
};

export default Details;
