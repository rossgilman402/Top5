import React, { useState } from "react";
import AddedSong from "../AddedSong/AddedSong";

const SongList = () => {
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [newSong, setNewSong] = useState("");

  const handleAddSong = () => {
    if (newSong) {
      setSelectedSongs([...selectedSongs, newSong]);
      setNewSong(""); // Clear the input field
    }
  };

  const handleRemoveSong = (index) => {
    const updatedSongs = [...selectedSongs];
    updatedSongs.splice(index, 1);
    setSelectedSongs(updatedSongs);
  };

  return (
    <div>
      <h2>Song List</h2>
      <input
        type="text"
        value={newSong}
        onChange={(e) => setNewSong(e.target.value)}
        placeholder="Add a song"
      />
      <button onClick={handleAddSong}>Add</button>

      {selectedSongs.map((song, index) => (
        <AddedSong
          key={index}
          song={song}
          onRemove={() => handleRemoveSong(index)}
        />
      ))}
    </div>
  );
};

export default SongList;
