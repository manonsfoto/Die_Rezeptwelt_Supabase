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
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="results" element={<SearchResult />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="rezepte" element={<Rezepte />} />{" "}
        <Route element={<ProtectedRoute />}>
          <Route path="details/:recipe_id" element={<Details />} />{" "}
          <Route path="meine_rezepte" element={<MeineRezepte />} />
          <Route path="profile" element={<Profile />} />{" "}
          <Route path="my_grocery_list" element={<MyGroceryList />} />{" "}
          <Route path="create_recipe" element={<CreateRecipe />} />
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
