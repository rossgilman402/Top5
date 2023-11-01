const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth.js');

const resolvers = {
  Query: {
    getUsers: async () => {
      return User.find({});
    },
    getSingleUser: async (_, { userId }) => {
      return User.findOne({ _id: userId });
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
  },
};

module.exports = resolvers;
