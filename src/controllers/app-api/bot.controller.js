const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios");
const utilities = require("../../common-helpers/utilities");
const jwt = require("jsonwebtoken");

module.exports = {
    _get_astrobots: async (request, reply) => {
        try {
            let bots = []
            return reply.code(200).send({data: {bots}});
        } catch (error) {
            console.log(error);
            return reply.code(422).send({error: {...error}});
        }
    }
};