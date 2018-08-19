const { makeExecutableSchema } = require("graphql-tools");
const fetch = require("./instrumentedFetch");
const { local: localTracer } = require("./tracer");

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
  {
    id: 1,
    name: "Dave",
    friends: [2],
    mentor: null,
    skills: "Go, Ruby"
  },
  {
    id: 2,
    name: "Peter",
    friends: [],
    mentor: null,
    skills: "Javascript"
  },
  {
    id: 3,
    name: "Norman",
    friends: [1, 2],
    mentor: 4,
    skills: "Javascript"
  },
  {
    id: 4,
    name: "Raphael",
    friends: [],
    mentor: 1,
    skills: "Ruby, Go, DevOps"
  }
];

function findUser(id) {
  return USERS.find(user => user.id === id);
}

function getUser(id, rootSpan) {
  return fetch(rootSpan, `${USER_ENDPOINT}?timeout=${SPREAD_DELAY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(findUser(id))
  }).then(res => res.json());
}

const SPREAD_DELAY = 50;
const USERS_ENDPOINT = process.env.USERS_ENDPOINT;
const USER_ENDPOINT = process.env.USER_ENDPOINT;

function getUsers(rootSpan) {
  return fetch(rootSpan, `${USERS_ENDPOINT}?timeout=${SPREAD_DELAY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
      USERS.map(user => ({
        endpoint: USER_ENDPOINT,
        body: JSON.stringify(user)
      }))
    )
  }).then(res => res.json());
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      async users(_obj, _args, context) {
        const span = localTracer.startSpan("users", {
          childOf: context.rootSpan
        });

        const users = await getUsers(span);

        span.finish();
        return users;
      }
    },
    User: {
      async friends(obj, _args, context) {
        const span = localTracer.startSpan("friends", {
          childOf: context.rootSpan
        });

        const friends = await Promise.all(
          obj.friends.map(friendId => getUser(friendId, span))
        );

        span.finish();
        return friends;
      }
    }
  }
});

module.exports = schema;
