import { Link } from "react-router-dom";
import "./featuredPlaylist.css";

const FeaturePlaylist = () => {
  const playlist = ["Featured Playlist of the Day"];
  return (
    <>
      <div className="featured-container">
        <div className="feature-playlist">
          <Link className="link" to="/chat">
            <div className="circle">
              <div className="rotating-text">Featured Playlist</div>
            </div>
          </Link>
        </div>
      </div>
      <Link to="/Playlist">
        <div className="details">
          {/* <img src={song.artworkUrl} alt={song.name} /> */}
          <img
            className="song-art"
            src="https://via.placeholder.com/150"
            alt="song-art"
          />
          <div className="playlist-info">
            <h4 className="playlist">{playlist}</h4>
            <p className="artist">song.artist</p>
            <h5 className="duration">song.duration</h5>
          </div>
        </div>
      </Link>
    </>
  );
};

export default FeaturePlaylist;
