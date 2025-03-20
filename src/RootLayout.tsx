import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { useGroceryListStore } from "./store/groceryListStore";

const RootLayout = () => {
  const user = useAuthStore((state) => state.user);
  const fetchAuthStatus = useAuthStore((state) => state.fetchAuthStatus);
  const fetchGroceryList = useGroceryListStore(
    (state) => state.fetchGroceryList
  );

  useEffect(() => {
    fetchAuthStatus();
  }, []);

  useEffect(() => {
    if (user) {
      fetchGroceryList();
    }
  }, [user]);

  return (
    <>
      <Header />
      <main className="flex flex-col items-center pb-20 px-4 ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
