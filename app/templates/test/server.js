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
        console.log("home started");
        var index = mode === "prod" ? "index.prod.html" : "index.dev.html";
        reply.file(index);
    }
});

server.route({
    method: 'GET',
    path: '/index.html',
    handler: function(request, reply) {
        console.log("home started");
        reply.file('index.html');
    }
});

server.route({
    method: "GET",
    path: '/products/ihudao.com/contents/1.0.0/Microblog/{path*}',
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
