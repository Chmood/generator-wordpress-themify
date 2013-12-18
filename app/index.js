'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var fs = require('fs');

var WordpressThemifyGenerator = module.exports = function WordpressThemifyGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      skipInstall: options['skip-install']

      // Copy roots' php files after bower install has been performed
      // http://stackoverflow.com/questions/19582786/yeoman-custom-generator-how-to-access-the-generated-project-in-the-dependencie
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  // TODO : command line option for parsing a json config file
};

util.inherits(WordpressThemifyGenerator, yeoman.generators.Base);

WordpressThemifyGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);
  console.log(this.pkg.name + ' generator - v' + this.pkg.version);
  console.log('Out of the box I include... nothing! YOU include things.');

  var prompts = [{
    name: 'themeName',
    message: 'What is the name of your theme?',
    default: 'My Wordpress-themify theme'
  }, {
    type: 'list',
    name: 'preproCss',
    message: 'Do you prefer sass, less, or just css?',
    choices: [{
      name: 'Sass',
      value: 'sass'
    }, {
      name: 'Less',
      value: 'less'
    }, {
      name: 'CSS',
      value: 'css'
    }],
    default: 0
  }, {
    type: 'list',
    name: 'starterTheme',
    message: 'Which Wordpress starter theme to use?',
    choices: [{
      name: 'Roots',
      value: 'roots'
    }, {
      name: 'None',
      value: 'none'
    }],
    default: 0
  }, {
    type: 'checkbox',
    name: 'css',
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
      name: 'Minify images',
      value: 'useImagemin',
      checked: true
    }]
  }, {
    type: 'checkbox',
    name: 'js',
    message: 'What about javascript?',
    choices: [{
      name: 'Jshint',
      value: 'useJshint',
      checked: true
    }, {
      name: 'Modernizr',
      value: 'useModernizr',
      checked: true
    }/*,{
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
    }*/, {
      name: 'Sample jQuery plugin',
      value: 'useSampleJquery',
      checked: false
    }]
  }];

  this.prompt(prompts, function (answers) {

    function hasUse(prompt, feat) { return answers[prompt].indexOf(feat) !== -1; }

    // Hardcoded values for future features
    this.cssFramework =     'bootstrap';
    this.testFramework =    'mocha';
    this.useRequirejs =     false;
//    this.useRequirejs =     hasUse('js', 'useRequirejs');
    this.useTest =          false;
//    this.useTest =          hasUse('js', 'useTest');
    this.useCoffee =        false;
//    this.useCoffee =        hasUse('js', 'useCoffee');

    // Dumps answers to variables
    this.themeName =        answers.themeName;
    this.starterTheme =     answers.starterTheme;

    this.useJshint =        hasUse('js', 'useJshint');
    this.useModernizr =     hasUse('js', 'useModernizr');
    this.useSampleJquery =  hasUse('js', 'useSampleJquery');

    this.preproCss =        answers.preproCss;
    this.useBootstrap =     hasUse('css', 'useBootstrap');
    this.useAutoprefixer =  hasUse('css', 'useAutoprefixer');
    this.useImagemin =      hasUse('css', 'useImagemin');

    cb();
  }.bind(this));
};

WordpressThemifyGenerator.prototype.app = function app() {

  this.mkdir('assets');
  this.mkdir('assets/css');
  this.mkdir('assets/js');
  this.mkdir('assets/fonts');
  if (this.useSampleJquery) {
    this.mkdir('assets/js/plugins');
  }

  // Push modified php files
  if (this.starterTheme === 'roots') {
    this.template('.phpmod/lib/_scripts.php', '.phpmod/lib/scripts.php');
  } else if (this.starterTheme === 'none') {
    this.template('_index.php', 'index.php');
  }

  // Populates less/sass directories
  if (this.preproCss === 'less') {
    this.directory('assets/less/', 'assets/less');
  } else if (this.preproCss === 'sass') {
    this.directory('assets/sass/', 'assets/sass');
  } else if (this.preproCss === 'css') {
    if (!this.useAutoprefixer) {
      this.template('assets/css/_main.css', 'assets/css/main.css');
    } else {
      this.template('assets/css/_app.css', 'assets/css/app.css');
    }
  }

  // Populates js directory
  if (!this.useRequirejs) {
    this.template('assets/js/_app.js', 'assets/js/app.js');
    if (this.useSampleJquery) {
      this.copy('assets/js/plugins/jquery-plugin.js', 'assets/js/plugins/jquery-plugin.js');
    }
  } else {
    this.directory('assets/js-requirejs/', 'assets/js');
  }
/*  if (!this.useRequirejs) {
    this.directory('assets/js/', 'assets/js');
    if (this.useSampleJquery) {
      this.directory('assets/js-sampleJquery/', 'assets/js');
    }
  } else {
    this.directory('assets/js-requirejs/', 'assets/js');
  }
*/
  // Put on some sample images
  this.directory('assets/img/', 'assets/img');

  // Processing template files
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_Gruntfile.js', 'Gruntfile.js');
  this.template('_README.md', 'README.md');
  this.template('_style.css', 'style.css');
};

WordpressThemifyGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('gitignore', '.gitignore');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('screenshot.png', 'screenshot.png');
};
