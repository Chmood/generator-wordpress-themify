'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var WptGenerator = module.exports = function WptGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(WptGenerator, yeoman.generators.Base);

WptGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);
  console.log(this.pkg.name + ' generator');
  console.log('Out of the box I include HTML5 Boilerplate and jQuery.');

  var prompts = [{
    type: 'list',
    name: 'preproCss',
    message: 'Do you prefer sass, less, or just css?',
    choices: [{
      name: 'Sass',
      value: 'sass',
    }, {
      name: 'Less',
      value: 'less',
    }, {
      name: 'CSS',
      value: 'css',
    }],
    default: 0
  },
  {
    type: 'checkbox',
    name: 'useCss',
    message: 'Any CSS helper?',
    choices: [{
      name: 'Bootstrap',
      value: 'useBootstrap',
      checked: true
    }, {
      name: 'Autoprefixer',
      value: 'useAutoprefixer',
      checked: true
    }, {
      name: 'Coffeescript',
      value: 'useCoffee',
      checked: false
    }, {
      name: 'Unit-testing',
      value: 'useTest',
      checked: false
    }]
  },
  {
    type: 'checkbox',
    name: 'useJs',
    message: 'And what about javascript?',
    choices: [{
      name: 'Jshint',
      value: 'useJshint',
      checked: false
    }, {
      name: 'Modernizr',
      value: 'useModernizr',
      checked: false
    }, {
      name: 'RequireJS',
      value: 'useRequirejs',
      checked: false
    }, {
      name: 'Coffeescript',
      value: 'useCoffee',
      checked: false
    }, {
      name: 'Unit-testing',
      value: 'useTest',
      checked: false
    }]
  }];

  this.prompt(prompts, function (props) {
    this.someOption = props.someOption;

    // Ugly default config overide
    this.starterTheme =     'roots';
    this.cssFramework =     'bootstrap';
    this.testFramework =    'mocha';

    this.useJshint =        props.useJs['useJshint'];
    this.useModernizr =     false;
    this.useCoffee =        false;
    this.useTest =          false;
    this.useRequirejs =     false;
    this.preproCss =        'less';
    this.useAutoprefixer =  false;
    this.useImagemin =      false;

    cb();
  }.bind(this));
};

WptGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

WptGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
