import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import {
  GroceryListContext,
  RefreshContext,
  RefreshGroceryListContext,
  SearchInputContext,
  UserContext,
} from "./context/Context";
import { User } from "@supabase/supabase-js";
import { supabase } from "./utils/supabaseClient";
import { GroceryList } from "./utils/types";

const RootLayout = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  const [refreshGroceryList, setRefreshGroceryList] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [groceryList, setGroceryList] = useState<GroceryList[] | null>([]);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, []);

  useEffect(() => {
    if (!user) return;
    async function getMyGroceryList() {
      const { data, error } = await supabase
        .from("grocerylist_ingredients")
        .select(`*,ingredients(name, unit)`);

      if (error) {
        console.error(error);
      }
      setGroceryList(data);
    }
    getMyGroceryList();
  }, [user, refreshGroceryList]);

  return (
    <>
      {" "}
      <RefreshGroceryListContext.Provider
        value={{ refreshGroceryList, setRefreshGroceryList }}
      >
        <GroceryListContext.Provider value={{ groceryList, setGroceryList }}>
          <UserContext.Provider value={{ user, setUser }}>
            <RefreshContext.Provider value={{ refresh, setRefresh }}>
              <SearchInputContext.Provider
                value={{ searchInput, setSearchInput }}
              >
                <Header />
                <main className="flex flex-col  items-center pb-40 min-h-128">
                  <Outlet />
                </main>{" "}
                <Footer />
              </SearchInputContext.Provider>
            </RefreshContext.Provider>{" "}
          </UserContext.Provider>
        </GroceryListContext.Provider>
      </RefreshGroceryListContext.Provider>
    </>
  );
};

export default RootLayout;
