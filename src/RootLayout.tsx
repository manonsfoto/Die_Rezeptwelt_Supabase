import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";
import { RefreshContext, SearchInputContext } from "./context/Context";

const RootLayout = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  return (
    <>
      <RefreshContext.Provider value={{ refresh, setRefresh }}>
        <SearchInputContext.Provider value={{ searchInput, setSearchInput }}>
          <Header />
          <main>
            <Outlet />
          </main>{" "}
          <Footer />
        </SearchInputContext.Provider>
      </RefreshContext.Provider>
    </>
  );
};

export default RootLayout;
