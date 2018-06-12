const { makeExecutableSchema } = require("graphql-tools");

const typeDefs = `
type User {
    id: ID
    name: String
    friends: [User]
    mentor: User
    skills: String
}

type Query {
    users: [User]
}
`;

const USERS = [
  { id: 1, name: "Peter", friends: [2] },
  { id: 2, name: "Klaus", friends: [] }
];

function getUsers() {
  return Promise.resolve(USERS);
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      async users(_obj, _args, _context) {
        return await getUsers();
      }
    },
    User: {
      friends(obj, _args, _context) {
        return obj.friends.map(friendId =>
          USERS.find(user => user.id === friendId)
        );
      }
    }
  }
});

module.exports = schema;
