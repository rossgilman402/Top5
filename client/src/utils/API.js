// Replace with your Spotify API credentials
const clientId = "f4f10d8cdc4c43cfb9696c430ba1cb5a";
const clientSecret = "72ab0302629e417cb4ca0c834c4479e3";

// Your playlist ID
const playlistId = "5ZcIGiocUmCTh2frXlcK9G";

// Define the Spotify API base URL
const baseUrl = "https://api.spotify.com/v1/";

// Function to get an access token
async function getAccessToken(clientId, clientSecret) {
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
  return tokenData.access_token;
}

// Get an access token
getAccessToken(clientId, clientSecret)
  .then((accessToken) => {
    // Make the GET request to retrieve the playlist
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const endpoint = `playlists/${playlistId}`;
    const url = baseUrl + endpoint;

    fetch(url, { headers })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(
            `Failed to retrieve playlist. Status code: ${response.status}`
          );
        }
      })
      .then((playlistData) => {
        // Process the playlist data here
        console.log(playlistData.tracks.items[0].track);
      })
      .catch((error) => {
        console.error(error);
      });
  })
  .catch((error) => {
    console.error("Failed to obtain access token:", error);
  });
