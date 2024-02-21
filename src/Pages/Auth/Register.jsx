import { useState } from "react";
import { useSnackbar } from "@mui/base/useSnackbar";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import bcrypt from "bcryptjs";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [open, setOpen] = useState(false);
  

  const handleClose = () => {
    setOpen(false);
  };

  const { onClickAway } = useSnackbar({
    onClose: handleClose,
    open,
    autoHideDuration: 3000,
  });

  const handleSignup = (e) => {
    e.preventDefault();
    if (name && email && password) {
      setOpen(true);
      const hashedPassword = bcrypt.hashSync(password, 10);
      if (localStorage.getItem(email)) {
        setSuccessMessage("User already exists");
      } else {
        const userData = { name, email, password: hashedPassword ,cart : [] };
        localStorage.setItem(email, JSON.stringify(userData));
        setSuccessMessage("Signup successful Back to Login");
      }
    } else {
      setSuccessMessage("Please fill all the fields");
    }
  };

  return (
    <div className="main">
      <div className="box-form">
        <div className="left">
          <div className="overlay">
            <h1>Welocome To Coral</h1>
            <p>
              Welcome to Coral, your premier destination for browsing a diverse
              range of high-quality products.
            </p>
          </div>
        </div>

        <div className="right">
          <h5>Register</h5>

          <form className="mt-3">
            <div>
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
            <div className="form-check d-inline-flex">
              <input
                className="form-check-input mt-3 bg-primary"
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
              Register
            </button>
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
      font-family: 'IBM Plex Sans', sans-serif;
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
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      animation: in-right 200ms;
      transition: transform 0.2s ease-out;
      }
    `}</style>
  );
}

export default Login;
