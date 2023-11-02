import React from "react";

const AddedSong = ({ song, onRemove }) => {
  return (
    <div>
      {song}
      <button onClick={onRemove}>Remove</button>
    </div>
  );
};

export default AddedSong;
