import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_FEATURED_PLAYLIST } from '../../utils/query';
import { useState, useEffect } from 'react';
import './featuredPlaylist.css';

const FeaturePlaylist = () => {
  const [playlist, setPlaylist] = useState(
    JSON.parse(localStorage.getItem('featuredPlaylist'))
  );
  const date = new Date().toDateString();

  const { loading, error, data } = useQuery(GET_FEATURED_PLAYLIST, {
    skip: playlist && localStorage.getItem('featuredPlaylistDate') === date,
  });

  useEffect(() => {
    if (data && data.featuredPlaylist) {
      setPlaylist(data.featuredPlaylist);
      localStorage.setItem(
        'featuredPlaylist',
        JSON.stringify(data.featuredPlaylist)
      );
      localStorage.setItem('featuredPlaylistDate', date);
    }
  }, [data, date]);

  console.log('DATAAA', data);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  // const playlist = data.featuredPlaylist;

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
      {playlist && (
        <Link
          to="/Playlist"
          style={{ 'text-decoration': 'none', width: '50%' }}
        >
          <div className="playlist-details">
            {/* <img src={song.artworkUrl} alt={song.name} /> */}
            <img
              className="playlist-art"
              src={playlist.songs[0].img}
              alt="song-art"
            />
            <div className="playlist-info">
              <h4 className="playlist-title">{playlist.name}</h4>
              <p className="user">{playlist.user.email.split('@')[0]}</p>
              {/* <h5 className="duration">playlist.length</h5> */}
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default FeaturePlaylist;
