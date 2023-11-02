import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="nav-container">
      <h1>Top5</h1>
      <ul className="list-container">
        <li>
          <Link className="link" to="/home">
            Home
          </Link>
        </li>
        <li>
          <Link className="link" to="/Playlists">
            PlayLists
          </Link>
        </li>
        <li>
          <Link className="link" to="/Profile">
            Profile
          </Link>
        </li>
        <li>
          {Auth.loggedIn() ? (
            <Link className="login-logout" to="/logout">
              Logout
            </Link>
          ) : (
            <Link className="login-logout" to="/login">
              Login
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
