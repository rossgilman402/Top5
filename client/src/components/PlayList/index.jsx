import { Link } from 'react-router-dom';
const PlayList = ({}) => {
  const songs = [
    'Good Song',
    'Better Song',
    'Best Song',
    'Worst Song',
    'Bad Song',
  ];
  return (
    <div className="playlist">
      {songs.map((song, index) => (
        <div key={index} className="song">
          <Link to={`playlist-page`}> </Link>
          {/* <img src={song.artworkUrl} alt={song.name} /> */}
          <div className="song-info">
            <h4>{song}</h4>
            <p>song.artist</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayList;
