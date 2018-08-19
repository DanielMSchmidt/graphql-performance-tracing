const fetch = require("node-fetch");
const zipkinOpentracing = require("zipkin-javascript-opentracing");

const { client: clientTracer } = require("./tracer");

module.exports = (rootSpan, url, options) => {
  const method = options.method || "GET";
  const span = clientTracer.startSpan(`${method}:${url}`, {
    childOf: rootSpan
  });

  clientTracer.inject(
    span,
    zipkinOpentracing.FORMAT_HTTP_HEADERS,
    options.headers
  );
  const originalPromise = fetch(url, options);

  originalPromise.then(() => span.finish(), () => span.finish());

  return originalPromise;
};
