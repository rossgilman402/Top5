import { Link } from "react-router-dom";
import "./featuredPlaylist.css";

const FeaturePlaylist = () => {
  return (
    <div className="featured-container">
      <div className="feature-playlist">
        <Link className="link" to="/chat">
          <div className="circle">
            <div className="rotating-text">Featured Playlist</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FeaturePlaylist;
