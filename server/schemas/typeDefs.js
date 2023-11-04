const typeDefs = `
    type User {
        _id: ID 
        email: String!
        password: String!
    }
    type Playlist {
        _id: ID
        name: String!
        img: String
        songs: [String]!
    }
    type Song {
        _id: ID
        name: String!
        uri: String!
    }

    type Auth {
        token: ID!
        user: User
      }

    type Query {
        getUsers: [User]
        getSingleUser(userId: ID!): User
        getPlaylists: [Playlist]
        getSinglePlaylist(playlistId: ID!): Playlist 
        getSingleSong: (songId: ID!): Song
    }

    type Mutation {
        addUser(email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addPlaylist(name: String!, img: String, songs: [String]!): Playlist
    }
`;

module.exports = typeDefs;
