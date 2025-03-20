import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase/supabaseClient";
import { GroceryItem, JoinedRecipe } from "../lib/supabase/types";
import HeartIcon from "../components/icons/HeartIcon";
import ArrowIcon from "../components/icons/ArrowIcon";
import { useAuthStore } from "../store/authStore";
import { useFavoritesStore } from "../store/favoritesStore";

const Details = () => {
  const { recipe_id } = useParams<{ recipe_id: string }>();
  const navigate = useNavigate();
  const [singleRecipe, setSingleRecipes] = useState<JoinedRecipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuthStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const isFav = isFavorite(recipe_id!);
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (user && singleRecipe) {
      toggleFavorite(singleRecipe);
    }
  };
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
              ingredients(id,name, unit, additional_info)
            )`
          )
          .eq("id", `${recipe_id && recipe_id}`)
          .single();

        if (error) {
          console.error("Fehler beim Laden der Rezepte:", error.message);
        } else {
          setSingleRecipes(data);
        }
      } catch (err) {
        console.error("Unerwarteter Fehler:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleRecipe();
  }, []);

  async function handleAddMyGroceryList(item: GroceryItem) {
    if (!user) return;

    const { data, error } = await supabase
      .from("grocerylists")
      .select()
      .eq("user_id", user.id);

    if (error) {
      console.error(error);
    }
    if (!data) return;
    if (data?.length > 0) {
      const { error } = await supabase.from("grocerylist_ingredients").insert({
        grocerylist_id: data[0].id,
        user_id: user.id,
        ingredient_id: item.ingredients.id,
      });

      if (error) {
        console.error(error);
      }
    } else {
      const { error } = await supabase
        .from("grocerylists")
        .insert({ user_id: user.id });

      if (error) {
        console.error(error);

        const { error: addIngredientError } = await supabase
          .from("grocerylist_ingredients")
          .insert({
            grocerylist_id: data[0].id,
            user_id: user.id,
            ingredient_id: item.ingredients.id,
          });
        if (addIngredientError) {
          console.error(addIngredientError);
        }
      }
    }
  }

  return (
    <>
      {loading ? (
        <div className="skeleton h-80 w-full"></div>
      ) : (
        <>
          <section className="md:max-w-7xl  w-full">
            <div className="flex flex-col md:flex-row  ">
              <div className="w-full md:border-r-2 border-black md:border-b-2 pt-5 md:py-5">
                <button
                  onClick={() => navigate(-1)}
                  className="hover:opacity-70 transition-opacity mb-4"
                  aria-label="Zurück zur vorherigen Seite"
                  title="Zurück"
                >
                  <ArrowIcon />
                </button>
                <h1 className="text-2xl md:text-4xl w-full mt-12 pb-4 font-caprasimo    ">
                  {singleRecipe?.name}
                </h1>
                <p className="w-2/3 text-sm font-semibold leading-none">
                  {singleRecipe?.description}
                </p>
              </div>
              <div className="border-b-2 border-black flex md:h-fit md:self-end md:px-5 md:gap-5 items-center justify-between w-full mt-4 md:w-fit md:mt-0 ">
                <p className="font-semibold w-40">
                  {singleRecipe?.servings} Servings
                </p>

                <p className=" font-semibold bg-primary rounded-full px-2 py-1">
                  {singleRecipe?.categories.name}
                </p>

                <button
                  className="border-l-2 border-black h-full  p-5 text-xl "
                  type="button"
                  title="Zu meinen Rezepten hinzufügen"
                  onClick={handleFavoriteClick}
                >
                  <HeartIcon isFilled={isFav} />
                </button>
              </div>
            </div>
            {singleRecipe?.imageUrl && (
              <figure className="w-full rounded-3xl overflow-hidden my-8 ">
                <img
                  src={singleRecipe?.imageUrl}
                  alt={singleRecipe?.name}
                  className="w-full h-full object-cover"
                />
              </figure>
            )}
            <h3 className="border-t-2 border-black text-2xl w-full  py-4 font-caprasimo">
              Zutaten
            </h3>
            <ul>
              {singleRecipe?.recipes_ingredients.map((item) => (
                <li
                  key={item.ingredients.name}
                  className="border-b-2 border-base-300 py-2 flex justify-between items-center  md:w-1/2 md:mx-auto"
                >
                  <button
                    title="Zur Einkaufsliste hinzufügen"
                    type="button"
                    onClick={() => handleAddMyGroceryList(item)}
                    className="font-semibold hover:bg-accent rounded-full px-2 py-1"
                  >
                    {item.ingredients.name}
                  </button>{" "}
                  <p className="font-semibold">
                    {item.quantity} {item.ingredients.unit}{" "}
                  </p>
                </li>
              ))}
            </ul>
            <article className="w-full rounded-3xl pb-8 bg-secondary mt-8">
              <h3 className=" text-2xl  py-4 font-caprasimo pl-2">
                Zubereitung
              </h3>
              <ol className="list-decimal list-inside">
                {singleRecipe?.instructions.split(";").map((item) => (
                  <li
                    key={item}
                    className="font-semibold pl-10 border-b-2 border-base-300 py-2 md:w-1/2 md:mx-auto"
                  >
                    {item}
                  </li>
                ))}
              </ol>
            </article>
          </section>
        </>
      )}
    </>
  );
};

export default Details;
