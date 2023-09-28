
const HttpStatusCode = require('http-status-codes');
const  {error_schema,forbidden,unprocessable_entity,bad_request,not_found} = require("./error");
const { successful_response,successful_with_no_data_response } = require('./success');

const response_mediums={
    [HttpStatusCode.OK]: successful_response,
    [HttpStatusCode.NO_CONTENT]: successful_with_no_data_response,
    [HttpStatusCode.FORBIDDEN]: forbidden,
    [HttpStatusCode.UNPROCESSABLE_ENTITY]: unprocessable_entity,
    [HttpStatusCode.BAD_REQUEST]: bad_request,
    [HttpStatusCode.NOT_FOUND]: not_found,
    [HttpStatusCode.INTERNAL_SERVER_ERROR]: error_schema,
}

module.exports={...response_mediums};
