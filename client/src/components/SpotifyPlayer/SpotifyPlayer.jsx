import React, { useEffect, useState } from 'react';
import './SpotifyPlayer.css';

const SpotifyPlayer = ({ accessToken, playlistUri }) => {
  const [player, setPlayer] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // Function to fetch playlist tracks from Spotify API
  const fetchPlaylistTracks = async () => {
    // Implement the API call to fetch tracks using the playlistUri and accessToken
    // Update the playlistTracks state with the fetched tracks
  };

  useEffect(() => {
    if (playlistUri && accessToken) {
      fetchPlaylistTracks();
    }

    // Set up the Spotify player
    // ...

  }, [accessToken, playlistUri]);

  // Function to handle track selection
  const selectTrack = (index) => {
    // Implement the logic to play the selected track using Spotify API
    setCurrentTrackIndex(index);
  };

  // Function to play the next track
  const playNextTrack = () => {
    const nextTrackIndex = (currentTrackIndex + 1) % playlistTracks.length;
    selectTrack(nextTrackIndex);
  };

  // Function to play the previous track
  const playPreviousTrack = () => {
    const prevTrackIndex = (currentTrackIndex - 1 + playlistTracks.length) % playlistTracks.length;
    selectTrack(prevTrackIndex);
  };

  // Render playlist tracks
  const renderPlaylistTracks = () => {
    return playlistTracks.map((track, index) => (
      <div key={index} onClick={() => selectTrack(index)} className="track-item">
        <img src={track.albumImageUrl} alt={track.name} className="track-image" />
        <div className="track-details">
          <div className="track-title">{track.name}</div>
          <div className="track-artist">{track.artists.join(', ')}</div>
        </div>
      </div>
    ));
  };

  return (
    <div className="player-container">
      <div className="playlist-tracks-container">
        {renderPlaylistTracks()}
      </div>
      <div className="img-container">
        <img src={playlistTracks[currentTrackIndex]?.albumImageUrl} alt={playlistTracks[currentTrackIndex]?.name} />
      </div>
      <div className="track-info">
        <h2 id="title">{playlistTracks[currentTrackIndex]?.name}</h2>
        <h3 id="artist">{playlistTracks[currentTrackIndex]?.artists.join(', ')}</h3>
      </div>
      <div className="spotify-controls">
        <button onClick={playPreviousTrack}>Previous</button>
        <button onClick={() => {}}>Play</button>
        <button onClick={() => {}}>Pause</button>
        <button onClick={playNextTrack}>Next</button>
      </div>
    </div>
  );
};

export default SpotifyPlayer;
