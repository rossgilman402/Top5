import './AddedSong.css';

// eslint-disable-next-line react/prop-types
const AddedSong = ({ song, onRemove }) => {
  return (
    <div className="added-song">
      <p className="song-name">{song.name}</p>
      {/* <p>Artist: {song.artist}</p> */}
      {/* <p>Album: {song.album}</p> */}
      <button className="remove-btn" onClick={onRemove}>
        Remove
      </button>
    </div>
  );
};

export default AddedSong;
