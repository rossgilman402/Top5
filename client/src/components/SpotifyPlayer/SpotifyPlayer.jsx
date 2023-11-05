import React, { useEffect, useState } from 'react';
import './SpotifyPlayer.css'; // Ensure this file contains the necessary styles

const SpotifyPlayer = () => {
  
  const [token,setToken]=useState('')
  const [uri,setUri] =useState('')
  
  
  
  const clientId = "f4f10d8cdc4c43cfb9696c430ba1cb5a";
      const clientSecret = "72ab0302629e417cb4ca0c834c4479e3";
    

      const getAccessToken = async (clientId, clientSecret) => {
        const tokenUrl = "https://accounts.spotify.com/api/token";
        const data = new URLSearchParams();
        data.append("grant_type", "client_credentials");

        const auth = btoa(`${clientId}:${clientSecret}`);
        const headers = {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        };

        const response = await fetch(tokenUrl, {
          method: "POST",
          headers,
          body: data,
        });
        const tokenData = await response.json();
        return tokenData.access_token;}
  
  getAccessToken (clientId,clientSecret).then(token=>setToken(token))
  setUri ("spotify:track:1IVSGg2yMoeMMTDx72qez4")
  console.log(token);
  
  
  useEffect(() => {
    if (token) {
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: 'Web Playback SDK Quick Start Player',
          getOAuthToken: cb => { cb(token); },
          volume: 0.5
        });

        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
          play(device_id, uri, token);
        });

        player.connect();
      };
    }

    // Play a specified track on the Web Playback SDK's device ID
    function play(device_id, uri, token) {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [uri] }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
    }

    // Cleanup function to remove the script and disconnect the player
    return () => {
      if (script) {
        script.remove();
      }
      if (player) {
        player.disconnect();
      }
    };
  }, [token, uri]);

  return (
    <div className="player-container">
      {/* Player UI goes here */}
    </div>
  );
};

export default SpotifyPlayer;
