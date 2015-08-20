module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt, ['grunt-*', 'intern-geezer']);
    var path = require('path');

    var stripComments = /<\!--.*?-->/g,
        collapseWhiteSpace = /\s+/g;

    grunt.initConfig({
        dojo: {
            dist: {
                options: {
                    dojo: path.join('src', 'dojo', 'dojo.js'),
                    dojoConfig: 'config.js',
                    profile: 'profile.js',
                    releaseDir: 'dist',
                    basePath: path.join(__dirname, 'src')
                }
            }
        },
        connect: {
            options: {
                port: 8888,
                hostname: 'localhost'
            },
            test: {
                options: {
                    base: 'src'
                }
            },
            dist: {
                options: {
                    base: 'dist'
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        'dist'
                    ]
                }]
            }
        },<% if (stylus) { %>
		stylus: {
			compile: {
				options: {
					compress: false<% if (nib) { %>,
					'import': [ 'nib' ]<% } %>
				},
				files: {
					'src/<%= appname %>/resources/main.css': 'src/<%= appname %>/resources/main.styl'
				}
			}
		},
		watch: {
			stylus: {
				files: 'src/<%= appname %>/resources/**/*.styl',
				tasks: [ 'stylus:compile' ]
			}
		},<% } %>
		intern: {
			local: {
				options: {
					runType: 'client',
					config: 'src/<%= appname %>/tests/intern'
				}
			},
			remote: {
				options: {
					runType: 'runner',
					config: 'src/<%= appname %>/tests/intern'
				}
			}
		}
	});

	grunt.registerTask('default', [<% if (stylus) { %> 'stylus:compile', 'watch:stylus' <% } %>]);
	grunt.registerTask('server', function (target) {
		if (target === 'dist') {
			return grunt.task.run([
				'build',
				'connect:dist:keepalive'
			]);
		}

		grunt.task.run([
			<% if (stylus) { %>'stylus:compile',
			<% } %>'connect:test<% if (!stylus) { %>:keepalive<% } %>'<% if (stylus) { %>,
			'watch:stylus'<% } %>
		]);
	});
	grunt.registerTask('build', [ <% if (stylus) { %>'stylus:compile', <% } %>'clean', 'dojo:dist', 'copy' ]);
};
