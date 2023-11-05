import React from "react";
import { Link } from "react-router-dom";

const SingularPlaylistEl = () => {
  const songs = [
    "Good Song",
    "Better Song",
    "Best Song",
    "Worst Song",
    "Bad Song",
  ];
  return (
    <>
      {songs.map((song, index) => (
        <div key={index} className="details">
          <Link to={`playlist-page`}> </Link>
          {/* <img src={song.artworkUrl} alt={song.name} /> */}
          <img
            className="song-art"
            src="https://via.placeholder.com/150"
            alt="song-art"
          />
          <div className="playlist-info">
            <h4 className="playlist">{song}</h4>
            <p className="artist">song.artist</p>
            <h5 className="duration">song.duration</h5>
          </div>
        </div>
      ))}
    </>
  );
};

export default SingularPlaylistEl;
