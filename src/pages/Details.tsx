import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import {
  GroceryItem,
  InsertRecipeFavorites,
  JoinedRecipe,
} from "../utils/types";
import Hero from "../components/Hero";
import { RefreshGroceryListContext, UserContext } from "../context/Context";
import ZumLogin from "../components/ZumLogin";
import LoaderDetails from "../components/loader/LoaderDetails";

const Details = () => {
  const { recipe_id } = useParams<{ recipe_id: string }>();

  const [singleRecipe, setSingleRecipes] = useState<JoinedRecipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useContext(UserContext);
  const { setRefreshGroceryList } = useContext(RefreshGroceryListContext);

  const [isMarked, setIsMarked] = useState<boolean>(false);

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
      {user ? (
        <>
          {" "}
          {loading ? (
            <LoaderDetails />
          ) : (
            <>
              {" "}
              <Hero text={singleRecipe?.name} imgUrl={singleRecipe?.imageUrl} />
              <section className="flex flex-col justify-center items-center max-w-lg px-8">
                <article className="flex flex-col gap-7 mt-12">
                  <div className="flex">
                    <h1 className="text-4xl font-bold">{singleRecipe?.name}</h1>{" "}
                    <button
                      className="text-3xl"
                      type="button"
                      title="Zu meinen Rezepten hinzufügen"
                      onClick={handleFavoritesBtn}
                    >
                      {isMarked ? "💖" : "🩶"}
                    </button>
                  </div>
                  <h3 className="text-2xl font-semibold">Kategorie</h3>
                  <p>{singleRecipe?.categories.name}</p>
                  <h3 className="text-2xl font-semibold">Zutaten</h3>
                  <p className="font-semibold">
                    {singleRecipe?.servings} Servings
                  </p>
                  <ul className="list-disc">
                    {singleRecipe?.recipes_ingredients.map((item) => (
                      <li key={item.ingredients.name}>
                        {item.ingredients.name} {item.quantity}{" "}
                        {item.ingredients.unit} (
                        {item.ingredients.additional_info}){" "}
                        <button
                          title="Zur Einkaufsliste hinzufügen"
                          type="button"
                          onClick={() => handleAddMyGroceryList(item)}
                        >
                          📋
                        </button>
                      </li>
                    ))}
                  </ul>
                  <h3 className="text-2xl font-semibold">Zubereitung</h3>
                  <ol className="list-decimal">
                    {singleRecipe?.instructions.split(";").map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </article>{" "}
              </section>{" "}
            </>
          )}
        </>
      ) : (
        <ZumLogin />
      )}
    </>
  );
};

export default Details;
