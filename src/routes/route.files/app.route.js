const schema = require("../schema/schema");
const controller = require("../../controllers/main.controller");


module.exports = function (fastify, opts, done) {
    fastify.get("/configurations", {
        // onRequest: [fastify.authenticate],
        schema: schema.bots.get_app_configurations,
        handler: controller.app.app_configurations,
    });
    done()
}