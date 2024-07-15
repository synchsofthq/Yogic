const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios");
const utilities = require("../../common-helpers/utilities");
const jwt = require("jsonwebtoken");
const APP = require("../../lib/app")

module.exports = {
    app_configurations: async (request, reply) => {
        try {
            let app_configurations = {}
            app_configurations.time_slots=await prisma.slots.findMany({where:{deleted:false}})
            app_configurations.categories=await prisma.categories.findMany({where:{deleted:false}})
            return reply.code(200).send({data: {app_configurations}});
        } catch (error) {
            console.log(error);
            return reply.code(422).send({error: {...error}});
        }
    },

    retrieve_category_levels_by_slug: async (request, reply) => {
        try {
            let categories = await prisma.categories.findFirstOrThrow({where:{slug:request.params.slug,has_levels:true,deleted:false}, include:{levels:{where:{deleted:false}}}})
            return reply.code(200).send({data: {categories}});
        } catch (error) {
            console.log(error);
            return reply.code(422).send({error: {...error}});
        }
    },
    retrieve_music_tracks_by_slug: async (request, reply) => {
        try {
            let music_tracks = await prisma.levels.findFirstOrThrow({where:{slug:request.params.slug,deleted:false}, include:{music_tracks:{where:{deleted:false}}}})
            return reply.code(200).send({data: {music_tracks}});
        } catch (error) {
            console.log(error);
            return reply.code(422).send({error: {...error}});
        }
    }
};