const PlayList = ({ songs }) => {
  return (
    <div className="playlist">
      {songs.map((song, index) => (
        <div key={index} className="song">
          <img src={song.artworkUrl} alt={song.name} />
          <div className="song-info">
            <h4>{song.name}</h4>
            <p>{song.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayList;
