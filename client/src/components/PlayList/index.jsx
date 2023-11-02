import React from 'react';
import { Link } from 'react-router-dom';
import './PlayList.css';
const PlayList = ({}) => {
  const songs = [
    'Good Song',
    'Better Song',
    'Best Song',
    'Worst Song',
    'Bad Song',
  ];
  return (
    <>
      <container className="playlist-card">
        <div className="playlist">
          <h1>Playlist Name</h1>
          <img
            className="playlist-img"
            src="https://via.placeholder.com/150"
            alt="playlist"
          />
          {songs.map((song, index) => (
            <div key={index} className="details">
              <Link to={`playlist-page`}> </Link>
              {/* <img src={song.artworkUrl} alt={song.name} /> */}
              <img
                className="song-art"
                src="https://via.placeholder.com/150"
                alt="song-art"
              />
              <div className="song-info">
                <h4 className="song">{song}</h4>
                <p className="artist">song.artist</p>
                <h5 className="duration">song.duration</h5>
              </div>
            </div>
          ))}
        </div>
      </container>
    </>
  );
};

export default PlayList;
