// const clientId = "f4f10d8cdc4c43cfb9696c430ba1cb5a";
// const clientSecret = "72ab0302629e417cb4ca0c834c4479e3";

const getSpotifyToken = async () => {
  // check if token is in localstorage
  let token = localStorage.getItem("spotify-token");

  // if token is in localstorage, return token
  // if token is not in localstorage, make request to spotify
  if (!token) {
    token = await getNewToken();
  } else {
    return token;
  }

  // then add token to localstorage
  if (!token) {
    console.log("Token fetch failed");
  } else {
    localStorage.setItem("spotify-token", token.access_token);
  }

  // then return token
  return token.access_token;
};

const getNewToken = async () => {
  const clientId = "f4f10d8cdc4c43cfb9696c430ba1cb5a";
  const clientSecret = "72ab0302629e417cb4ca0c834c4479e3";
  //   const baseUrl = "https://api.spotify.com/v1/";
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
  return tokenData;
};

export default getSpotifyToken;
