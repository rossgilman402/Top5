const typeDefs = `
    type User {
        _id: ID 
        email: String!
        password: String!
    }

    type Query {
        getUsers: [User]
        getSingleUser(userId: ID!): User
    }

    type Mutation {
        addUser(email: String!, password: String!): User
    }
`;

module.exports = typeDefs;
