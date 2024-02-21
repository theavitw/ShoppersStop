import { useState } from "react";
import "./Auth.css";
import bcrypt from "bcryptjs";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem(email));
    if (!userData) {
      setErrorMessage("Invalid email or password");
      return;
    }

    let isPasswordValid = bcrypt.compareSync(password, userData.password); // true
    console.log(password, userData.password, isPasswordValid);
    if (userData && isPasswordValid) {
      const token = Math.random().toString(36).substr(2);
      localStorage.setItem("token", token);
      window.location = "/HomePage";
    } else {
      setErrorMessage("Invalid email or password");

      setTimeout(() => {
        setErrorMessage("");
      }, [5000]);
    }
  };
  return (
    <div className="main">
      <div className="box-form ">
        <div className="left">
          <div className="overlay">
            <h1>Welocome To Coral</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              et est sed felis aliquet sollicitudin
            </p>
          </div>
        </div>

        <div className="right">
          <h5>Sign In</h5>
          {errorMessage && <div>{errorMessage}</div>}

          <form className="mt-3" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="validationDefaultEmail"
                className="form-label mt-2"
              >
                Email
              </label>
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
              <label htmlFor="   form-label mt-2">Password</label>
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
            <div>
              <a href="/register">
                <button className="btn mt-3" type="submit">
                  Sign In
                </button>
              </a>
            </div>
          </form>
          <div>
            <h4 className="mt-3"> Do not have an account? </h4>
            <a href="/register">
              <button type="submit">Register</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
