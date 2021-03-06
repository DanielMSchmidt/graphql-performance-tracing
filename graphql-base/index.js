const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const ApolloOpentracing = require("apollo-opentracing").default;

const schema = require("./schema");
const { server: serverTracer, local: localTracer } = require("./tracer");

const PORT = 3000;

const app = express();

app.get("/", (_, res) => res.redirect("/graphiql"));
app.get("/health", (_, res) => res.sendStatus(200));
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema,
    extensions: [
      () => new ApolloOpentracing({ server: serverTracer, local: localTracer })
    ]
  })
);
app.get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

console.log("Starting server on", PORT);
app.listen(PORT);
