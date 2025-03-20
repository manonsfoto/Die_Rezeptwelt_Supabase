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
      <div className="hero bg-secondary min-h-screen mt-4 rounded-3xl">
        <div className="card bg-base-100 w-full max-w-sm">
          <form className="card-body pb-24" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-3xl my-12 font-caprasimo">Registrieren</h1>

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
                <p className="text-error text-sm mt-1">
                  {errors.firstName.message}
                </p>
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
                <p className="text-error text-sm mt-1">
                  {errors.lastName.message}
                </p>
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
                <p className="text-error text-sm mt-1">
                  {errors.email.message}
                </p>
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
                <p className="text-error text-sm mt-1">
                  {errors.password.message}
                </p>
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
              Schon registriert? Zum Anmelden
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
