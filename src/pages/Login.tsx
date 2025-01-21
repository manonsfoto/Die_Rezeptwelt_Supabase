import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { UserContext } from "../context/Context";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);

  const { setUser, user } = useContext(UserContext);

  const [error, setError] = useState<string>("");

  async function handleLogin() {
    const emailValue = emailRef.current?.value;
    const passwordValue = passwordRef.current?.value;

    if (!emailValue || !passwordValue) {
      setError("E-Mail und Passwort müssen ausgefüllt sein.");

      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailValue,
      password: passwordValue,
    });
    if (error) {
      setError(error.message);
      emailRef.current.value = "";
      passwordRef.current.value = "";
    }

    if (data.user) {
      setUser(data.user);
    }
    console.dir(data);
  }

  return user ? (
    <Link to={"/"}>
      {" "}
      <button className="btn btn-success mt-24 text-yellow-50">Zum Home</button>
    </Link>
  ) : (
    <section className="flex flex-col justify-center items-center gap-5 border-solid border-4 rounded-md border-orange-300 p-8 w-fit mx-auto mt-10">
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
          name="emailInput"
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

      <button type="button" className="btn btn-accent" onClick={handleLogin}>
        Log In
      </button>

      <Link to={"/signup"} className="btn ">
        Sign Up
      </Link>
      {/* <button type="button" className="btn " onClick={handleLogin}>
        Find my Password
      </button> */}
      {error.length > 0 && <p className="text-red-600">🚨{error}</p>}
    </section>
  );
};

export default Login;
