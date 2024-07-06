"use strict";
const schema = require("./schema/schema");
const controller = require("../controllers/main.controller");

const InitialRoutes = require("./route.files/initial.route");
const AppRoutes = require("./route.files/app.route")

module.exports = async function (fastify, opts) {
    fastify.register(InitialRoutes, {prefix: process.env.API_ROUTE});
    fastify.register(AppRoutes, {prefix: process.env.API_ROUTE});
};
