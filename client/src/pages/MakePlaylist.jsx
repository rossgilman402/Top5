import PlaylistNameImage from "../components/PlaylistNameImage/PlaylistNameImage";
import SongList from "../components/SongList/SongList";

//needs some sort of useEffect

//Need utils so that we can call api using axios is best method?

//Get a fetch method to get song options

//when user submits the song we add it to our playlist portion of database - also need to create a song first

const MakePlaylist = () => {
  return (
    <div>
      <PlaylistNameImage />
      <SongList />
    </div>
  );
};

export default MakePlaylist;
