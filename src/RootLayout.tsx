import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { useGroceryListStore } from "./store/groceryListStore";

const RootLayout = () => {
  const { user } = useAuthStore();

  const fetchGroceryList = useGroceryListStore(
    (state) => state.fetchGroceryList
  );

  useEffect(() => {
    useAuthStore.getState().fetchAuthStatus();
  }, []);

  useEffect(() => {
    if (user) {
      fetchGroceryList();
    }
  }, [user, fetchGroceryList]);

  return (
    <>
      <Header />
      <main className="flex flex-col items-center pb-20 px-4 min-h-128">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
