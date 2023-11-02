// import "./Login.css";
// import { useState } from "react";
// import SpotifyLogo from "../../assets/Spotify-logo.png";
// import { Link } from "react-router-dom";

// const Login = () => {
//   const [accessToken, setAccessToken] = useState("");
//   //Where to store accessToken?
//   //In local storage?

//   const submitSpotifty = async () => {
//     //Call our route that will post and get access to spotify token
//     //Then if success redirect to homepage if not then send back to login page
//     const response = await fetch("/getAccessToken", {
//       method: "POST",
//     });
//     if (response.ok) {
//       const data = await response.json();
//       setAccessToken(data.access_token);
//       return data;
//     } else {
//       throw new Error("Failed to get access token in React");
//     }
//   };

//   return (
//     <div className="main-container">
//       <div className="login-container">
//         <h1>Login or Create Account</h1>
//         <h3>Via Spotify</h3>
//         <img src={SpotifyLogo} alt="Spotify Logo"></img>
//         <button onClick={() => submitSpotifty}>Login</button>
//         <p>
//           Don&apos;t have an account? <a href="#">Sign up for Spotify</a>
//         </p>
//         <Link className="goback" to="/">
//           Go Back
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Login;
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
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Login</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
