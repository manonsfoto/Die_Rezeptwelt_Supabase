import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";
import {
  RefreshContext,
  SearchInputContext,
  UserContext,
} from "./context/Context";
import { User } from "@supabase/supabase-js";

const RootLayout = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  return (
    <>
      {" "}
      <UserContext.Provider value={{ user, setUser }}>
        <RefreshContext.Provider value={{ refresh, setRefresh }}>
          <SearchInputContext.Provider value={{ searchInput, setSearchInput }}>
            <Header />
            <main className="flex flex-col justify-center items-center">
              <Outlet />
            </main>{" "}
            <Footer />
          </SearchInputContext.Provider>
        </RefreshContext.Provider>{" "}
      </UserContext.Provider>
    </>
  );
};

export default RootLayout;
