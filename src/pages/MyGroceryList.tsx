import { useContext } from "react";
import Hero from "../components/Hero";
import { GroceryListContext } from "../context/Context";

const MyGroceryList = () => {
  const { groceryList } = useContext(GroceryListContext);
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
        <ul></ul>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Artikelname</th>
                <th>Menge</th>
                <th>Einheit</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {groceryList?.map((item) => (
                <tr key={item.ingredient_id}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{item.ingredients.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.ingredients.unit}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">edit</button>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
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
