import { useContext } from "react";
import { UserContext } from "../context/Context";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {user ? (
        <section className="flex flex-col justify-center items-center gap-5 border-solid border-4 rounded-md border-blue-300 p-8 w-fit mx-auto mt-10">
          <h1 className="text-2xl font-bold">Profil</h1>
          <div className="flex flex-col gap-2">
            <p>
              <strong>E-Mail:</strong> {user.email}
            </p>
            <p>
              <strong>Vorname:</strong> {user.user_metadata.first_name}
            </p>
            <p>
              <strong>Nachname:</strong> {user.user_metadata.last_name}
            </p>
            <p>
              <strong>Erstellt am:</strong>{" "}
              {new Date(user.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Zuletzt geändert am:</strong>{" "}
              {new Date(user.updated_at).toLocaleString()}
            </p>
            <p>
              <strong>Letzter Login:</strong>{" "}
              {new Date(user.last_sign_in_at).toLocaleString()}
            </p>
          </div>
        </section>
      ) : (
        <Link to={"/login"} className="btn btn-secondary  mt-24 ">
          Zum Log-In
        </Link>
      )}
    </>
  );
};

export default Profile;
