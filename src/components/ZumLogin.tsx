import { Link } from "react-router-dom";
import Hero from "./Hero";

const ZumLogin = () => {
  return (
    <>
      {" "}
      <Hero
        text={
          "Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft und erleben Sie unvergessliche Momente bei Tisch."
        }
        imgUrl={
          "https://images.unsplash.com/photo-1577308856961-8e9ec50d0c67?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
      <Link
        to={"/login"}
        className="btn btn-secondary h-24 pr-12 pl-12 font-bold text-xl text-orange-950 mt-56 mb-64"
      >
        Zum Login
      </Link>
    </>
  );
};

export default ZumLogin;
