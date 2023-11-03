// eslint-disable-next-line react/prop-types
const AddedSong = ({ song, onRemove }) => {
  return (
    <div className="added-song">
      <p>{song.name}</p>
      {/* <p>Artist: {song.artist}</p>
      <p>Album: {song.album}</p> */}
      <button onClick={onRemove}>Remove</button>
    </div>
  );
};

export default AddedSong;
