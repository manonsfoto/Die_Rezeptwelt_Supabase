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
    <header className="px-4">
      <nav className="navbar bg-base-100 border-b-2 border-black uppercase font-bold">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>

              <li>
                <NavLink to={"rezepte"}> Rezepte</NavLink>
              </li>
              <li>
                <NavLink to={"about"}>Über uns</NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink to={"profile"}>Profile</NavLink>
                  </li>
                  <li>
                    <NavLink to={"meine_rezepte"}>Meine Rezepte💖</NavLink>
                  </li>
                  <li>
                    <NavLink to={"create_recipe"}>Create New Recipe</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          <Link to={"/"} className="btn btn-ghost  hidden lg:flex">
            <p className="font-gaegu text-3xl tracking-tight">Die Rezeptwelt</p>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>

            <li>
              <NavLink to={"rezepte"}> Rezepte</NavLink>
            </li>
            <li>
              <NavLink to={"about"}>Über uns</NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={"profile"}>Profile</NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
            >
              <div className="card-body">
                <input
                  ref={searchInputRef}
                  type="text"
                  name="searchInput"
                  placeholder="Search"
                  className="input input-bordered "
                />

                <Link to={"/results"}>
                  {" "}
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
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
                    className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
                  >
                    <div className="card-body">
                      <span className="text-lg font-bold">
                        {groceryList?.length} Items
                      </span>
                      <ul>
                        {groceryList?.map((item) => (
                          <li key={item.ingredient_id} className="text-info">
                            {item.ingredients.name}
                          </li>
                        ))}
                      </ul>

                      <Link to={"/my_grocery_list"}>
                        {" "}
                        <button className="btn btn-accent btn-block">
                          Zur Einkaufsliste
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* my grocery list */}
                <p>
                  Hallo, <strong>{user.user_metadata.first_name}</strong>
                </p>{" "}
                <button
                  onClick={handleLogOutButton}
                  className="btn btn-secondary"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link
              to={"/login"}
              className="btn btn-ghost rounded-full  font-bold  border-black border-2 "
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
