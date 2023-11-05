import { Link } from "react-router-dom";
import "./featuredPlaylist.css";

const FeaturePlaylist = () => {
  return (
    <div className="featured-container">
      <div className="feature-playlist">
        <div className="circle">
          <div className="play-button">
            {/* Change this to link we decide on */}
            <Link to="/your-playlist-page">
              <i className="fas fa-play"></i>
            </Link>
          </div>
          <div className="rotating-text">Featured Playlist</div>
        </div>
      </div>
    </div>
  );
};

export default FeaturePlaylist;
