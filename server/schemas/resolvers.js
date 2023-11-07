const { User, Playlist, Song, Message } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth.js');

const resolvers = {
  Query: {
    getUsers: async (_, args, context) => {
      if (context.user) {
        return User.find({}).populate('playlists');
      }
    },
    getPlaylists: async () => {
      return Playlist.find({}).populate('songs').populate({ path: 'user' });
    },
    getSingleUser: async (_, { userId }) => {
      return User.findOne({ _id: userId })
        .populate('playlists')
        .populate({ path: 'playlists', populate: 'songs' });
    },
    getSinglePlaylist: async (_, { playlistId }) => {
      return Playlist.findOne({ _id: playlistId })
        .populate('songs')
        .populate({ path: 'user' });
    },
    getSingleSong: async (_, { songId }) => {
      return Song.findOne({ _id: songId });
    },
    getMessages: async () => {
      return Message.find({});
    },
    featuredPlaylist: async () => {
      const count = await Playlist.countDocuments();
      const date = new Date();
      const seed =
        date.getFullYear() * 10000 +
        (date.getMonth() + 1) * 100 +
        date.getDate();
      const random = Math.floor(seed % count);
      const playlist = await Playlist.findOne()
        .skip(random)
        .populate('user')
        .populate('songs');
      console.log('PLAYLISTTT', playlist);
      return playlist;
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
    // addPlaylist: async (parent, { name }, context) => {
    //   console.log(context.user);
    //   if (context.user) {
    //     const playlist = await Playlist.create({ name });

    //     const test = await User.findByIdAndUpdate(context.user._id, {
    //       $push: { playlists: playlist },
    //     });
    //     console.log(test);
    //     return playlist;
    //   }
    // },
    // addSong: async (parent, { name, uri, playlistId }, context) => {
    //   try {
    //     // Step 1: Create the song
    //     const song = await Song.create({ name, uri });

    //     // Step 2: You can choose to associate the song with a playlist later

    //     // For now, return the created song
    //     return song;
    //   } catch (error) {
    //     throw new Error("Song creation failed");
    //   }
    // },
    addPlaylistWithSongs: async (_, { name, songs }, context) => {
      try {
        //First we create a new playlist
        console.log(name, songs);
        const newPlaylist = await Playlist.create({
          name,
          user: context.user._id,
        });
        console.log('new playlist', newPlaylist.songs);
        //add our songs to the playlist
        for (const song of songs) {
          const newSong = await Song.create({ ...song });
          newPlaylist.songs.push(newSong._id);
          await newPlaylist.save();
        }
        const populatedPlaylist = await newPlaylist.populate('songs');
        console.log('populated', populatedPlaylist);
        console.log('context user', context.user._id);
        const user = await User.findOne({ _id: context.user._id });
        console.log('USER', user);

        user.playlists.push(newPlaylist._id);
        await user.save();
        console.log('user', user);

        //add the playlist to a user
        return populatedPlaylist;
      } catch (err) {
        console.log(err);
      }
    },
    createMessage: async (_, { text }, context) => {
      const { user } = context;
      console.log(text, user._id);
      if (!user) {
        throw new Error('Authentication required to create a message');
      }

      const message = new Message({ text });
      console.log(message);

      const newUser = await User.findByIdAndUpdate(user._id, {
        $push: { messages: message },
      });
      console.log(newUser);

      await message.save();
      return message;
    },
  },
};

module.exports = resolvers;
