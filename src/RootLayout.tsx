import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";
import { SearchInputContext } from "./context/Context";

const RootLayout = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  return (
    <>
      <SearchInputContext.Provider value={{ searchInput, setSearchInput }}>
        <Header />
        <main>
          <Outlet />
        </main>{" "}
        <Footer />
      </SearchInputContext.Provider>
    </>
  );
};

export default RootLayout;
