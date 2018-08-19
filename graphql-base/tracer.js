const ZipkinOpentracing = require("zipkin-javascript-opentracing");

const ZIPKIN_HOST_PORT = process.env.ZIPKIN_HOST_PORT;

if (!ZIPKIN_HOST_PORT) {
  throw new Error("Expect 'ZIPKIN_HOST_PORT' to be defined");
}

const server = new ZipkinOpentracing({
  serviceName: "graphql",
  endpoint: ZIPKIN_HOST_PORT,
  kind: "server"
});

const client = new ZipkinOpentracing({
  serviceName: "graphql",
  endpoint: ZIPKIN_HOST_PORT,
  kind: "client"
});

const local = new ZipkinOpentracing({
  serviceName: "graphql",
  endpoint: ZIPKIN_HOST_PORT,
  kind: "local"
});

module.exports = { server, client, local };
