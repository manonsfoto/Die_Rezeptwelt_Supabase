import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp, SignUpData } from "../lib/supabase/actions";
import { signupSchema } from "../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import UserIcon from "../components/icons/UserIcon";
import EmailIcon from "../components/icons/EmailIcon";
import PasswordIcon from "../components/icons/PasswordIcon";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

const Signup = () => {
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const userData: SignUpData = {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        firstName: data.firstName,
        lastName: data.lastName,
      };

      const { success, user, error } = await signUp(userData);

      if (error) {
        setError(error.message);
      } else if (success && user) {
        setSuccess("Bitte bestätige deine Registrierung per E-Mail 🥰");
        reset();
      }
    } catch (err: unknown) {
      console.error("Fehler bei der Registrierung:", err);
      setError(
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
      <div className="stn-secondary">
        <div className="card bg-base-100 w-full max-w-sm">
          <form className="card-body pb-24" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="headline-1 my-12">Registrieren</h1>

            <div className="form-control w-full">
              <label className="input input-bordered flex items-center gap-2">
                <UserIcon />
                <input
                  {...register("firstName")}
                  type="text"
                  className="grow"
                  placeholder="Vorname"
                />
              </label>
              {errors.firstName && (
                <p className="text-error-form">{errors.firstName.message}</p>
              )}
            </div>

            <div className="form-control w-full">
              <label className="input input-bordered flex items-center gap-2">
                <UserIcon />
                <input
                  {...register("lastName")}
                  type="text"
                  className="grow"
                  placeholder="Nachname"
                />
              </label>
              {errors.lastName && (
                <p className="text-error-form">{errors.lastName.message}</p>
              )}
            </div>

            <div className="form-control w-full">
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
                <p className="text-error-form">{errors.email.message}</p>
              )}
            </div>

            <div className="form-control w-full">
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
                <p className="text-error-form">{errors.password.message}</p>
              )}
            </div>

            <div className="form-control w-full">
              <label className="input input-bordered flex items-center gap-2">
                <PasswordIcon />
                <input
                  {...register("confirmPassword")}
                  type="password"
                  className="grow"
                  placeholder="Passwort bestätigen"
                />
              </label>
              {errors.confirmPassword && (
                <p className="text-error-form">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn-action mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Registrieren"
              )}
            </button>

            <Link
              to="/login"
              className="btn-underline"
            >
              Schon registriert? Zum Anmelden
            </Link>

            {error && (
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
                      Registrierung fehlgeschlagen
                    </span>
                  </div>
                  <p className="text-sm mt-2">
                    {error.includes("Email already registered")
                      ? "Diese E-Mail-Adresse ist bereits registriert. Bitte verwende eine andere E-Mail oder melde dich an."
                      : error.includes("Password")
                      ? "Bitte überprüfe dein Passwort. Es muss mindestens 6 Zeichen lang sein."
                      : error.includes("network")
                      ? "Netzwerkfehler. Bitte überprüfe deine Internetverbindung und versuche es erneut."
                      : error}
                  </p>
                  {error.includes("Email already registered") && (
                    <Link
                      to="/login"
                      className="text-sm underline mt-2 self-end"
                    >
                      Zum Login
                    </Link>
                  )}
                </div>
              </div>
            )}

            {success && (
              <p className="text-green-600 text-center font-semibold">
                {success}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
