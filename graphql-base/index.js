const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const zipkinMiddleware = require("zipkin-instrumentation-express")
  .expressMiddleware;

const schema = require("./schema");
const tracer = require("./tracer");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(zipkinMiddleware({ tracer }));
app.get("/", (_, res) => res.redirect("/graphiql"));
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
app.get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

console.log("Starting server on", PORT);
app.listen(PORT);
