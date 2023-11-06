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
