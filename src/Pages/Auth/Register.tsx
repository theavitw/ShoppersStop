import { useEffect, useState } from "react";
import { useSnackbar } from "@mui/base/useSnackbar";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import React from "react";
import "./Auth.css";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Divider, Typography } from "@mui/material";
import { Link } from "@mui/material";
import LeftAuthCard from "./LeftAuthCard";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    console.log(user);
    if (user) {
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
    if (profile && profile?.email) {
      localStorage.setItem("profile", JSON.stringify(profile));
      const { name, email, id } = profile;
      axios
        .post("http://localhost:8080/register", { name, email, id })
        .then((res) => {
          console.log("google login success:", res.data);
          setSuccessMessage(res.data);
          setOpen(true);
        })
        .catch((err) => {
          console.error("Login Error:", err.response?.data || err.message);
          setSuccessMessage(err.response?.data || err.message);
          setOpen(true);
          logOut();
          localStorage.clear();
        });
    }
  }, [profile]);

  const handleClose = () => {
    setOpen(false);
  };

  const { onClickAway } = useSnackbar({
    onClose: handleClose,
    open,
    autoHideDuration: 3000,
  });

  const handleSignup = async (e : any) => {
    e.preventDefault();

    if (name && email && password) {
      setOpen(true);
      const userData = { name, email, password, cart: [] };

      try {
        const response = await fetch("http://localhost:8080/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const data = await response.text();
        setSuccessMessage(data);

        if (response.status === 201) {
          setSuccessMessage("Signup successful. Back to Login");
        } else {
          setSuccessMessage(data);
        }
      } catch (error) {
        console.error("Error:", error);
        setSuccessMessage("Error occurred during signup");
      }
    } else {
      setSuccessMessage("Please fill all the fields");
    }
  };

  const logOut = () => {
    googleLogout();
    setProfile([]);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse: any) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <div className="main">
      <div className="box-form">
        <LeftAuthCard />

        <div className="right">
          <h5>Sign Up</h5>
          {/* <button onClick={logOut}>Log out</button> */}

          <form className="mt-3">
            <div className="buttons-container">
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
                <span>Sign up with Google</span>
              </div>
            </div>
            <div className="m-3 d-flex justify-content-center">
              ----- OR -----
            </div>
            <div>
              <div className="input-group"></div>
              <label
                htmlFor="validationDefaultUsername"
                className="form-label mt-2"
              >
                Username
              </label>
              <div className="input-group">
                <input
                  placeholder="Name"
                  type="text"
                  id="validationDefaultUsername"
                  aria-describedby="inputGroupPrepend2"
                  required
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  className="form-control"
                />
              </div>
              <label
                htmlFor="validationDefaultEmail"
                className="form-label mt-2"
              >
                Email
              </label>
              <div className="input-group">
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  id="validationDefaultEmail"
                  aria-describedby="inputGroupPrepend2"
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <label htmlFor="psw" className="form-label mt-2">
                Password
              </label>
              <div className="input-group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="form-check d-inline-flex gap-2">
              <input
                className="form-check-input mt-3 bg-danger"
                type="checkbox"
                value=""
                id="invalidCheck2"
                required
              />
              <label className="form-check-label mt-3" htmlFor="invalidCheck2">
                Agree to terms and conditions
              </label>
            </div>
            <button
              className="TriggerButton"
              type="submit"
              onClick={handleSignup}
            >
              Sign Up
            </button>
            <Typography
              className="mt-3 text-black"
              variant="body1"
              component="p"
            >
              Already have an account?{" "}
              <Link variant="body1" underline="none" href="/login">
                Sign-in
              </Link>
            </Typography>
            {successMessage && (
              <div>
                <a href="/login" className="btn btn-success m-3">
                  Back to Login
                </a>
              </div>
            )}
            {open ? (
              <ClickAwayListener onClickAway={onClickAway}>
                <div className="CustomSnackbar">{successMessage}</div>
              </ClickAwayListener>
            ) : null}
            <Styles />
          </form>
        </div>
      </div>
    </div>
  );
}

function Styles() {
  return (
    <style>{`
    @keyframes in-right {
      from {
        transform: translateX(100%);
      }

      to {
        transform: translateX(0);
      }
    }

    .TriggerButton {
      font-weight: 600;
      font-size: 0.875rem;
      line-height: 1.5;
      padding: 8px 16px;
      border-radius: 8px;
      color: white;
      transition: all 150ms ease;
      cursor: pointer;
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

      &:focus-visible {
        outline: none;
      }
    }

    .CustomSnackbar {
      position: fixed;
      z-index: 5500;
      display: flex;
      right: 16px;
      bottom: 16px;
      left: auto;
      justify-content: start;
      max-width: 560px;
      min-width: 300px;
      border-radius: 8px;
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      background: lightblue;
      padding: 0.75rem;
      font-weight: 500;
      animation: in-right 200ms;
      transition: transform 0.2s ease-out;
      }
    `}</style>
  );
}

export default Register;
