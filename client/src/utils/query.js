import { gql } from '@apollo/client';

export const GET_PLAYLIST = gql`
  query GetPlaylists {
    getPlaylists {
      _id
      img
      name
      songs {
        _id
        img
        artist
        name
        uri
      }
      user {
        _id
        email
      }
    }
  }
`;

export const GET_SINGLE_PLAYLIST = gql`
  query Query($playlistId: ID!) {
    getSinglePlaylist(playlistId: $playlistId) {
      _id
      name
      user {
        email
      }
      songs {
        _id
        name
        uri
        artist
        img
      }
    }
  }
`;

export const GET_USER_EMAIL = gql`
  query GetUserEmail {
    user {
      email
    }
  }
`;

export const GET_FEATURED_PLAYLIST = gql`
  query GetFeaturedPlaylist {
    featuredPlaylist {
      name
      user {
        _id
        email
      }
      songs {
        _id
        name
        uri
        artist
        img
      }
    }
  }
`;
