"use strict";

const path = require("path");
const AutoLoad = require("@fastify/autoload");
const Cors = require("@fastify/cors");
const MultiPart = require("@fastify/multipart");
const FormBody = require("@fastify/formbody");
const RateLimit = require("@fastify/rate-limit");
const StaticFiles = require("@fastify/static");
const WebSocket = require("@fastify/websocket");
// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {};

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.register(Cors);
  fastify.register(MultiPart);
  fastify.register(FormBody);
  fastify.register(RateLimit, {
    max: process.env.RATE_LIMIT,
    timeWindow: "1 minute",
    errorResponseBuilder: function (request, context) {
      return {
        status: false,
        code: 429,
        error: "Too Many Requests",
        message: `I only allow ${context.max} requests per ${context.after} to this API. Try again soon.`,
        date: Date.now(),
        expiresIn: context.ttl, // milliseconds
      };
    },
  });
  fastify.register(StaticFiles, {
    root: path.join(__dirname, "public"),
    prefix: "/public/", // optional: default '/'
  });
  fastify.register(WebSocket);

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "src/plugins"),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "src/routes"),
    options: Object.assign({}, opts),
  });
};
