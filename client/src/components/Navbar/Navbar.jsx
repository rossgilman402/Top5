import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="nav-container">
      <h1 className="nav-title">Top5</h1>
      <ul className="list-container">
        <li>
          <Link className="link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="link" to="/chat">
            Chat
          </Link>
        </li>
        <li>
          <Link className="link" to="/MakePlaylist">
            Make Playlist
          </Link>
        </li>
        <li>
          {Auth.loggedIn() ? (
            <Link className="login-logout" to="/" onClick={() => Auth.logout()}>
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
