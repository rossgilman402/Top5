import Navbar from "../components/Navbar/Navbar";
import FeaturedPlayList from "../components/FeaturePlayList/FeaturePlaylist";
import SpotifyPlayer from "../components/SpotifyPlayer/SpotifyPlayer";
const Home = () => {
  return (
    <>
      <Navbar />
      <FeaturedPlayList />
      <SpotifyPlayer />
    </>
  );
};

export default Home;
