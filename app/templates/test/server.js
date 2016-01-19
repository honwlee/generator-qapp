var handlebars = require("handlebars");
var Hapi = require("hapi");
var mode = process.argv.slice(2);

var server = Hapi.createServer('0.0.0.0', 9000, {
    views: {
        path: __dirname,
        engines: {
            'html': {
                module: handlebars
            },
        },
        layout: true
    },
    cors: true
});

server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
        mode = mode.toString() === "" ? "dev" : mode;
        reply.file("index."+ mode + ".html");
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
