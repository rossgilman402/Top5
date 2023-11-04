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
    addPlaylist: async (parent, { name, songs, img }, context) => {
      try {
        // Step 1: Create the playlist
        const playlist = await Playlist.create({ name, img });

        // Step 2: Create song documents and associate them with the playlist
        const songPromises = songs.map(
          async (song) =>
            await Song.create({ name: song, playlist: playlist._id })
        );

        const songDocs = await Promise.all(songPromises);

        // Step 3: Add created songs to the playlist through playlist Id
        const updatedPlaylist = await Playlist.findOneAndUpdate(
          { _id: playlist._id },
          { $addToSet: { songs: { $each: songDocs.map((song) => song._id) } } },
          { new: true }
        );

        console.log(context.user);
        // Step 4: Update the user's document to include the new playlist with name and songs
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { playlists: updatedPlaylist._id } },
          { new: true }
        );

        return updatedPlaylist;
      } catch (error) {
        throw new Error("Playlist creation failed");
      }
    },
  },
};

module.exports = resolvers;
