'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var fs = require('fs');

var WptGenerator = module.exports = function WptGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      skipInstall: options['skip-install'],

      // Copy roots' php files after bower install has been performed
      // TODO find a way to copy directories or files with * wildcard
      // http://stackoverflow.com/questions/19582786/yeoman-custom-generator-how-to-access-the-generated-project-in-the-dependencie
/*
      callback: function () {
        var projectDir = process.cwd();
        function endCopyFiles(cwd, dest, files) {
          for (var i = 0; i < files.length; i++) {
            fs.createReadStream(cwd + files[i]).pipe(
              fs.createWriteStream(dest + files[i]));
          }
        };
        endCopyFiles(
          projectDir + '/bower_components/roots/',
          projectDir + '/',
          [
            '404.php',
            'base.php',
            'functions.php',
            'index.php',
            'page.php',
            'single.php',
            'template-custom.php'
          ]
        );
      }.bind(this)
*/
      });
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
    name: 'css',
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
    name: 'js',
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

    function hasUse(prompt, feat) { return answers[prompt].indexOf(feat) !== -1; }

    // Ugly default config overide
    this.starterTheme =     'roots';
    this.cssFramework =     'bootstrap';
    this.testFramework =    'mocha';

//    this.useJshint =        answers.useJs['useJshint'];
    this.themeName =        answers.themeName;
    this.useJshint =        hasUse('js', 'useJshint');
    this.useModernizr =     hasUse('js', 'useModernizr');
    this.useCoffee =        hasUse('js', 'useCoffee');
    this.useTest =          hasUse('js', 'useTest');
    this.useRequirejs =     hasUse('js', 'useRequirejs');
    this.preproCss =        answers.preproCss;
    this.useBootstrap =     hasUse('css', 'useBootstrap');
    this.useAutoprefixer =  hasUse('css', 'useAutoprefixer');
    this.useImagemin =      hasUse('css', 'useImagemin');

    cb();
  }.bind(this));
};

WptGenerator.prototype.app = function app() {
  
//  if (this.)
  this.mkdir('assets');
  this.mkdir('assets/' + this.dirStyles);
  this.mkdir('assets/' + this.dirScripts);
  this.mkdir('assets/' + this.dirImages);
  this.mkdir('assets/fonts');
  if (this.preproCss === 'less') {
    this.directory('assets/less/', 'assets/less');
  } else if (this.preproCss === 'sass') {
    this.directory('assets/sass/', 'assets/sass');
  }
  this.directory('.phpmod', '.phpmod');

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_Gruntfile.js', 'Gruntfile.js');
  this.template('_style.css', 'style.css');
};

WptGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('.gitignore', '.gitignore');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('screenshot.png', 'screenshot.png');
};
