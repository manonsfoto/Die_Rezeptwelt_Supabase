import { Link, NavLink } from "react-router-dom";

import { useContext, useRef } from "react";
import {
  GroceryListContext,
  RefreshContext,
  SearchInputContext,
  UserContext,
} from "../context/Context";
import { supabase } from "../utils/supabaseClient";
import ListIcon from "../assets/SVG/ListIcon";
import LogoutIcon from "../assets/SVG/LogoutIcon";
import SearchIcon from "../assets/SVG/SearchIcon";
import MenuIcon from "../assets/SVG/MenuIcon";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const { setSearchInput } = useContext(SearchInputContext);
  const { setRefresh } = useContext(RefreshContext);
  const { groceryList } = useContext(GroceryListContext);
  const searchInputRef = useRef<HTMLInputElement>(null);

  function handleSearchButton() {
    if (searchInputRef.current) {
      setSearchInput(searchInputRef.current.value);
      setRefresh((prev) => !prev);
    }
  }
  async function handleLogOutButton() {
    const { error } = await supabase.auth.signOut();
    console.log(error);

    setUser(null);
  }

  return (
    <header className="px-4 sticky top-0 z-50  bg-base-100">
      <nav className="navbar px-0  border-b-2 border-black uppercase font-semibold">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle lg:hidden"
            >
              <MenuIcon />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-primary rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>

              <li>
                <NavLink to={"rezepte"}>Rezepte</NavLink>
              </li>
              <li>
                <NavLink to={"about"}>Über uns</NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink to={"profile"}>Profil</NavLink>
                  </li>
                  <li>
                    <NavLink to={"meine_rezepte"}>Meine Rezepte</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          <Link to={"/"} className="hover:text-info hidden lg:flex">
            <p className="font-gaegu text-3xl tracking-tight">Die Rezeptwelt</p>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-4  px-1">
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive ? "border-2 rounded-full border-black px-2" : "px-2"
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"rezepte"}
                className={({ isActive }) =>
                  isActive ? "border-2 rounded-full border-black px-2" : "px-2"
                }
              >
                Rezepte
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"about"}
                className={({ isActive }) =>
                  isActive ? "border-2 rounded-full border-black px-2" : "px-2"
                }
              >
                Über uns
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink
                  to={"profile"}
                  className={({ isActive }) =>
                    isActive
                      ? "border-2 rounded-full border-black px-2"
                      : "px-2"
                  }
                >
                  Profil
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="btn btn-circle btn-ghost mr-4"
              title="Suche"
            >
              <SearchIcon />
            </button>

            <div
              tabIndex={0}
              className={`card card-compact dropdown-content bg-secondary z-[1] mt-3 w-52 shadow ${
                user ? "-left-10" : ""
              }`}
            >
              <div className="card-body">
                <input
                  ref={searchInputRef}
                  type="text"
                  name="searchInput"
                  placeholder="Search"
                  className="input input-bordered rounded-full "
                />

                <Link to={"/results"}>
                  {" "}
                  <button
                    type="button"
                    className="btn bg-black hover:text-black text-base-100 btn-block rounded-full"
                    onClick={handleSearchButton}
                  >
                    Search
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {user ? (
            <>
              <div className="flex gap-4 items-center justify-center">
                {/*my grocery list  */}
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    title="Einkaufsliste"
                    className="btn btn-ghost btn-circle"
                  >
                    <div className="indicator flex">
                      <ListIcon />
                      <span className="badge badge-sm indicator-item">
                        {groceryList?.length}
                      </span>
                    </div>
                  </div>
                  <div
                    tabIndex={0}
                    className="card card-compact dropdown-content bg-primary z-[1] mt-3 w-52 shadow"
                  >
                    <div className="card-body">
                      <span className="text-lg font-bold">
                        {groceryList?.length} Items
                      </span>
                      <ul className="list-disc list-inside">
                        {groceryList?.map((item) => (
                          <li key={item.ingredient_id}>
                            {item.ingredients.name}
                          </li>
                        ))}
                      </ul>

                      <Link to={"/my_grocery_list"}>
                        {" "}
                        <button className="btn btn-accent btn-block rounded-full">
                          Zur Einkaufsliste
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* my grocery list */}

                <button
                  className="btn btn-ghost btn-circle"
                  onClick={handleLogOutButton}
                  title="Abmelden"
                >
                  <LogoutIcon />
                </button>
              </div>
            </>
          ) : (
            <Link
              to={"/login"}
              className=" rounded-full  border-black border-2 px-2 ml-2 hover:bg-accent"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
