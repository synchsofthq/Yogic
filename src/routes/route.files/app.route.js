const schema = require("../schema/schema");
const controller = require("../../controllers/main.controller");


module.exports = function (fastify, opts, done) {
    fastify.get("/configurations", {
        // onRequest: [fastify.authenticate],
        schema: schema.app.get_app_configurations,
        handler: controller.app.app_configurations,
    });
    // fastify.get("/seed-yoga-data", {
    //     // onRequest: [fastify.authenticate],
    //     schema: schema.app.get_app_configurations,
    //     handler: controller.app.seed_yoga_data,
    // });
    //
    // fastify.get("/update-yoga-data", {
    //     // onRequest: [fastify.authenticate],
    //     schema: schema.app.get_app_configurations,
    //     handler: controller.app.update_yoga_data,
    // });



    fastify.get("/category/:slot/:slug/levels", {
        // onRequest: [fastify.authenticate],
        schema: schema.app.get_by_slug_id,
        handler: controller.app.retrieve_category_levels_by_slug,
    });

    fastify.get("/category/:slot/:slug/list", {
        // onRequest: [fastify.authenticate],
        schema: schema.app.get_by_slug_id,
        handler: controller.app.retrieve_yoga_categories,
    });

    fastify.get("/yoga/:id/poses", {
        // onRequest: [fastify.authenticate],
        schema: schema.app.get_by_id,
        handler: controller.app.retrieve_yoga_poses_by_id,
    });

    fastify.get("/level/:slot/:slug/music-tracks", {
        // onRequest: [fastify.authenticate],
        schema: schema.app.get_by_slug_id,
        handler: controller.app.retrieve_music_tracks_by_slug,
    });

    done()
}