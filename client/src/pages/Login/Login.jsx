import "./Login.css";
import Top5 from "../../assets/top5-logo.png";
import SpotifyLogo from "../../assets/spotify-logo.png";
import SoundCloudLogo from "../../assets/soundcloud.png";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";

import Auth from "../../utils/auth";

// eslint-disable-next-line no-unused-vars
const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div className="main-container">
      {data ? (
        <Link to="/"></Link>
      ) : (
        <div className="login-container">
          <h1>Login or Create Account</h1>
          <img src={Top5} alt="Top5 Logo"></img>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              className="form-input"
              placeholder="Email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
            <label htmlFor="password">Password:</label>
            <input
              className="form-input"
              placeholder="**********"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
            <button className="btn" style={{ cursor: "pointer" }} type="submit">
              Submit
            </button>
          </form>
          {error && (
            <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
          )}
          <p>
            Don&apos;t have an account? <a href="#">Sign up for Top5</a>
          </p>
          <p>Or sign in with</p>
          <div className="extra-signup">
            <button>
              <img src={SpotifyLogo} alt="Spotify Logo"></img>
            </button>
            <button>
              <img src={SoundCloudLogo} alt="Sound Cloud Logo"></img>
            </button>
          </div>
          <Link className="goback" to="/">
            Go Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default Login;
