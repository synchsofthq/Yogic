"use strict";

module.exports = async function (fastify, opts ){
  fastify.register( require("./initial/route"));

};
