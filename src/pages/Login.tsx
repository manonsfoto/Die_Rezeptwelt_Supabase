import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { UserContext } from "../context/Context";
import EmailIcon from "../assets/SVG/EmailIcon";
import PasswordIcon from "../assets/SVG/PasswordIcon";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);

  const { setUser } = useContext(UserContext);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
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
      navigate("/");
    }
  }

  return (
    <>
      <div className="hero bg-secondary min-h-screen mt-4 rounded-3xl">
        <div className="card bg-base-100 w-full max-w-sm ">
          <form className="card-body">
            <h1 className="text-3xl  my-12 font-caprasimo">Login</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2 font-semibold">
                  <EmailIcon /> Email
                </span>
              </label>
              <input
                type="email"
                ref={emailRef}
                name="emailInput"
                placeholder="email@rezeptwelt.com"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2 font-semibold ">
                  <PasswordIcon /> Password
                </span>
              </label>
              <input
                type="password"
                ref={passwordRef}
                name="passwordInput"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <p className="label-text-alt link link-hover">
                  Forgot password?
                </p>
              </label>
            </div>
            <div className="form-control mt-6">
              <button
                className="btn bg-black text-base-100 rounded-full"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>{" "}
            <Link
              to={"/signup"}
              className="btn btn-ghost  rounded-full underline "
            >
              Sign Up
            </Link>{" "}
            {error && (
              <p className="text-red-500 text-center font-semibold">{error}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
