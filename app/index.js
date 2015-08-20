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

        this.bowerComponents = JSON.parse(this.readFileAsString(path.join(__dirname, 'templates', '_.bowerrc'))).directory;
    },

    askFor: function() {
        var cb = this.async(),
            _ = this._;

        function dgridIncluded(answers) {
            return _.contains(answers.features, 'dgrid');
        }

        var prompts = [{
            name: 'appname',
            message: 'What the name of your app?',
            'default': 'Welcome'
        }, {
            name: 'dojoVersion',
            message: 'What version of Dojo will be used?',
            'default': '1.10.0'
        }, {
            type: 'checkbox',
            name: 'features',
            message: 'What packages would you like to include?',
            choices: [{
                name: 'Dijit',
                value: 'dijit',
                checked: true
            }, {
                name: 'DojoX',
                value: 'dojox',
                checked: false
            }, {
                name: 'dgrid',
                value: 'dgrid',
                checked: true
            }, {
                name: 'Stylus',
                value: 'stylus',
                checked: true
            }]
        }, {
            name: 'dgridVersion',
            message: 'What version of dgrid?',
            when: dgridIncluded,
            'default': '0.3.15'
        }, {
            type: 'confirm',
            name: 'nib',
            message: 'Include nib when compiling Stylus files?',
            when: function(answers) {
                return _.contains(answers.features, 'stylus');
            },
            'default': true
        }, {
            type: 'confirm',
            name: 'jsLibs',
            message: 'Include other js libs?',
            'default': false
        }, {
            type: 'list',
            name: 'compression',
            message: 'What type of compression should be used when building?',
            choices: [{
                name: 'Shrinksafe',
                value: 'shrinksafe'
            }, {
                name: 'Closure',
                value: 'closure'
            }, {
                name: 'Uglify',
                value: 'uglify'
            }],
            'default': 1
        }, {
            type: 'confirm',
            name: 'travisci',
            message: 'Will you be using Travis-CI?',
            'default': false
        }, {
            name: 'sauceUsername',
            message: 'What is your SauceLabs username?',
            when: function(answers) {
                return answers.travisci;
            },
            'default': process.env.SAUCE_USERNAME || ''
        }, {
            name: 'sauceAccessKey',
            message: 'What is your SauceLabs access key?',
            when: function(answers) {
                return answers.travisci;
            },
            'default': process.env.SAUCE_ACCESS_KEY || ''
        }];

        this.prompt(prompts, function(props) {
            this.appname = props.appname;
            this.appnameClass = this.appname.charAt(0).toLowerCase() + this.appname.slice(1);
            this.jsLibs = props.jsLibs;
            this.dojoVersion = props.dojoVersion;
            this.travisci = props.travisci;
            this.sauceUsername = props.sauceUsername;
            this.sauceAccessKey = props.sauceAccessKey;

            this.dijit = _.contains(props.features, 'dijit');
            this.dojox = _.contains(props.features, 'dojox');
            this.dgrid = _.contains(props.features, 'dgrid');
            this.stylus = _.contains(props.features, 'stylus');
            this.nib = props.nib;

            this.dgridVersion = props.dgridVersion;
            this.putSelectorVersion = props.putSelectorVersion;
            this.xstyleVersion = props.xstyleVersion;
            this.compression = props.compression;
            cb();
        }.bind(this));
    },

    app: function() {
        this.mkdir(this.appname);
        this.mkdir(this.appname + '/tests');
        this.mkdir(this.appname + '/dist');
        this.mkdir(this.appname + '/src/interfaces');
        this.mkdir(this.appname + '/src/concerns');
        this.mkdir(this.appname + '/src/lib');
        this.mkdir(this.appname + '/src/resources/images');
        this.directory('src', this.appname + '/src');
    },

    projectfiles: function() {
        this.template('_index.js', this.appname + '/index.js');
        this.template('_index.html', this.appname + '/index.html');
        this.template('_config.js', this.appname + '/config.js');
        this.template('_package.json', this.appname + '/package.json');
        this.template('_bower.json', this.appname + '/bower.json');
        this.template('Gruntfile.js', this.appname + '/Gruntfile.js');
        this.copy('_.bowerrc', this.appname + '/.bowerrc');
        this.template('_.gitignore', this.appname + '/.gitignore');
        this.template('_LICENSE', this.appname + '/LICENSE');
    }
});
module.exports = QappGenerator;
