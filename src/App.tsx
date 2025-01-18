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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="rezepte" element={<Rezepte />} />
        <Route path="about" element={<About />} />
        <Route path="details/:recipe_id" element={<Details />} />
        <Route path="results" element={<SearchResult />} />
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
