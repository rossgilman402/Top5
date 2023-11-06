import Navbar from "../Navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_PLAYLIST } from "../../utils/query";

import "./PlayList.css";
const PlayList = () => {
  // const songs = [
  //   "Good Song",
  //   "Better Song",
  //   "Best Song",
  //   "Worst Song",
  //   "Bad Song",
  // ];

  const { id: playlistId } = useParams();
  const { data } = useQuery(GET_SINGLE_PLAYLIST, { variables: { playlistId } });
  console.log(playlistId);
  let songs;
  songs = data?.getSinglePlaylist?.songs;
  const title = data?.getSinglePlaylist?.name;

  return (
    <>
      <Navbar />
      {/* <container className="playlist-card"> */}
      <div className="playlist">
        <h1>{title}</h1>
        <img src={songs && songs[0].img} alt="song picture"></img>
        {songs &&
          songs.map((song, index) => (
            <div key={index} className="details">
              <Link to={`playlist-page`}> </Link>
              {/* <img src={song.artworkUrl} alt={song.name} /> */}
              <img src={song.img} alt="song picture"></img>
              <div className="song-info">
                <h4 className="song">{song.name}</h4>
                <p className="artist">{song.artist}</p>
              </div>
            </div>
          ))}
      </div>
      {/* </container> */}
    </>
  );
};

export default PlayList;
