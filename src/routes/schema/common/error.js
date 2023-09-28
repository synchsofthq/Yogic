const app_constants = require("../../../constants/application");

const error_schema = {
  description: "Server Error",
  type: "object",
  properties: {
    status: { type: "boolean", default: false },
    message: { type: "string", default: app_constants.ERROR_MESSAGE },
    error: { type: "object", default: {}, additionalProperties: true }
  },
};
const forbidden = {
  description: 'Forbidden',
  type: 'object',
  properties: {
    status: { type: 'boolean', default: false },
    message: { type: 'string', default: app_constants.FORBIDDEN_REQUEST },
    error: { type: "object",  additionalProperties: true }
  },
};
const unprocessable_entity = {
  description: 'Unprocessable Entity',
  type: 'object',
  properties: {
    status: { type: 'boolean', default: false },
    message: { type: 'string', default: app_constants.UNPROCESSABLE_REQUEST },
    error: { type: "object", additionalProperties: true }
  },
};

const bad_request = {
  description: "Bad Request",
  type: "object",
  properties: {
    status: { type: "boolean", default: false },
    message: { type: "string", default: app_constants.BAD_REQUEST },
  },
};

const not_found = {
  description: "Resource Not Found",
  type: "object",
  properties: {
    status: { type: "boolean", default: false },
    message: { type: "string", default: app_constants.NOT_FOUND },
  },
};

module.exports = { error_schema, forbidden, unprocessable_entity, bad_request, not_found };
