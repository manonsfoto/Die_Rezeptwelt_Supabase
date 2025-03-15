import { useContext, useEffect } from "react";
import { UserContext } from "../context/Context";
import { Link, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";


const Profile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <Hero
        text={
          "Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft und erleben Sie unvergessliche Momente bei Tisch."
        }
        imgUrl={
          "https://images.unsplash.com/photo-1577308856961-8e9ec50d0c67?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
      <section className="flex flex-col justify-center items-center gap-5 border-solid border-4 rounded-md border-blue-300 p-8 w-fit mx-auto mt-28">
        <h1 className="text-2xl font-bold">Profil</h1>
        <div className="flex flex-col gap-2">
          <p>
            <strong>E-Mail:</strong> {user?.email}
          </p>
          <p>
            <strong>Vorname:</strong> {user?.user_metadata.first_name}
          </p>
          <p>
            <strong>Nachname:</strong> {user?.user_metadata.last_name}
          </p>
          <p>
            <strong>Erstellt am:</strong>{" "}
            {user?.created_at && new Date(user.created_at).toLocaleString()}
          </p>
          <p>
            <strong>Zuletzt geändert am:</strong> {user?.updated_at}
          </p>
          <p>
            <strong>Letzter Login:</strong> {user?.last_sign_in_at}
          </p>
          <div className="flex justify-between">
            <Link to={"/meine_rezepte"}>
              {" "}
              <button className="btn btn-success mt-24 text-yellow-50">
                Meine Rezepte 💖
              </button>
            </Link>
            <Link to={"/create_recipe"}>
              {" "}
              <button className="btn btn-info mt-24 text-yellow-50">
                Create New Recipe 📝
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
