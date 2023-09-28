const response_mediums = require("../schema/common/response");
const header_mediums = require("../schema/common/header");

const tags_title = ['Bots'];
const tags_description = 'Bots';

module.exports = {
    get_celebrity_bots: {
        description: 'Get All AstroBots',
        tags: tags_title,
        summary: 'Retrieve AstroBots',
        // headers:header_mediums,
        response: response_mediums
    },
}