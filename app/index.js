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

  // TODO : command line option for parsing a json config file
};

util.inherits(WptGenerator, yeoman.generators.Base);

WptGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);
  console.log(this.pkg.name + ' generator');
  console.log('Out of the box I include Roots starter theme.');

  var prompts = [{
    name: 'themeName',
    message: 'What is the name of your theme?',
    default: 'My WPT theme'
  },
  {
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
      checked: false
    }, {
      name: 'Autoprefixer',
      value: 'useAutoprefixer',
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

  this.prompt(prompts, function (answers) {
    var preproCss = answers.preproCss,
        useCss = answers.useCss,
        useJs = answers.useJs;

    function hasUseCss(feat) { return useCss.indexOf(feat) !== -1; }
    function hasUseJs(feat) { return useJs.indexOf(feat) !== -1; }

    // Ugly default config overide
    this.starterTheme =     'roots';
    this.cssFramework =     'bootstrap';
    this.testFramework =    'mocha';

    this.dirAssets =        'assets',
    this.dirStyles =        'styles',
    this.dirScripts =       'scripts',
    this.dirImages =        'images',

//    this.useJshint =        answers.useJs['useJshint'];
    this.themeName =        answers.themeName;
    this.useJshint =        hasUseJs('useJshint');
    this.useModernizr =     hasUseJs('useModernizr');
    this.useCoffee =        hasUseJs('useCoffee');
    this.useTest =          hasUseJs('useTest');
    this.useRequirejs =     hasUseJs('useRequirejs');
    this.preproCss =        preproCss;
    this.useBootstrap =     hasUseCss('useBootstrap');
    this.useAutoprefixer =  hasUseCss('useAutoprefixer');
    this.useImagemin =      hasUseCss('useImagemin');

    cb();
  }.bind(this));
};

WptGenerator.prototype.app = function app() {
  
//  if (this.)
  this.mkdir('app');
  this.mkdir('app/' + this.dirTemplates);

  // Used to be this.copy(), can't figure out why files were still processed
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_Gruntfile.js', 'Gruntfile.js');

};

WptGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('.gitignore', '.gitignore');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
