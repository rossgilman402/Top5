import Navbar from '../components/Navbar/Navbar';
import PlayList from '../components/PlayList';
import SpotifyPlayer from '../components/SpotifyPlayer/SpotifyPlayer';
const Home = () => {
  return (
    <div>
      <Navbar />
      <SpotifyPlayer/>
    </div>
  );
};

export default Home;
