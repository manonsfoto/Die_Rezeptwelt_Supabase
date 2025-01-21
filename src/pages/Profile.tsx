import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

type TUserProfile = {
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
  last_sign_in_at: string;
};

const Profile = () => {
  const [profile, setProfile] = useState<TUserProfile | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          setError("Benutzer nicht angemeldet.");
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select(
            "first_name, last_name, users(email,  created_at, updated_at, last_sign_in_at)"
          )
          .eq("id", user.id)
          .single();

        if (error) {
          setError("Fehler beim Laden der Benutzerdaten.");
          console.error(error);
        } else {
          setProfile(data);
        }
      } catch (err) {
        console.error(err);
        setError("Ein unerwarteter Fehler ist aufgetreten.");
      }
    }

    fetchProfile();
  }, []);

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!profile) {
    return <p>Lade Profilinformationen...</p>;
  }

  return (
    <section className="flex flex-col justify-center items-center gap-5 border-solid border-4 rounded-md border-blue-300 p-8 w-fit mx-auto mt-10">
      <h1 className="text-2xl font-bold">Profil</h1>
      <div className="flex flex-col gap-2">
        <p>
          <strong>E-Mail:</strong> {profile.email}
        </p>
        <p>
          <strong>Vorname:</strong> {profile.first_name || "Nicht angegeben"}
        </p>
        <p>
          <strong>Nachname:</strong> {profile.last_name || "Nicht angegeben"}
        </p>
        <p>
          <strong>Erstellt am:</strong>{" "}
          {new Date(profile.created_at).toLocaleString()}
        </p>
        <p>
          <strong>Zuletzt geändert am:</strong>{" "}
          {new Date(profile.updated_at).toLocaleString()}
        </p>
        <p>
          <strong>Letzter Login:</strong>{" "}
          {new Date(profile.last_sign_in_at).toLocaleString()}
        </p>
      </div>
    </section>
  );
};

export default Profile;
