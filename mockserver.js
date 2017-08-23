/**
 * Mock Server for testing
 */

'use strict';

const Hapi = require('hapi');

/**
 * Fake Requests Checker
 * Simple reply for checking CRUD functionality on the frontend
 */
function fakeRequestHandler(request, reply) {

    const {method, path, payload, headers, query} = request;
    reply({method, path, payload, headers, query}).code(200);
}

const FakeRequestPlugin = {};

FakeRequestPlugin.register = (server, options, next) => {

    server.route([
        { method: 'GET', path: '/req', handler: fakeRequestHandler },
        { method: 'POST', path: '/req', handler: fakeRequestHandler },
        { method: 'PUT', path: '/req', handler: fakeRequestHandler },
        { method: 'DELETE', path: '/req', handler: fakeRequestHandler }
    ]);

    next();
};

FakeRequestPlugin.register.attributes = {
    name: 'fake-plugin'
}
;

let server;

server = new Hapi.Server();

// +1 port number from karma server
server.connection({
    port: 9877,
    routes: {
        cors: true,
        validate: {
            headers: true
        }
    }
});

server.register([ FakeRequestPlugin ], {}, (err) => {

    if (err) {
        throw err;
    }

    server.start();
});


module.exports = server;
