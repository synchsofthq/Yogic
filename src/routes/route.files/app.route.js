const schema = require("../schema/schema");
const controller = require("../../controllers/main.controller");


module.exports = function (fastify, opts, done) {
    fastify.get("/configurations", {
        // onRequest: [fastify.authenticate],
        schema: schema.app.get_app_configurations,
        handler: controller.app.app_configurations,
    });

    fastify.get("/category/:slot/:slug/levels", {
        // onRequest: [fastify.authenticate],
        schema: schema.app.get_by_slug_id,
        handler: controller.app.retrieve_category_levels_by_slug,
    });

    fastify.get("/level/:slot/:slug/music-tracks", {
        // onRequest: [fastify.authenticate],
        schema: schema.app.get_by_slug_id,
        handler: controller.app.retrieve_music_tracks_by_slug,
    });

    done()
}