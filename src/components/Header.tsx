import { Link, NavLink } from "react-router-dom";
import LogoIcon from "../assets/SVG/Logo";
import { useContext, useRef } from "react";
import {
  RefreshContext,
  SearchInputContext,
  UserContext,
} from "../context/Context";

const Header = () => {
  const { user } = useContext(UserContext);
  const { setSearchInput } = useContext(SearchInputContext);
  const { setRefresh } = useContext(RefreshContext);
  const searchInputRef = useRef<HTMLInputElement>(null);

  function handleSearchButton() {
    if (searchInputRef.current) {
      setSearchInput(searchInputRef.current.value);
      setRefresh((prev) => !prev);
    }
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

          <Link to={"/"} className="btn btn-ghost text-xl">
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
          <div className="form-control mr-4 flex flex-row gap-2">
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
                className="btn"
                onClick={handleSearchButton}
              >
                Search
              </button>
            </Link>
          </div>
          {user ? (
            <button className="btn btn-secondary">Logout</button>
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
