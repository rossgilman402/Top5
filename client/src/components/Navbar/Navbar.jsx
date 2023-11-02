import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <h1>Top5</h1>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/Playlists">PlayLists</Link>
        </li>
        <li>
          <Link to="/Profile">Profile</Link>
        </li>
        <li>
          {Auth.loggedIn() ? (
            <Link to="/logout">Logout</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
