import React, { useEffect, useState } from 'react';
import './SpotifyPlayer.css'; // Make sure this is the path to your CSS file

const SpotifyPlayer = ({ accessToken }) => {
  const [player, setPlayer] = useState(null);
  const [currentTrack, setCurrentTrack] = useState({
    albumImageUrl: '', // Placeholder for album image URL
    artist: '',
    title: '',
  });

  useEffect(() => {
    if (accessToken && !player) {
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const spotifyPlayer = new window.Spotify.Player({
          name: 'Web Playback SDK Quick Start Player',
          getOAuthToken: cb => { cb(accessToken); },
          volume: 0.5
        });

        // Event listeners
        spotifyPlayer.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
        });

        spotifyPlayer.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        spotifyPlayer.addListener('player_state_changed', state => {
          if (!state) {
            return;
          }
          const currentTrack = state.track_window.current_track;
          setCurrentTrack({
            albumImageUrl: currentTrack.album.images[0].url,
            artist: currentTrack.artists.map(artist => artist.name).join(', '),
            title: currentTrack.name,
          });
        });

        setPlayer(spotifyPlayer);
        spotifyPlayer.connect();
      };
    }
  }, [accessToken, player]);

  // Control functions
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

  // Render player controls with album art
  return (
    <div className="spotify-player-container">
      <div className="track-info">
        <img src={currentTrack.albumImageUrl} alt="Album Art" className="album-art" />
        <div className="track-details">
          <h3>{currentTrack.title}</h3>
          <p>{currentTrack.artist}</p>
        </div>
      </div>
      <div className="player-controls">
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
        {/* Add more controls as needed */}
      </div>
    </div>
  );
};

export default SpotifyPlayer;
