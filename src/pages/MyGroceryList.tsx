import { ChangeEvent, useContext, useState } from "react";

import {
  GroceryListContext,
  RefreshGroceryListContext,
} from "../context/Context";
import { supabase } from "../utils/supabaseClient";
import { GroceryList } from "../utils/types";

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
        <button
          onClick={emptyGroceryList}
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg  btn-warning w-fit self-end"
        >
          Liste leeren 🗑️
        </button>
        <div className="overflow-x-auto min-h-128">
          <table className="table max-w-2xl">
            <thead>
              <tr className="text-base text-center">
                <th></th>
                <th>Artikelname</th>
                <th>Menge</th>
                <th>Einheit</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {groceryList?.map((item) => (
                <tr key={item.ingredient_id}>
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        name={`checkbox${item.ingredient_id}`}
                        className="checkbox"
                        checked={item.completed}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          changeCheckbox(item, e.target.checked);
                        }}
                      />
                    </label>
                  </th>
                  <td className="flex items-center justify-center">
                    <div className="font-bold font-gaegu text-xl italic bg-secondary rounded-2xl uppercase w-28 h-16 flex items-center justify-center">
                      {item.ingredients.name}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
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
                  </td>
                  <td className="text-sm">{item.ingredients.unit}</td>
                  <th>
                    <button
                      className="btn btn-square btn-sm"
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
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default MyGroceryList;
