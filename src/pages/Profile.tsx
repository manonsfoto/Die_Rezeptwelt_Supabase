import { Link } from "react-router-dom";
import StyledLinks from "../components/StyledLinks";
import { formatDate } from "../lib/utils";
import { useAuthStore } from "../store/authStore";

const Profile = () => {
  const { user } = useAuthStore();

  return (
    <>
      <StyledLinks bgColor="bg-secondary" />
      <section className="stn-secondary max-w-7xl w-full">
        <div className="card bg-base-100 w-full max-w-sm my-12">
          <div className="card-body ">
            <h1 className="headline-1  my-12">Profil</h1>
            <div className="flex flex-col gap-2 font-semibold text-xl">
              <p>
                <strong> E-Mail</strong>
                <br /> {user?.email}
              </p>
              <p>
                <strong>Vorname</strong>
                <br /> {user?.user_metadata.first_name}
              </p>
              <p>
                <strong>Nachname</strong>
                <br /> {user?.user_metadata.last_name}
              </p>
              <p>
                <strong>Erstellt am</strong>
                <br /> {formatDate(user?.created_at)}
              </p>
              <p>
                <strong>Zuletzt geändert am</strong>
                <br /> {formatDate(user?.updated_at)}
              </p>
              <p>
                <strong>Letzter Login</strong>
                <br /> {formatDate(user?.last_sign_in_at)}
              </p>
            </div>
            <Link className="btn-underline" to="/create_recipe">
              Neues Rezept erstellen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
