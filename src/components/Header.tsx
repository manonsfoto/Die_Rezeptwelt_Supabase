import { Link, NavLink } from "react-router-dom";
import LogoIcon from "../assets/SVG/Logo";
import { useContext, useRef } from "react";
import {
  RefreshContext,
  SearchInputContext,
  UserContext,
} from "../context/Context";
import { supabase } from "../utils/supabaseClient";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const { setSearchInput } = useContext(SearchInputContext);
  const { setRefresh } = useContext(RefreshContext);
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
    <header>
      <nav className="navbar bg-base-100">
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
                <li>
                  <NavLink to={"profile"}>Profile</NavLink>
                </li>
              )}
            </ul>
          </div>

          <Link to={"/"} className="btn btn-ghost text-xl hidden lg:flex">
            <LogoIcon />
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
          {/*  */}
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
                  className="input input-bordered w-24 md:w-auto"
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
          {/*  */}

          {user ? (
            <div className="flex gap-4 items-center justify-center">
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
          ) : (
            <Link to={"/login"} className="btn btn-accent">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
