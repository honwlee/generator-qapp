var handlebars = require("handlebars");
var Hapi = require("hapi");
var Inert = require('inert');
var server = new Hapi.Server();
server.connection({
    port: 9000,
    routes: {
        cors: true
    }
});
server.register(Inert, () => {});

server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
        reply.file("index.html");
    }
});

server.route({
    method: "GET",
    path: '/bundle/{path*}',
    handler: {
        directory: {
            path: "../src",
            listing: false,
            index: false
        }
    }
});

console.log("The unit test server is started in http://localhost:9000");
server.start();
