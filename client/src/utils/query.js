import { gql } from '@apollo/client';

export const GET_PLAYLIST = gql`
  query GetPlaylists {
    getPlaylists {
      _id
      img
      name
      songs {
        _id
        name
        uri
      }
    }
  }
`;

export const GET_SINGLE_PLAYLIST = gql`
  query Query($playlistId: ID!) {
    getSinglePlaylist(playlistId: $playlistId) {
      _id
      name
      songs {
        _id
        name
        uri
      }
    }
  }
`;
