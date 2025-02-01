import { ChangeEvent, useContext, useState } from "react";
import Hero from "../components/Hero";
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
      <Hero
        text={
          "Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft und erleben Sie unvergessliche Momente bei Tisch."
        }
        imgUrl={
          "https://images.unsplash.com/photo-1577308856961-8e9ec50d0c67?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
      <section className="flex flex-col gap-4 mt-20">
        <h1
          className="text-3xl text-center font-bold
      mb-6"
        >
          Meine Einkaufsliste
        </h1>
        <button
          onClick={emptyGroceryList}
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-outline btn-warning w-fit self-end"
        >
          Liste leeren 🗑️
        </button>
        <div className="overflow-x-auto min-h-128">
          <table className="table">
            <thead>
              <tr className="text-xl">
                <th></th>
                <th>Artikelname</th>
                <th>Menge</th>
                <th>Einheit</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {groceryList?.map((item) => (
                <tr key={item.ingredient_id} className="text-lg">
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
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold ">
                          {item.ingredients.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {item.quantity}{" "}
                    <div className="dropdown dropdown-bottom">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-xs m-1"
                      >
                        edit
                      </div>
                      <div
                        tabIndex={0}
                        className="dropdown-content menu bg-base-200 rounded-box z-[1] w-24 p-2 shadow  gap-2"
                      >
                        <input
                          type="number"
                          name={`quantityInput${item.ingredient_id}`}
                          min={1}
                          value={quantityInputs[item.ingredient_id] || ""}
                          onChange={(e) =>
                            handleInputChange(
                              item.ingredient_id,
                              Number(e.target.value)
                            )
                          }
                          placeholder="200"
                          className="input input-bordered input-xs w-full text-xs "
                        />

                        <button
                          type="button"
                          className="btn btn-active  btn-xs"
                          onClick={() => {
                            handleQuantityChangeButton(item.ingredient_id);
                          }}
                        >
                          Change
                        </button>
                      </div>
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

            <tfoot>
              <tr className="text-xl">
                <th></th>
                <th>Artikelname</th>
                <th>Menge</th>
                <th>Einheit</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </>
  );
};

export default MyGroceryList;
