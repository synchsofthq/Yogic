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
    }
};