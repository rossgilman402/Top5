import React, { useEffect, useState } from 'react';

const SpotifyPlayer = ({ accessToken }) => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (accessToken) {
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const spotifyPlayer = new window.Spotify.Player({
          name: 'Web Playback SDK Quick Start Player',
          getOAuthToken: cb => { cb(accessToken); }
        });

        // Ready
        spotifyPlayer.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
        });

        // Not Ready
        spotifyPlayer.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        setPlayer(spotifyPlayer);

        // Connect to the player!
        spotifyPlayer.connect();
      };
    }
  }, [accessToken]);

  // Example control functions
  const play = () => {
    player.resume().then(() => {
      console.log('Resumed!');
    });
  };

  const pause = () => {
    player.pause().then(() => {
      console.log('Paused!');
    });
  };

  // Render player controls
  return (
    <div>
      <div>Spotify Player</div>
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
    </div>
  );
};

export default SpotifyPlayer;
