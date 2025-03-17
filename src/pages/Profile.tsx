import { useContext, useEffect } from "react";
import { UserContext } from "../context/Context";
import { useNavigate } from "react-router-dom";
import StyledLinks from "../components/StyledLinks";

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
      <StyledLinks bgColor="bg-secondary" />
      <section className="hero bg-secondary min-h-screen mt-4 rounded-3xl">
        <div className="card bg-base-100 w-full max-w-sm ">
          <div className="card-body ">
            <h1 className="text-3xl  my-12 font-caprasimo">Profil</h1>
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
                <br />{" "}
                {user?.created_at && new Date(user.created_at).toLocaleString()}
              </p>
              <p>
                <strong>Zuletzt geändert am</strong>
                <br /> {user?.updated_at}
              </p>
              <p>
                <strong>Letzter Login</strong>
                <br /> {user?.last_sign_in_at}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
