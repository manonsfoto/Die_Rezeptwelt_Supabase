import {  useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp, SignUpData } from "../lib/supabase/actions";
import { signupSchema } from "../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
        `Ein Fehler ist aufgetreten: ${err instanceof Error ? err.message : "Unbekannter Fehler"}`
      );
    } finally {
      setIsSubmitting(false)
    }
  };

  return (
    <>
      <div className="hero bg-secondary min-h-screen mt-4 rounded-3xl">
        <div className="card bg-base-100 w-full max-w-sm">
          <form className="card-body pb-24" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-3xl my-12 font-caprasimo">Registrieren</h1>

            <div className="form-control w-full">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  {...register("firstName")}
                  type="text"
                  className="grow"
                  placeholder="Vorname"
                />
              </label>
              {errors.firstName && (
                <p className="text-error text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="form-control w-full">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  {...register("lastName")}
                  type="text"
                  className="grow"
                  placeholder="Nachname"
                />
              </label>
              {errors.lastName && (
                <p className="text-error text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className="form-control w-full">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  {...register("email")}
                  type="email"
                  className="grow"
                  placeholder="E-Mail"
                />
              </label>
              {errors.email && (
                <p className="text-error text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="form-control w-full">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  {...register("password")}
                  type="password"
                  className="grow"
                  placeholder="Passwort"
                />
              </label>
              {errors.password && (
                <p className="text-error text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="form-control w-full">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  className="grow"
                  placeholder="Passwort bestätigen"
                />
              </label>
              {errors.confirmPassword && (
                <p className="text-error text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn bg-black hover:text-black text-base-100 rounded-full mt-6"
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
              className="btn btn-ghost hover:bg-transparent hover:text-info rounded-full underline"
            >
              Schon registriert? Zum Login
            </Link>

            {error && (
              <p className="text-red-500 text-center font-semibold">
                🚨 {error}
              </p>
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
