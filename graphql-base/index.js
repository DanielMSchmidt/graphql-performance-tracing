const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const schema = require("./schema");
const { server: serverTracer } = require("./tracer");

const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (_, res) => res.redirect("/graphiql"));
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: () => {
      const rootSpan = serverTracer.startSpan("Query");
      return { rootSpan };
    },
    formatResponse: (resp, { context }) => {
      // super hacky solution tailored for exactly this problem
      if (!resp.data.__schema) {
        context.rootSpan.finish();
      }
      return resp;
    }
  })
);
app.get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

console.log("Starting server on", PORT);
app.listen(PORT);
