import "./Login.css";
import SpotifyLogo from "../../assets/Spotify-logo.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="main-container">
      <div className="login-container">
        <h1>Login or Create Account</h1>
        <h3>Via Spotify</h3>
        <img src={SpotifyLogo} alt="Spotify Logo"></img>
        <button>Login</button>
        <p>
          Don&apos;t have an account? <a href="#">Sign up for Spotify</a>
        </p>
        <Link to="/Home">Go Back</Link>
      </div>
    </div>
  );
};

export default Login;
