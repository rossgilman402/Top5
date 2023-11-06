import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PLAYLIST } from "../../utils/query";

import "./singularPlaylist.css";

const SingularPlaylistEl = () => {
  // const songs = [
  //   "Good Song",
  //   "Better Song",
  //   "Best Song",
  //   "Worst Song",
  //   "Bad Song",
  // ];

  // const playlists = [
  //   "Playlist 1",
  //   "Playlist 2",
  //   "Playlist 3",
  //   "Playlist 4",
  //   "Playlist 5",
  // ];

  const { data } = useQuery(GET_PLAYLIST);
  let playlists;
  if (data) {
    playlists = data?.getPlaylists;
    console.log(playlists);
  }

  return (
    <>
      <div className="button-box">
        <Link to="/makeplaylist" style={{ "text-decoration": "none" }}>
          <button className="button">Make Playlist</button>
        </Link>
      </div>
      <h1 className="playlist-feed">Playlist Feed</h1>
      {playlists &&
        playlists.map((playlist, index) => (
          <>
            <Link to={"./playlist/" + playlist._id}>
              <div key={index} className="playlist-details">
                {/* <img src={song.artworkUrl} alt={song.name} /> */}
                <img
                  className="playlist-art"
                  src="https://via.placeholder.com/150"
                  alt="song-art"
                />
                <div className="playlist-info">
                  <h4 className="playlist-title">{playlist.name}</h4>
                  <p className="user">user</p>
                </div>
              </div>
            </Link>
          </>
        ))}
    </>
  );
};

export default SingularPlaylistEl;
