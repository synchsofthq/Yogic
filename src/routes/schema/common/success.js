const app_constants = require("../../../constants/application");

const successful_response = {
  description: "Successful Request with data.",
  type: "object",
  properties: {
    status: { type: "boolean", default: true },
    message: { type: "string", default: app_constants.SUCCESS_RESPONSE },
    data: { type: "object", default: {}, additionalProperties: true },
  },
};
const successful_with_no_data_response = {
  description: "Successful Request without data.",
  type: "object",
  properties: {
    status: { type: "boolean", default: true },
    message: {
      type: "string",
      default: app_constants.SUCCESS_RESPONSE_WITHOUT_DATA,
    },
  },
};

module.exports = { successful_response, successful_with_no_data_response };
