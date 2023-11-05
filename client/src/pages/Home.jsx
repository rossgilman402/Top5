import Navbar from "../components/Navbar/Navbar";
import FeaturedPlayList from "../components/FeaturePlayList/FeaturePlaylist";
import SpotifyPlayer from "../components/SpotifyPlayer/SpotifyPlayer";
import SingularPlaylistEl from "../components/SingularPlaylistEl/SingularPlaylistEl";
const Home = () => {
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
