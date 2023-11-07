import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        password
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      token
      user {
        _id
        email
        password
      }
    }
  }
`;

export const ADD_PLAYLIST = gql`
  mutation AddPlaylist($name: String!, $songs: [SongInput]) {
    addPlaylistWithSongs(name: $name, songs: $songs) {
      _id
      name
      songs {
        name
        uri
        _id
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation Mutation($text: String!) {
    createMessage(text: $text) {
      _id
      text
      user {
        _id
        email
        password
      }
    }
  }
`;
