import { useContext, useRef, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Link } from "react-router-dom";
import { UserContext } from "../context/Context";
import Hero from "../components/Hero";

type TUser = {
  email: string;
  password: string;
  options: {
    data: {
      first_name: string;
      last_name: string;
    };
  };
};

const Signup = () => {
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const firstNameRef = useRef<HTMLInputElement>(null!);
  const lastNameRef = useRef<HTMLInputElement>(null!);

  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { setUser } = useContext(UserContext);
  async function register() {
    const emailValue = emailRef.current?.value;
    const passwordValue = passwordRef.current?.value;
    const firstNameValue = firstNameRef.current?.value;
    const lastNameValue = lastNameRef.current?.value;

    if (!emailValue || !passwordValue || !firstNameValue || !lastNameValue) {
      setError(
        "Alle Felder (Vorname, Nachname, E-Mail, Passwort) müssen ausgefüllt sein."
      );
      setSuccess("");
      return;
    }

    const newUser: TUser = {
      email: emailValue,
      password: passwordValue,
      options: {
        data: {
          first_name: firstNameValue,
          last_name: lastNameValue,
        },
      },
    };

    const { data, error } = await supabase.auth.signUp(newUser);

    if (error) {
      setSuccess("");
      setError(error.message);
      emailRef.current.value = "";
      passwordRef.current.value = "";
      firstNameRef.current.value = "";
      lastNameRef.current.value = "";
    }
    if (data.user) {
      setError("");
      setUser(data.user);
      setSuccess("Bitte bestätige deine Registrierung per E-Mail 🥰");
      emailRef.current.value = "";
      passwordRef.current.value = "";
      firstNameRef.current.value = "";
      lastNameRef.current.value = "";
    }
  }

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
      <section className="flex flex-col justify-center items-center gap-5 border-solid border-4 rounded-md border-orange-300 p-8 w-fit mx-auto my-36">
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
            ref={firstNameRef}
            type="text"
            name="firstName"
            className="grow"
            placeholder="First Name"
          />
        </label>
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
            ref={lastNameRef}
            type="text"
            name="lastName"
            className="grow"
            placeholder="Last Name"
          />
        </label>
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
            ref={emailRef}
            name="email"
            type="text"
            className="grow"
            placeholder="Email"
          />
        </label>
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
            ref={passwordRef}
            type="password"
            name="password"
            placeholder="Password"
            className="grow"
          />
        </label>

        <button type="button" className="btn" onClick={register}>
          Registrieren
        </button>

        {error.length > 0 && <p className="text-red-600">🚨{error}</p>}
        {success.length > 0 && (
          <>
            {" "}
            <p className="text-green-900">{success}</p>{" "}
            <Link to={"/"}>
              {" "}
              <button className="btn btn-success mt-24 text-yellow-50">
                Zur Startseite
              </button>
            </Link>
          </>
        )}
      </section>
    </>
  );
};

export default Signup;
