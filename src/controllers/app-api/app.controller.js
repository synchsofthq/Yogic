const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios");
const utilities = require("../../common-helpers/utilities");
const jwt = require("jsonwebtoken");
const APP = require("../../lib/app")
const fs = require('fs');

module.exports = {
    app_configurations: async (request, reply) => {
        try {
            let app_configurations = {}
            app_configurations.time_slots = await prisma.slots.findMany({where: {deleted: false}})
            app_configurations.categories = await prisma.categories.findMany({where: {deleted: false}})
            return reply.code(200).send({data: {app_configurations}});
        } catch (error) {
            console.log(error);
            return reply.code(422).send({error: {...error}});
        }
    },

    seed_yoga_data: async (request, reply) => {
        try {
            let yoga_data = await axios.get("https://yoga-api-nzy4.onrender.com/v1/categories");
            yoga_data = yoga_data.data;

            for (const category of yoga_data) {
                const createdCategory = await prisma.yogaCategory.create({
                    data: {
                        category_name: category.category_name,
                        category_description: category.category_description,
                        poses: {
                            create: category.poses.map(pose => ({
                                english_name: pose.english_name,
                                sanskrit_name_adapted: pose.sanskrit_name_adapted,
                                sanskrit_name: pose.sanskrit_name,
                                translation_name: pose.translation_name,
                                pose_description: pose.pose_description,
                                pose_benefits: pose.pose_benefits,
                                url_svg: pose.url_svg,
                                url_png: pose.url_png,
                                url_svg_alt: pose.url_svg_alt,
                            }))
                        }
                    }
                });
                console.log(`Created category with id: ${createdCategory.id}`);
            }

            return reply.code(200).send({data: {yoga_data}});
        } catch (error) {
            console.log(error);
            return reply.code(422).send({error: {...error}});
        }
    },

    update_yoga_data: async (request, reply) => {
        try {
            let message = "";
            const jsonData = JSON.parse(fs.readFileSync('yoga-api.json', 'utf8'));
            console.log(jsonData.length)
            for (const pose of jsonData) {

                console.log(pose)
                console.log(`Searching ${pose.sanskrit_name}`)
                    // Find the pose in the database by sanskrit_name
                    const existingPose = await prisma.pose.findFirst({
                        where: {sanskrit_name_adapted: pose.sanskrit_name}
                    });

                console.log(existingPose)

                    if (existingPose) {
                        // Update the pose with new information
                        await prisma.pose.updateMany({
                            where: {sanskrit_name_adapted: pose.sanskrit_name},
                            data: {
                                procedure:pose.procedure,
                                target_body_parts:pose.target_body_parts,
                                benefits:pose.benefits,
                                contraindications:pose.contraindications,
                                yt_videos:pose.yt_videos
                            }
                        });

                        message += `Updated pose: ${pose.sanskrit_name} \n`;
                    } else {
                        message += `Pose not found: ${pose.sanskrit_name} \n`;
                    }
            }
            return reply.code(200).send({data: {log:message}});
        } catch (error) {
            console.log(error);
            return reply.code(422).send({error: {...error}});
        }
    },

    retrieve_category_levels_by_slug: async (request, reply) => {
        try {
            let categories = await prisma.categories.findFirstOrThrow({
                where: {
                    slug: request.params.slug,
                    has_levels: true,
                    deleted: false
                }, include: {levels: {where: {deleted: false}}}
            })

            return reply.code(200).send({data: {categories}});
        } catch (error) {
            console.log(error);
            return reply.code(422).send({error: {...error}});
        }
    },

    retrieve_yoga_categories: async (request, reply) => {
        try {
            let yoga_categories = await prisma.yogaCategory.findMany({where: {deleted: false}})
            return reply.code(200).send({data: {yoga_categories}});
        } catch (error) {
            console.log(error);
            return reply.code(422).send({error: {...error}});
        }
    },

    retrieve_yoga_poses_by_id: async (request, reply) => {
        try {
            let yoga = await prisma.yogaCategory.findFirstOrThrow({
                where: {id: request.params.id, deleted: false},
                include: {poses: {where: {deleted: false}}}
            })
            return reply.code(200).send({data: {yoga}});
        } catch (error) {
            console.log(error);
            return reply.code(422).send({error: {...error}});
        }
    },


    retrieve_music_tracks_by_slug: async (request, reply) => {
        try {
            let music_tracks = await prisma.musicTracks.findMany({
                where: {
                    level_slug: request.params.slug,
                    deleted: false
                }
            })
            return reply.code(200).send({data: {music_tracks}});
        } catch (error) {
            console.log(error);
            return reply.code(422).send({error: {...error}});
        }
    }
};