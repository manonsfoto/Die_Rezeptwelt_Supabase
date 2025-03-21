import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase/supabaseClient";
import EmailIcon from "../components/icons/EmailIcon";
import PasswordIcon from "../components/icons/PasswordIcon";
import { loginSchema } from "../lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [authError, setAuthError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setAuthError("");

    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        setAuthError(error.message);
        reset({ password: "" });
      } else if (authData.user) {
        navigate("/");
      }
    } catch (err) {
      console.error("Fehler beim Anmelden:", err);
      setAuthError(
        `Ein Fehler ist aufgetreten: ${
          err instanceof Error ? err.message : "Unbekannter Fehler"
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="hero bg-secondary min-h-screen mt-4 rounded-3xl">
        <div className="card bg-base-100 w-full max-w-sm ">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-3xl my-12 font-caprasimo">Anmelden</h1>

            <div className="form-control">
              <label className="input input-bordered flex items-center gap-2">
                <EmailIcon />
                <input
                  {...register("email")}
                  type="email"
                  className="grow"
                  placeholder="E-Mail"
                />
              </label>
              {errors.email && (
                <p className="text-error font-semibold text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="form-control">
              <label className="input input-bordered flex items-center gap-2">
                <PasswordIcon />
                <input
                  {...register("password")}
                  type="password"
                  className="grow"
                  placeholder="Passwort"
                />
              </label>
              {errors.password && (
                <p className="text-error font-semibold  text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
              <label className="label">
                <p className="label-text-alt link link-hover">
                  Passwort vergessen?
                </p>
              </label>
            </div>

            <button
              type="submit"
              className="btn bg-black hover:text-black text-base-100 rounded-full mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Anmelden"
              )}
            </button>

            <Link
              to="/signup"
              className="btn btn-ghost hover:bg-transparent hover:text-info rounded-full underline"
            >
              Noch kein Konto? Jetzt registrieren
            </Link>

            {authError && (
              <div className="alert alert-error shadow-lg mt-4">
                <div className="flex flex-col w-full">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-6 w-6 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-semibold">
                      Anmeldung fehlgeschlagen
                    </span>
                  </div>
                  <p className="text-sm mt-2">
                    {authError.includes("Invalid login credentials")
                      ? "Ungültige Anmeldedaten. Bitte überprüfe deine E-Mail und dein Passwort."
                      : authError.includes("Email not confirmed")
                      ? "E-Mail-Adresse nicht bestätigt. Bitte prüfe deine E-Mails und bestätige deine Registrierung."
                      : authError.includes("network")
                      ? "Netzwerkfehler. Bitte überprüfe deine Internetverbindung und versuche es erneut."
                      : authError}
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
