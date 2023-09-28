'use strict'

const fp = require('fastify-plugin')
const security = require("../security/security")
/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require('@fastify/sensible'), {
    errorHandler: false
  }),
  fastify.decorate("authenticate", async function (request, reply) {
    try {
      let user = await request.jwtVerify();
      const status = await security.getSessionState(user.session || null);
      if (!status) {
        throw new Error('Session has expired for the user.');
      }
    } catch (err) { 
      return reply.code(403).send({message: err.message, error: err});
    }
  });
})
