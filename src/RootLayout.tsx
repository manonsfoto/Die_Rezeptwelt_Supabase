import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import {
  GroceryListContext,
  RefreshContext,
  RefreshGroceryListContext,
  SearchInputContext,
  SessionContext,
  UserContext,
} from "./context/Context";
import { User } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase/supabaseClient";
import { GroceryList } from "./lib/supabase/types";

const RootLayout = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  const [refreshGroceryList, setRefreshGroceryList] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [groceryList, setGroceryList] = useState<GroceryList[] | null>([]);
  const [session, setSession] = useState<{
    isLoading: boolean;
    isAuthenticated: boolean;
  }>({
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      setSession({
        isLoading: false,
        isAuthenticated: !!user,
      });
    }
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        setSession({
          isLoading: false,
          isAuthenticated: !!session?.user,
        });
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    async function getMyGroceryList() {
      const { data, error } = await supabase
        .from("grocerylist_ingredients")
        .select(`*,ingredients(name, unit)`)
        .order("created_at", { ascending: true });

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
      <SessionContext.Provider value={{ session, setSession }}>
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
                  <main className="flex flex-col  items-center pb-20  px-4 min-h-128">
                    <Outlet />
                  </main>{" "}
                  <Footer />
                </SearchInputContext.Provider>
              </RefreshContext.Provider>{" "}
            </UserContext.Provider>
          </GroceryListContext.Provider>
        </RefreshGroceryListContext.Provider>
      </SessionContext.Provider>
    </>
  );
};

export default RootLayout;
