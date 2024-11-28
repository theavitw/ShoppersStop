import { useState, FormEvent, useEffect } from "react";
import "./Auth.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useProductContext } from "../../Context/DataContext";
import React from "react";
import bcrypt from "bcryptjs";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { Link } from "@mui/material";
import LeftAuthCard from "./LeftAuthCard";

function Login(): JSX.Element {
  const { Name } = useProductContext();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [check, setCheck] = useState<boolean>(false);
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const Handlecheck = () => {
    setCheck(!check);
    Cookies.set("check", String(check));
  };

  useEffect(() => {
    if (user && user.access_token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user?.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => {
          console.error("OAuth Error:", err.response?.data || err.message);
        });
    }
  }, [user]);

  useEffect(() => {
    if (profile && profile.email) {
      const { name, email, id } = profile;
      axios
        .post("https://shoptank-backend.onrender.com/login", { name, email, id })
        .then((res) => {
          console.log(res.data);
          if (res.status === 200 && res.data.user) {
            localStorage.setItem("profile", JSON.stringify(profile));
            const token = Math.random().toString(36).substr(2);
            localStorage.setItem("token", token);
            window.location.href = "/HomePage";
            window.localStorage.setItem(email, JSON.stringify(res.data.user));
            window.localStorage.setItem("email", email);
            window.sessionStorage.setItem("email", email);
          }
        })
        .catch((err) => {
          setErrorMessage(err?.response.data.string);

          setUser([]);
          setProfile([]);
          localStorage.clear();
        });
    }
  }, [profile]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const userData = await axios
      .post("https://shoptank-backend.onrender.com/login", {
        email,
        password,
      })
      .then((response) => {
        return response.data.user;
      })
      .catch((error) => {
        setErrorMessage(error.response.data.string);
      });
    if (userData) {
      let isPasswordValid = bcrypt.compareSync(password, userData?.password);
      if (isPasswordValid) {
        const token = Math.random().toString(36).substr(2);
        localStorage.setItem("token", token);
        window.location.href = "/HomePage";
        window.localStorage.setItem(email, JSON.stringify(userData));
        window.localStorage.setItem("email", email);
        window.sessionStorage.setItem("email", email);
      } else {
        setErrorMessage("Invalid email or password");
        localStorage.clear();
      }
    }
    e.preventDefault();
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse: any) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <div className="main">
      <div className="box-form ">
        <LeftAuthCard />

        <div className="right position-relative">
          <h5>Sign In</h5>
          <div className="mb-3">
            <span className="text-dark font-weight-bold ">
              {" "}
              Do not have an account?{" "}
            </span>
            <Link variant="body1" underline="none" href="/register">
              Sign-up
            </Link>
          </div>
          <div className="google-login-button" onClick={() => login()}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              version="1.1"
              x="0px"
              y="0px"
              className="google-icon"
              viewBox="0 0 48 48"
              height="1.5em"
              width="1.5em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            <span>SignIn with Google</span>
          </div>

          <div className="m-3 d-flex justify-content-center 			">
            ----- OR -----
          </div>

          <form className="mt-3" onSubmit={handleLogin} method="POST">
            <div>
              <label
                htmlFor="validationDefaultEmail"
                className="form-label mt-2"
              >
                Email
              </label>
              <span className="text-danger fw-bolder p-1">*</span>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  id="validationDefaultEmail"
                  aria-describedby="inputGroupPrepend2"
                  required
                />
              </div>
              <label htmlFor="form-label mt-2">Password</label>
              <span className="text-danger fw-bolder p-1">*</span>
              <div className="input-group">
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  id="psw"
                  name="password"
                  required
                />
              </div>
            </div>
            <input
              type="checkbox"
              checked={check}
              className="form-check-input mt-3 bg-primary"
              onClick={Handlecheck}
            />
            <label className="form-check-label m-3">Remember me</label>
            {errorMessage && (
              <div className="text-danger font-weight-bold">{errorMessage}</div>
            )}
            <div>
              <button className="btn" type="submit">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
