import Navbar from "../components/Navbar/Navbar";
import FeaturedPlayList from "../components/FeaturePlayList/FeaturePlaylist";
import SpotifyPlayer from "../components/SpotifyPlayer/SpotifyPlayer";
import SingularPlaylistEl from "../components/SingularPlaylistEl/SingularPlaylistEl";
import { useState, useEffect } from "react";
import getSpotifyToken from "../utils/spotify-token";

const Home = () => {
  getSpotifyToken();

  return (
    <>
      <Navbar />
      <FeaturedPlayList />
      <SingularPlaylistEl />
      <SpotifyPlayer />
    </>
  );
};

export default Home;
