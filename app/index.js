'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
//var fs = require('fs');

var WordpressThemifyGenerator = module.exports = function WordpressThemifyGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.options = options;
	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

	// TODO : command line option for parsing a json config file
};

util.inherits(WordpressThemifyGenerator, yeoman.generators.Base);

WordpressThemifyGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// have Yeoman greet the user.
	console.log(this.yeoman);
	console.log(this.pkg.name + ' - v' + this.pkg.version);
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
		}, {
			name: 'Coffeescript',
			value: 'useCoffee',
			checked: false
		}, {
			name: 'Mocha unit-testing',
			value: 'useTest',
			checked: false
		}, {
			name: 'Sample jQuery plugin',
			value: 'useSampleJquery',
			checked: true
		}]
	}];

	this.prompt(prompts, function (answers) {

		function hasUse(prompt, feat) { return answers[prompt].indexOf(feat) !== -1; }

		// Hardcoded values for future features
		this.cssFramework =     'bootstrap';
		this.testFramework =    'mocha';
		this.useTestConnect =   true;
		this.useRequirejs =     false;
//    this.useRequirejs =     hasUse('js', 'useRequirejs');

		// Dumps answers to variables
		this.themeName =        answers.themeName;
		this.starterTheme =     answers.starterTheme;

		this.useJshint =        hasUse('js', 'useJshint');
		this.useModernizr =     hasUse('js', 'useModernizr');
		this.useCoffee =        hasUse('js', 'useCoffee');
		this.useTest =          hasUse('js', 'useTest');
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

};

WordpressThemifyGenerator.prototype.css = function css() {
	if (this.preproCss === 'less') {
		this.template('assets/less/main.less.tmpl', 'assets/less/main.less');
		if (this.useBootstrap) {
			this.copy('assets/less/bootstrap.less', 'assets/less/bootstrap.less');
			this.copy('assets/less/variables.less', 'assets/less/variables.less');
		}
	} else if (this.preproCss === 'sass') {
		this.template('assets/sass/main.scss.tmpl', 'assets/sass/main.scss');
		if (this.useBootstrap) {
			this.copy('assets/sass/_bootstrap.scss', 'assets/sass/_bootstrap.scss');
			this.copy('assets/sass/_variables.scss', 'assets/sass/_variables.scss');
		}
	} else if (this.preproCss === 'css') {
		if (!this.useAutoprefixer) {
			this.template('assets/css/_main.css', 'assets/css/main.css');
		} else {
			this.template('assets/css/_app.css', 'assets/css/app.css');
		}
	}
};

WordpressThemifyGenerator.prototype.javascript = function javascript() {
	if (!this.useRequirejs) {
		if (!this.useCoffee) {
			this.template('assets/js/_app.js', 'assets/js/app.js');
			if (this.useSampleJquery) {
				this.copy('assets/js/plugins/jquery-plugin.js', 'assets/js/plugins/jquery-plugin.js');
			}
		} else {
			this.template('assets/coffee/_app.coffee', 'assets/coffee/app.coffee');
			if (this.useSampleJquery) {
				this.copy('assets/coffee/plugins/jquery-plugin.coffee', 'assets/coffee/plugins/jquery-plugin.coffee');
			}
		}
	} else {
		// TODO : RequireJS skeleton
	}
};


WordpressThemifyGenerator.prototype.test = function test() {
	var cb = this.async();

	if (this.useTest) {

		this.mkdir('test/lib');

		// Templating tests
		this.template('test/_index.html', 'test/index.html');
		if (!this.useCoffee) {
			this.template('test/spec/_test.js', 'test/spec/test.js');
		} else {
			this.template('test/spec/coffee/_test.coffee', 'test/spec/coffee/test.coffee');
		}
		// Dunno where this file comes from
		this.copy('test/lib/expect.js', 'test/lib/expect.js');

		cb();
	} else {
		cb();
	}
};

WordpressThemifyGenerator.prototype.remoteMocha = function remoteMocha() {
	var cb   = this.async();

	if (this.useTest) {
		this.remote('visionmedia', 'mocha', '1.14.0', function (err, remote) {
			if (err) { return cb(err); }

			remote.copy('mocha.js', 'test/lib/mocha/mocha.js');
			remote.copy('mocha.css', 'test/lib/mocha/mocha.css');
			cb();
		});
	}
	else {
		cb();
	}
};

WordpressThemifyGenerator.prototype.remoteChai = function remoteChai() {
	var cb   = this.async();

	if (this.useTest) {
		this.remote('chaijs', 'chai', '1.8.0', function (err, remote) {
			if (err) { return cb(err); }

			remote.copy('chai.js', 'test/lib/chai.js');
			cb();
		});
	}
	else {
		cb();
	}
};

WordpressThemifyGenerator.prototype.remoteRoots = function remoteRoots() {
	var cb   = this.async(),
			self = this;

	if (this.starterTheme === 'roots') {
		// TODO : hardcoded Roots version (unable to JSON.parse() our _bower.json)
		this.remote('roots', 'roots', '6.5.1', function (err, remote) {
			if (err) { return cb(err); }

			// Unchanged directories
			remote.directory('templates', 'templates');
			remote.directory('lang', 'lang');

			// Perfectly absurd enumeration to avoid having to overwrite scripts.php
			remote.copy('lib/activation.php', 'lib/activation.php');
			remote.copy('lib/comments.php', 'lib/comments.php');
			remote.copy('lib/config.php', 'lib/config.php');
			remote.copy('lib/cleanup.php', 'lib/cleanup.php');
			remote.copy('lib/custom.php', 'lib/custom.php');
			remote.copy('lib/gallery.php', 'lib/gallery.php');
			remote.copy('lib/init.php', 'lib/init.php');
			remote.copy('lib/nav.php', 'lib/nav.php');
			remote.copy('lib/relative-urls.php', 'lib/relative-urls.php');
			//remote.copy('lib/scripts.php', 'lib/scripts.php');
			remote.copy('lib/sidebar.php', 'lib/sidebar.php');
			remote.copy('lib/titles.php', 'lib/titles.php');
			remote.copy('lib/utils.php', 'lib/utils.php');
			remote.copy('lib/widgets.php', 'lib/widgets.php');
			remote.copy('lib/wrapper.php', 'lib/wrapper.php');

			// Loosy : need someting like './*.php'
			remote.copy('404.php', '404.php');
			remote.copy('base.php', 'base.php');
			remote.copy('functions.php', 'functions.php');
			remote.copy('index.php', 'index.php');
			remote.copy('page.php', 'page.php');
			remote.copy('single.php', 'single.php');
			remote.copy('template-custom.php', 'template-custom.php');

			// Overwrite Roots modified files
			self.template('phpmod/lib/_scripts.php', 'lib/scripts.php');
			// I don't want the user to have a warning on fresh install!
			cb();
		});
	}
	else if (this.starterTheme === 'none') {
		// A static index.php (so the theme is visible by wordpress)
		this.template('_index.php', 'index.php');
		cb();
	}
};

WordpressThemifyGenerator.prototype.projectfiles = function projectfiles() {
	this.template('_package.json', 'package.json');
	this.template('_bower.json', 'bower.json');
	this.template('_Gruntfile.js', 'Gruntfile.js');
	this.template('_README.md', 'README.md');

	this.copy('gitignore', '.gitignore');
	this.copy('editorconfig', '.editorconfig');
	this.copy('jshintrc', '.jshintrc');
	if (this.useCoffee) {
		this.copy('coffeelintrc', '.coffeelintrc');
	}

	// Wordpress theme stuff
	this.copy('screenshot.png', 'screenshot.png');
	this.template('_style.css', 'style.css');

	this.directory('assets/img/', 'assets/img');
};

WordpressThemifyGenerator.prototype.install = function () {
	if (this.options['skip-install']) {
		return;
	}
	var done = this.async();
	this.installDependencies({
		skipMessage: this.options['skip-install-message'],
		skipInstall: this.options['skip-install'],
		callback: done
	});
};
