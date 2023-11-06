import React, { useEffect, useState } from "react";
import "./SpotifyPlayer.css"; // Ensure this file contains the necessary styles
import getSpotifyToken from "../../utils/spotify-token";

const SpotifyPlayer = () => {
  const [player, setPlayer] = useState(null);
  const [currentTrack, setCurrentTrack] = useState({
    albumImageUrl: "", // Placeholder for album image URL
    title: "Track Title", // Placeholder for track title
    artist: "Track Artist", // Placeholder for artist name
  });

  useEffect(() => {
    getSpotifyToken().then((accessToken) => {
      console.log("accessToken", accessToken);
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const spotifyPlayer = new window.Spotify.Player({
          name: "Web Playback SDK Quick Start Player",
          getOAuthToken: (cb) => {
            cb(accessToken);
          },
        });

        // Event listeners for player state
        spotifyPlayer.addListener("player_state_changed", (state) => {
          if (state) {
            const { track_window, paused } = state;
            const { current_track } = track_window;

            // Extract track information from state
            const albumImageUrl = current_track.album.images[0].url;
            const title = current_track.name;
            const artist = current_track.artists
              .map((artist) => artist.name)
              .join(", ");

            setCurrentTrack({
              albumImageUrl,
              title,
              artist,
            });
          }
        });

        // Ready
        spotifyPlayer.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
        });

        // Not Ready
        spotifyPlayer.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        setPlayer(spotifyPlayer);
        spotifyPlayer.connect();
      };
    });
  }, []);

  // Example control functions
  const play = () => {
    player.resume().then(() => {
      console.log("Resumed!");
    });
  };

  const pause = () => {
    player.pause().then(() => {
      console.log("Paused!");
    });
  };

  // Render player controls
  return (
    <div className="player-container">
      <div className="img-container">
        <img src={currentTrack.albumImageUrl} alt="Album Art" />
      </div>
      <div className="track-info">
        <h2 id="title">{currentTrack.title}</h2>
        <h3 id="artist">{currentTrack.artist}</h3>
      </div>
      <div className="spotify-controls">
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
        {/* Add more controls as needed */}
      </div>
    </div>
  );
};

export default SpotifyPlayer;
