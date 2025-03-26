import { ChangeEvent } from "react";
import { GroceryList } from "../lib/supabase/types";
import EmptyHero from "../components/EmptyHero";
import { useGroceryListStore } from "../store/groceryListStore";
import {
  deleteGroceryItem,
  updateGroceryItemQuantity,
  updateGroceryItemStatus,
  clearGroceryList,
} from "../lib/supabase/actions";
import DeleteIcon from "../components/icons/DeleteIcon";
import BackToTopButton from "../components/BacoToTopButton";

const MyGroceryList = () => {
  const { groceryList, refreshGroceryList } = useGroceryListStore();

  async function handleDeleteGroceryItem(ingredient_id: string) {
    const { success } = await deleteGroceryItem(ingredient_id);
    if (success) {
      refreshGroceryList();
    }
  }

  async function handleQuantityChangeButton(
    ingredient_id: string,
    action: "increase" | "decrease"
  ) {
    try {
      const currentItem = groceryList?.find(
        (item) => item.ingredient_id === ingredient_id
      );
      if (!currentItem) return;

      const { success } = await updateGroceryItemQuantity(
        ingredient_id,
        action,
        currentItem.quantity
      );

      if (success) {
        refreshGroceryList();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function changeCheckbox(item: GroceryList, completed: boolean) {
    const { success } = await updateGroceryItemStatus(
      item.ingredient_id,
      completed
    );
    if (success) {
      refreshGroceryList();
    }
  }

  async function emptyGroceryList() {
    if (groceryList && groceryList.length > 0) {
      const { success } = await clearGroceryList(groceryList[0].grocerylist_id);
      if (success) {
        refreshGroceryList();
      }
    }
  }
  return (
    <>
      {" "}
      <section className="max-w-7xl w-full gap-4 mt-4">
        <h1 className="headline-1 w-full my-12 pb-4  border-b-2 border-black">
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
                  className="flex-between gap-4 md:gap-12 p-6 font-semibold  border-b-2 border-base-300  "
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

                    <div className="font-bold font-gaegu text-xl italic bg-secondary rounded-2xl uppercase w-28 h-16 flex-center text-center break-words hyphens-auto">
                      {item.ingredients.name}
                    </div>
                  </div>
                  <div className="flex-center flex-col gap-3 md:flex-row md:gap-10">
                    <div className="flex-center gap-3">
                      <button
                        onClick={() => {
                          handleQuantityChangeButton(
                            item.ingredient_id,
                            "decrease"
                          );
                        }}
                        className="font-semibold"
                      >
                        –
                      </button>
                      <p className="font-semibold rounded-full border-2 border-black w-7 h-7 flex-center">
                        {item.quantity}
                      </p>
                      <button
                        onClick={() => {
                          handleQuantityChangeButton(
                            item.ingredient_id,
                            "increase"
                          );
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
                        <DeleteIcon />
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
        <BackToTopButton />
      </section>
    </>
  );
};

export default MyGroceryList;
