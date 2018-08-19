const {
  Tracer,
  BatchRecorder,
  jsonEncoder: { JSON_V2 }
} = require("zipkin");
const CLSContext = require("zipkin-context-cls");
const { HttpLogger } = require("zipkin-transport-http");

const ZIPKIN_HOST_PORT = process.env.ZIPKIN_HOST_PORT;

if (!ZIPKIN_HOST_PORT) {
  throw new Error("Expect 'ZIPKIN_HOST_PORT' to be defined");
}

// Setup the tracer to use http and implicit trace context
const tracer = new Tracer({
  ctxImpl: new CLSContext("zipkin"),
  recorder: new BatchRecorder({
    logger: new HttpLogger({
      endpoint: ZIPKIN_HOST_PORT + "/api/v2/spans",
      jsonEncoder: JSON_V2
    })
  }),
  localServiceName: "graphql" // name of this application
});

module.exports = tracer;
