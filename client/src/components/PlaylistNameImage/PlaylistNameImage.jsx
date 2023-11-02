import React, { useState } from "react";
import "./playlistNameImage.css";

const PlaylistNameImage = () => {
  const [name, setName] = useState(""); // State to store the user's name

  // Function to handle name input changes
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="playlist-name-image">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Playlist Name"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div className="image-block">
        {/* Replace this when we have image options */}
        <img src="your-image-url.jpg" alt="Playlist Image" />
      </div>
    </div>
  );
};

export default PlaylistNameImage;
