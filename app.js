"use strict";

const path = require("path");
const AutoLoad = require("@fastify/autoload");
const Cors = require("@fastify/cors");
const MultiPart = require("@fastify/multipart");
const FormBody = require("@fastify/formbody");
const RateLimit = require("@fastify/rate-limit");
const StaticFiles = require("@fastify/static");
const WebSocket = require("@fastify/websocket");
const Swagger = require("@fastify/swagger");
const SwaggerUI = require("@fastify/swagger-ui");

const BASIC_AUTH = require("@fastify/basic-auth");
const JWT = require("@fastify/jwt");
const {v4: uuid} = require("uuid");
const routes = require("./src/routes/api.routes");
const {promises: fs} = require("fs");

const docPrefix = "/api-docs"

const swagger_configuration = () => {
  return {
    swagger: {
      info: {
        title: process.env.APP_NAME,
        description: "NovaAI API documentation",
        version: "1.0",
        contact: {
          name: 'Adarsh S, P.S.A.',
          url: 'https://www.synchsoft.com',
          email: 'hello@synchsoft.com'
        }
      },
      schemes: ["http", "https", 'ws', 'wss'],
      consumes: ["application/json"],
      produces: ["application/json"],
      securityDefinitions: {
        Bearer: {
          type: "oauth2",
          name: "Authorization",
          in: "header",
        },
      },
    },
  }
};
const swagger_ui_configuration = () => {
  return {
    routePrefix: docPrefix,
    exposeRoute: true,
    security: {
      Bearer: []
    },
    uiConfig: {
      docExpansion: 'list', // expand/not all the documentations none|list|full
      deepLinking: true
    },

  };
};

// validate function
function validate(username, password, req, reply, done) {
  if (username === process.env.SWAGGER_USER && password === process.env.SWAGGER_PASSWORD) {
    done()
  } else {
    done(new Error('Winter is coming'))
  }
}

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {};

module.exports = async function (fastify, opts) {
  fastify.register(BASIC_AUTH, {
    validate,
    authenticate: true
  }).after(() => {
    fastify.addHook('onRoute', function hook(routeOptions) {
      if (routeOptions.url.includes(docPrefix)) {
        routeOptions.onRequest = fastify.basicAuth
      }
    })
  });
  fastify.register(Swagger, swagger_configuration());
  fastify.register(SwaggerUI, swagger_ui_configuration());
  const publicKey = await fs.readFile('./certs/oauth-public.key');
  const privateKey = await fs.readFile('./certs/oauth-private.key');
  fastify.register(JWT, {
    secret: {
      private: privateKey,
      public: publicKey
    }
  });
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
  // fastify.register(AutoLoad, {
  //   dir: path.join(__dirname, "src/routes"),
  //   options: Object.assign({}, opts),
  // });

  fastify.register(routes)
};
