import { Link, NavLink, useNavigate } from "react-router-dom";
import ListIcon from "../icons/ListIcon";
import LogoutIcon from "../icons/LogoutIcon";
import SearchIcon from "../icons/SearchIcon";
import MenuIcon from "../icons/MenuIcon";
import { useGroceryListStore } from "../../store/groceryListStore";
import { useAuthStore } from "../../store/authStore";
import Search from "./Search";

const navItems = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Rezepte", path: "/rezepte" },
  { id: 3, name: "Über uns", path: "/about" },
];

const navItemsPrivate = [
  { id: 4, name: "Profil", path: "/profile" },
  { id: 5, name: "Meine Rezepte", path: "/meine_rezepte" },
];
const Header = () => {
  const { groceryList } = useGroceryListStore();
  const { signOut, user } = useAuthStore();
  const navigate = useNavigate();

  async function handleLogOutButton() {
    await signOut();
    navigate("/");
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
              {navItems.map((item) => (
                <li key={item.id}>
                  <NavLink to={item.path}>{item.name}</NavLink>
                </li>
              ))}

              {user && (
                <>
                  {navItemsPrivate.map((item) => (
                    <li key={item.id}>
                      <NavLink to={item.path}>{item.name}</NavLink>
                    </li>
                  ))}
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
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "border-2 rounded-full border-black px-2"
                      : "px-2"
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            {user && (
              <>
                {navItemsPrivate.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive
                          ? "border-2 rounded-full border-black px-2"
                          : "px-2"
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </>
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
              <Search />
            </div>
          </div>

          {user ? (
            <>
              <div className="flex gap-4 items-center justify-center">
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
