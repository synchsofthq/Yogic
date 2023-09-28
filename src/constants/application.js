//Application related Constants go here
module.exports = {
  SUCCESS_RESPONSE: "Request Successful, Data is Attached within this packet.",
  SUCCESS_RESPONSE_WITHOUT_DATA: "Request is Successful however this packet will not have any return data.",
  ERROR_MESSAGE: "Something went wrong, try again. [Server Error]",
  NOT_FOUND: "Not Found, server cannot find the requested resource.",
  UNPROCESSABLE_REQUEST: "Unprocessable Entity, you should not repeat this request without modification.",
  API_WELCOME_MESSAGE: "Peerpicks Backend API Fastify API, Hope you are having a good day!",
  BAD_REQUEST: "Bad Request, you should not repeat this request without modification.",
  FORBIDDEN_REQUEST: "Forbidden Request, Access Token needs to be present on headers as Authorization: Bearer <jwt-token>.",
};
