const schema = require("../schema/schema");
const controller = require("../../controllers/main.controller");


module.exports = function (fastify, opts, done) {
    fastify.get("/astro-bots", {
        // onRequest: [fastify.authenticate],
        schema: schema.bots.get_celebrity_bots,
        handler: controller.bots._get_astrobots,
    });
    done()
}