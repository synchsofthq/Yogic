const HttpStatus = require('http-status-codes/index');

const BearerTokenMiddleware = (request, reply, next) => {

    const msg = 'Authentication: Bearer Token is required to access the endpoint';
    if (!request.headers['Authorization']) {
        reply.writeHead(HttpStatus.FORBIDDEN);
        reply.write(JSON.stringify({ msg }));
        reply.end();
    }
    next();
};

module.exports = { BearerTokenMiddleware };