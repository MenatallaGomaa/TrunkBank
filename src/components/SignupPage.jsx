import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="container">
      <div className="form-box">
        <form className="form" onSubmit={handleSignupSubmit}>
          <h1>Signup</h1>

          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmail}
            className="input"
            autoComplete="off"
            placeholder="Email"
            required="user@cotrack.com"
          />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePassword}
            className="input"
            autoComplete="off"
            placeholder="Password"
          />

          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleName}
            className="input"
            autoComplete="off"
            placeholder="Name"
          />

          <button type="submit">Create Account</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p className="mt-10 mb-2">Already have an account?</p>
        <Link to={"/login"}> Log in</Link>
      </div>
    </div>
  );
}

export default SignupPage;
