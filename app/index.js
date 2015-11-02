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

        this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
    },

    askFor: function() {
        var cb = this.async(),
            _ = this._;

        var prompts = [{
            name: 'appname',
            message: 'What the name of your app?',
            'default': 'Welcome'
        }, {
            type: 'confirm',
            name: 'jsLibs',
            message: 'Include other js libs?',
            'default': false
        }];

        this.prompt(prompts, function(props) {
            this.appname = props.appname;
            this.appnameClass = this.appname.charAt(0).toLowerCase() + this.appname.slice(1);
            this.jsLibs = props.jsLibs;
            cb();
        }.bind(this));
    },

    app: function() {
        this.mkdir(this.appname);
        this.mkdir(this.appname + '/dist');
        this.directory('src', this.appname + '/src');
        this.directory('test', this.appname + '/test');
        this.directory('build', this.appname + '/build');
    },

    projectfiles: function() {
        this.template('_.gitignore', this.appname + '/.gitignore');
        this.template('_LICENSE', this.appname + '/LICENSE');
        this.template('_README', this.appname + '/README');
    }
});
module.exports = QappGenerator;
