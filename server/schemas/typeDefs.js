const typeDefs = `
    type User {
        _id: ID 
        email: String!
        password: String!
        playlists: [Playlist]!
    }
    type Playlist {
        _id: ID
        name: String!
        img: String
        songs: [Song]!
    }

    type Song {
        _id: ID
        name: String!
        uri: String!
        artist: String
        duration: String
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
    }

    type Mutation {
        addUser(email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addPlaylist(name: String!, img: String, songs: [Song]!): Playlist
    }
`;

module.exports = typeDefs;
