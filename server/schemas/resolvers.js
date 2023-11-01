const { User } = require('../models');
const { signToken, AuthenticationError } = '../utils/auth.js';

const resolvers = {
  Query: {
    getUsers: async () => {
      return User.find({});
    },
    getSingleUser: async (_, { userId }) => {
      return User.findOne({ _id: userId });
    },
  },
};

module.exports = resolvers;
