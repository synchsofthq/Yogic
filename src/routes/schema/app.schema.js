const response_mediums = require("../schema/common/response");
const header_mediums = require("../schema/common/header");

const tags_title = ['App'];
const tags_description = 'App';

module.exports = {
    get_app_configurations: {
        description: 'Get App Initial Configurations',
        tags: tags_title,
        summary: 'Retrieve AstroBots',
        // headers:header_mediums,
        response: response_mediums
    },

    get_by_slug_id: {
        description: 'Get Resources by Slug ID',
        tags: tags_title,
        summary: 'Retrieve Resources by Slug Id and Properties',
        params: {
            type: 'object', properties: {
                slug: {
                    type: 'string', description: "Slug Confirmation"
                }
            }, required: ['slug']
        },
        response: response_mediums
    },
}