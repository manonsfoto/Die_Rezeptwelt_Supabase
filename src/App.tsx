import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./pages/Home";
import Rezepte from "./pages/Rezepte";
import About from "./pages/About";
import Details from "./pages/Details";
import SearchResult from "./pages/SearchResult";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import MeineRezepte from "./pages/MeineRezepte";
import CreateRecipe from "./pages/CreateRecipe";
import MyGroceryList from "./pages/MyGroceryList";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="rezepte" element={<Rezepte />} />
        <Route path="about" element={<About />} />
        <Route path="details/:recipe_id" element={<Details />} />
        <Route path="results" element={<SearchResult />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="profile" element={<Profile />} />
        <Route path="meine_rezepte" element={<MeineRezepte />} />
        <Route path="create_recipe" element={<CreateRecipe />} />
        <Route path="my_grocery_list" element={<MyGroceryList />} />
      </Route>
    )
  );
  return (
    <>
      {" "}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
