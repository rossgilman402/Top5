const typeDefs = `
  type User {
    _id: ID 
    email: String!
    password: String!
    playlist: [Playlist]
  }

  type Playlist {
    _id: ID
    name: String!
    img: String
    songs: [Song]
  }

  type Song {
    _id: ID
    name: String!
    uri: String!
  }

  type Message {
    _id: ID!
    text: String!
    user: User!
  }

  type Auth {
    token: ID!
    user: User
  }

  input SongInput {
    name: String!
    uri: String!
  }

  input PlaylistInput {
    name: String!
    img: String
    songs: [SongInput]!
  }

  type Query {
    getUsers: [User]
    getSingleUser(userId: ID!): User
    getPlaylists: [Playlist]
    getSinglePlaylist(playlistId: ID!): Playlist 
    getSingleSong(songId: ID!): Song
    getMessages: [Message]
  }

  type Mutation {
    addUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPlaylist(name: String): Playlist
    addPlaylistWithSongs(name: String!, songs: [SongInput]): Playlist
    addSong(name: String, uri: String): Song
    createMessage(text: String!): Message
  }
`;

module.exports = typeDefs;
