import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import {
  RefreshContext,
  SearchInputContext,
} from "./context/Context";
import { useAuthStore } from "./store/authStore";
import { useGroceryListStore } from "./store/groceryListStore";

const RootLayout = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  

  const { user } = useAuthStore();
  
 
  const fetchGroceryList = useGroceryListStore(state => state.fetchGroceryList);
  
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
      <RefreshContext.Provider value={{ refresh, setRefresh }}>
        <SearchInputContext.Provider
          value={{ searchInput, setSearchInput }}
        >
          <Header />
          <main className="flex flex-col items-center pb-20 px-4 min-h-128">
            <Outlet />
          </main>
          <Footer />
        </SearchInputContext.Provider>
      </RefreshContext.Provider>
    </>
  );
};

export default RootLayout;