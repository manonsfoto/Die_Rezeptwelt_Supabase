import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import {
  GroceryItem,
  InsertRecipeFavorites,
  JoinedRecipe,
} from "../utils/types";

import {
  RefreshGroceryListContext,
  UserContext,
  SessionContext,
} from "../context/Context";
import LoaderDetails from "../components/loader/LoaderDetails";

const Details = () => {
  const { recipe_id } = useParams<{ recipe_id: string }>();
  const navigate = useNavigate();
  const [singleRecipe, setSingleRecipes] = useState<JoinedRecipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useContext(UserContext);
  const { session } = useContext(SessionContext);
  const { setRefreshGroceryList } = useContext(RefreshGroceryListContext);

  const [isMarked, setIsMarked] = useState<boolean>(false);

  useEffect(() => {
    if (!session.isLoading && !session.isAuthenticated) {
      navigate("/login");
    }
  }, [session, navigate]);

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

  async function checkIsMarkedforFavorites() {
    if (singleRecipe && user) {
      const { data, error } = await supabase
        .from("recipe_favorites")
        .select()
        .eq("recipe_id", singleRecipe.id)
        .eq("user_id", user.id);

      if (data) {
        if (data.length > 0) {
          setIsMarked(true);
        } else {
          setIsMarked(false);
        }
      }

      if (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    checkIsMarkedforFavorites();
  }, [user, singleRecipe]);

  async function handleFavoritesBtn() {
    if (singleRecipe && user && isMarked === false) {
      const recipeFavorites: InsertRecipeFavorites = {
        recipe_id: singleRecipe.id,
        user_id: user.id,
      };

      const { error } = await supabase
        .from("recipe_favorites")
        .insert(recipeFavorites);

      if (error) {
        console.error(error);
      }
    }
    if (singleRecipe && user && isMarked === true) {
      const response = await supabase
        .from("recipe_favorites")
        .delete()
        .eq("recipe_id", singleRecipe.id)
        .eq("user_id", user.id);

      if (response.error) {
        console.error(response.error);
      }
    }

    checkIsMarkedforFavorites();
  }

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

    setRefreshGroceryList((prev) => !prev);
  }

  return (
    <>
      {loading ? (
        <LoaderDetails />
      ) : (
        <>
          <section className="md:max-w-7xl  w-full">
            <div className="flex flex-col md:flex-row md:mt-12 ">
              <div className="w-full md:border-r-2 border-black md:border-b-2  md:pb-5">
                <h1 className="text-4xl w-full mt-12 pb-4 font-caprasimo   ">
                  {singleRecipe?.name}
                </h1>
                <p className="w-2/3 text-sm font-semibold leading-none">
                  {singleRecipe?.description}
                </p>
              </div>
              <div className="border-b-2 border-black flex  md:px-5 md:gap-5 items-center justify-between w-full mt-4 md:w-fit md:mt-0 ">
                <p className="font-semibold w-40">
                  {singleRecipe?.servings} Servings
                </p>

                <p className=" font-semibold bg-primary rounded-full px-2 py-1">
                  {singleRecipe?.categories.name}
                </p>

                <button
                  className="border-l-2 border-black h-full p-5 text-xl"
                  type="button"
                  title="Zu meinen Rezepten hinzufügen"
                  onClick={handleFavoritesBtn}
                >
                  {isMarked ? "🖤" : "🩶"}
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
            <h3 className="border-t-2 border-black text-3xl w-full  py-4 font-caprasimo">
              Zutaten
            </h3>
            <ul>
              {singleRecipe?.recipes_ingredients.map((item) => (
                <li
                  key={item.ingredients.name}
                  className="border-b-2 border-base-300 py-2 flex justify-between items-center md:w-2/3 md:mx-auto"
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
              <h3 className=" text-3xl  py-4 font-caprasimo pl-2">
                Zubereitung
              </h3>
              <ol className="list-decimal list-inside">
                {singleRecipe?.instructions.split(";").map((item) => (
                  <li
                    key={item}
                    className="font-semibold pl-10 border-b-2 border-base-300 py-2 md:w-2/3 md:mx-auto"
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
