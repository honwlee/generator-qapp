'use strict';
var yeoman = require('yeoman-generator');
var path = require('path');
var util = require('util');

var QappGenerator = yeoman.generators.Base.extend({
    constructor: function(args, options) {
        yeoman.generators.Base.apply(this, arguments);
        this.on('end', function() {
            this.installDependencies({
                skipInstall: options['skip-install']
            });
        });
    },

    askFor: function() {
        var cb = this.async(),
            _ = this._;

        var prompts = [{
            name: 'appName',
            message: 'What the name of your app?',
            'default': 'Welcome'
        }, {
            name: "services",
            message: 'need services?(Y OR N)',
            'default': 'N'
        }];

        this.prompt(prompts, function(answers) {
            this.appName = answers.appName;
            this.needServices = answers.services === "Y" || answers.services === "y";
            this.lowAppName = this.appName.charAt(0).toLowerCase() + this.appName.slice(1);
            cb();
        }.bind(this));
    },

    app: function() {
        this.mkdir(this.appName);
        this.mkdir(this.appName + '/dist');
        this.directory('src', this.appName + '/src');
        this.directory('test', this.appName + '/test');
        this.directory('build', this.appName + '/build');
        if (this.needServices) {
            this.mkdir(this.appName + '/src/services');
            this.mkdir(this.appName + '/src/data');
        }
        this.mkdir(this.appName + '/src/lib');
    },

    projectfiles: function() {
        this.template('_.gitignore', this.appName + '/.gitignore');
        this.template('_LICENSE', this.appName + '/LICENSE');
        this.template('_README.md', this.appName + '/README.md');
    }
});
module.exports = QappGenerator;
