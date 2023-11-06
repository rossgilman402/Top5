import { Link } from 'react-router-dom';
import './featuredPlaylist.css';

const FeaturePlaylist = () => {
  const playlist = ['Featured Playlist of the Day'];
  return (
    <>
      <div className="featured-container">
        <div className="feature-playlist">
          <Link
            className="link"
            to="/chat"
            style={{ 'text-decoration': 'none' }}
          >
            <div className="circle">
              <div className="rotating-text">Featured Playlist</div>
            </div>
          </Link>
        </div>
      </div>
      <Link to="/Playlist">
        <div className="playlist-details">
          {/* <img src={song.artworkUrl} alt={song.name} /> */}
          <img
            className="playlist-art"
            src="https://via.placeholder.com/150"
            alt="song-art"
          />
          <div className="playlist-info">
            <h4 className="playlist-title">{playlist}</h4>
            <p className="user">user</p>
            <h5 className="duration">playlist.length</h5>
          </div>
        </div>
      </Link>
    </>
  );
};

export default FeaturePlaylist;
