const { User, Playlist, Song } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth.js");

const resolvers = {
  Query: {
    getUsers: async (context) => {
      if (context.user) {
        return User.find({}).populate("playlists");
      }
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
    getSingleSong: async (_, { songId }) => {
      return Song.findOne({ _id: songId });
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
    addPlaylist: async (parent, { name }, context) => {
      console.log(context.user);
      if (context.user) {
        const playlist = await Playlist.create({ name });

        const test = await User.findByIdAndUpdate(context.user._id, {
          $push: { playlists: playlist },
        });
        console.log(test);
        return playlist;
      }
    },
    addSong: async (parent, { name, uri }, context) => {
      try {
        // Step 1: Create the song
        const song = await Song.create({ name, uri });

        // Step 2: You can choose to associate the song with a playlist later
        // For now, return the created song
        return song;
      } catch (error) {
        throw new Error("Song creation failed");
      }
    },
  },
};

module.exports = resolvers;
