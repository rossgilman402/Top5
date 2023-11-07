import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_FEATURED_PLAYLIST } from '../../utils/query';
import './featuredPlaylist.css';

const FeaturePlaylist = () => {
  const { loading, error, data } = useQuery(GET_FEATURED_PLAYLIST);
  console.log('DATAAA', data);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  const playlist = data.featuredPlaylist;

  // const playlist = ['Featured Playlist of the Day'];
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
      <Link to="/Playlist" style={{ 'text-decoration': 'none', width: '50%' }}>
        <div className="playlist-details">
          {/* <img src={song.artworkUrl} alt={song.name} /> */}
          <img
            className="playlist-art"
            src="https://via.placeholder.com/150"
            alt="song-art"
          />
          <div className="playlist-info">
            <h4 className="playlist-title">{playlist.name}</h4>
            <p className="user">{playlist.user.email}</p>
            {/* <h5 className="duration">playlist.length</h5> */}
          </div>
        </div>
      </Link>
    </>
  );
};

export default FeaturePlaylist;
