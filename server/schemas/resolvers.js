const { User } = require('../models');

const resolvers = {
  Query: {
    getUsers: async () => {
      return User.findAll({});
    },
    getSingleUser: async (_, { id }) => {
      return User.findById({ id });
    },
  },
};
