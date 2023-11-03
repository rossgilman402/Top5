const { User, Playlist, Song } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth.js");

const resolvers = {
  Query: {
    getUsers: async () => {
      return User.find({});
    },
    getPlaylists: async () => {
      return Playlist.find({});
    },
    getSingleUser: async (_, { userId }) => {
      return User.findOne({ _id: userId });
    },
    getSinglePlaylist: async (_, { playlistId }) => {
      return Playlist.findOne({ _id: playlistId });
    },
  },
  Mutation: {
    addUser: async (parent, { email, password }) => {
      console.log(email);
      const user = await User.create({ email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addPlaylist: async (parent, { name, songs, img }) => {
      try {
        // Step 1: Create the playlist
        const playlist = await Playlist.create({ name, img });

        // Step 2: Create song documents and associate them with the playlist
        const songDocs = await Promise.all(
          songs.map((song) =>
            Song.create({ name: song, playlist: playlist._id })
          )
        );

        // Step 3: Update the user's document to include the new playlist
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { playlists: playlist._id } },
          { new: true }
        );

        return { playlist };
      } catch (error) {
        throw new Error("Playlist creation failed");
      }
    },
  },
};

module.exports = resolvers;
