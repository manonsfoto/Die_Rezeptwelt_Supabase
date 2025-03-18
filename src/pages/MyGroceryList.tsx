import { ChangeEvent, useContext, useState } from "react";

import {
  GroceryListContext,
  RefreshGroceryListContext,
} from "../context/Context";
import { supabase } from "../utils/supabaseClient";
import { GroceryList } from "../utils/types";
import EmptyHero from "../components/EmptyHero";

const MyGroceryList = () => {
  const { groceryList } = useContext(GroceryListContext);
  const { setRefreshGroceryList } = useContext(RefreshGroceryListContext);
  const [quantityInputs, setQuantityInputs] = useState<{
    [key: string]: number;
  }>({});

  async function handleDeleteGroceryItem(ingredient_id: string) {
    await supabase
      .from("grocerylist_ingredients")
      .delete()
      .eq("ingredient_id", ingredient_id);
    setRefreshGroceryList((prev) => !prev);
  }

  async function handleQuantityChangeButton(ingredient_id: string) {
    try {
      const { error } = await supabase
        .from("grocerylist_ingredients")
        .update({ quantity: quantityInputs[ingredient_id] })
        .eq("ingredient_id", ingredient_id);

      console.log("quantityInput", quantityInputs[ingredient_id]);
      if (error) {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshGroceryList((prev) => !prev);
    }
  }

  const handleInputChange = (ingredient_id: string, value: number) => {
    setQuantityInputs((prev) => ({
      ...prev,
      [ingredient_id]: value,
    }));
  };

  async function changeCheckbox(item: GroceryList, completed: boolean) {
    const { error } = await supabase
      .from("grocerylist_ingredients")
      .update({ completed: completed })
      .eq("ingredient_id", item.ingredient_id);
    setRefreshGroceryList((prev) => !prev);
    if (error) {
      console.error("Error", error);
    }
  }
  async function emptyGroceryList() {
    if (groceryList) {
      await supabase
        .from("grocerylist_ingredients")
        .delete()
        .eq("grocerylist_id", groceryList[0].grocerylist_id);

      setRefreshGroceryList((prev) => !prev);
    }
  }
  return (
    <>
      {" "}
      <section className="w-full gap-4 mt-4">
        <h1 className="text-3xl w-full my-12 pb-4 font-caprasimo border-b-2 border-black">
          Meine Einkaufsliste
        </h1>
        {groceryList && groceryList.length > 0 ? (
          <div className="bg-neutral rounded-3xl min-h-screen p-4 flex flex-col gap-4 items-center">
            <button
              onClick={emptyGroceryList}
              className="btn rounded-full  btn-warning w-fit self-end"
            >
              Liste leeren 🗑️
            </button>

            <ul className=" bg-base-100  rounded-3xl pb-4">
              {groceryList?.map((item) => (
                <li
                  key={item.ingredient_id}
                  className="flex items-center justify-between gap-4 md:gap-12 p-6 font-semibold  border-b-2 border-base-300  "
                >
                  <div className="relative">
                    <label className="absolute -top-2 -left-2">
                      <input
                        type="checkbox"
                        name={`checkbox${item.ingredient_id}`}
                        className="checkbox w-5 h-5 bg-accent"
                        checked={item.completed}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          changeCheckbox(item, e.target.checked);
                        }}
                      />
                    </label>

                    <div className="font-bold font-gaegu text-xl italic bg-secondary rounded-2xl uppercase w-28 h-16 flex items-center justify-center">
                      {item.ingredients.name}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-10">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => {
                          handleQuantityChangeButton(item.ingredient_id);
                        }}
                        className="font-semibold"
                      >
                        –
                      </button>
                      <p className="font-semibold rounded-full border-2 border-black w-7 h-7 flex items-center justify-center">
                        {item.quantity}
                      </p>
                      <button
                        onClick={() => {
                          handleQuantityChangeButton(item.ingredient_id);
                        }}
                        className="font-semibold"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center gap-3 md:gap-10">
                      <p className="text-sm w-12 md:text-right">
                        {item.ingredients.unit}
                      </p>

                      <button
                        className="btn btn-square border-none btn-xs bg-transparent "
                        title="delete"
                        onClick={() => {
                          handleDeleteGroceryItem(item.ingredient_id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <EmptyHero mainText="Keine Einkaufsliste" />
        )}
      </section>
    </>
  );
};

export default MyGroceryList;
