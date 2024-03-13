"use strict";
const schema = require("./schema/schema");
const controller = require("../controllers/main.controller");

const InitialRoutes = require("./route.files/initial.route");
const BotRoutes = require("./route.files/bots.route")

module.exports = async function (fastify, opts, done) {
    fastify.register(InitialRoutes, {prefix: process.env.API_ROUTE});
    fastify.register(BotRoutes, {prefix: process.env.API_ROUTE});
    done()
};
