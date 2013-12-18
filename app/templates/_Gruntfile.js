'use strict';
module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    // Project settings
    yeoman: {
      // Where to build the final theme
      dist: '../<%= _.slugify(themeName) %>'
    },

    // JAVASCRIPT
<% if (useJshint) { %>
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'assets/js/{,*/}*.js',
        '!assets/js/main.js'
      ] // TODO : jshint unit-tests
    },<% } %>
<% if (!useRequirejs) { %>    // Uglify scripts
    uglify: {
      app: {
        files: {
          'assets/js/main.js': [<% if (useBootstrap && (preproCss === 'less' || preproCss === 'css')) { %>
            'bower_components/bootstrap/js/transition.js',
            'bower_components/bootstrap/js/alert.js',
            'bower_components/bootstrap/js/button.js',
            'bower_components/bootstrap/js/carousel.js',
            'bower_components/bootstrap/js/collapse.js',
            'bower_components/bootstrap/js/dropdown.js',
            'bower_components/bootstrap/js/modal.js',
            'bower_components/bootstrap/js/tooltip.js',
            'bower_components/bootstrap/js/popover.js',
            'bower_components/bootstrap/js/scrollspy.js',
            'bower_components/bootstrap/js/tab.js',
            'bower_components/bootstrap/js/affix.js',<% } %><% if (useBootstrap && preproCss === 'sass') { %>
            'bower_components/sass-bootstrap/js/transition.js',
            'bower_components/sass-bootstrap/js/alert.js',
            'bower_components/sass-bootstrap/js/button.js',
            'bower_components/sass-bootstrap/js/carousel.js',
            'bower_components/sass-bootstrap/js/collapse.js',
            'bower_components/sass-bootstrap/js/dropdown.js',
            'bower_components/sass-bootstrap/js/modal.js',
            'bower_components/sass-bootstrap/js/tooltip.js',
            'bower_components/sass-bootstrap/js/popover.js',
            'bower_components/sass-bootstrap/js/scrollspy.js',
            'bower_components/sass-bootstrap/js/tab.js',
            'bower_components/sass-bootstrap/js/affix.js',<% } %>

            // Your js code to be uglified. Order matters.
            'assets/js/h5bpshim.js',<% if (useSampleJquery) { %>
            'assets/js/plugins/jquery-plugin.js',<% } %>
            'assets/js/app.js'
          ]
        },
        options: {
          // JS source map: to enable, uncomment the lines below and update sourceMappingURL based on your install
          // sourceMap: 'assets/js/main.js.map',
          // sourceMappingURL: '/app/themes/roots/assets/js/main.js.map'
        }
      }
    },<% } %>
<% if (useCoffee) { %>    // Compiles CoffeeScript to JavaScript
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: 'js',
          src: '{,*/}*.{coffee,litcoffee,coffee.md}',
          dest: '.tmp/js',
          ext: '.js'
        }]
      } // TODO : coffee unit-tests
    },<% } %>

    // CSS
<% if (preproCss === 'less') { %>   // Less compilation
    less: {
      app: {
        files: {
          'assets/css/main.css': [
            'assets/less/main.less'
          ]
        },
        options: {
          compress: true, // remove some spaces
          // LESS source map
          // To enable, set sourceMap to true and update sourceMapRootpath based on your install
          sourceMap: true,
          sourceMapFilename: 'assets/css/main.css.map',
          sourceMapRootpath: '/app/themes/<%= _.slugify(appname) %>/'
        }
      }
    },<% } %>
<% if (preproCss === 'sass') { %>   // Sass compilation
    compass: {
      app: {
        options: {
          sassDir: 'assets/sass',
          cssDir: 'assets/css',
          // CSS output mode. Can be: nested, expanded, compact, compressed.
          outputStyle: 'compressed',
          // TODO : figure out what's the use of the options below
          generatedImagesDir: '.tmp/images/generated',
          imagesDir: 'assets/img',
          javascriptsDir: 'assets/js',
          fontsDir: 'assets/fonts',
          importPath: 'bower_components',
          httpImagesPath: 'assets/img',
          httpGeneratedImagesPath: 'assets/img/generated',
          httpFontsPath: 'assets/fonts',
          relativeAssets: false,
          assetCacheBuster: false,
          debugInfo: true
          // Sourcemaps needs latest sass gem
          // See : https://developers.google.com/chrome-developer-tools/docs/css-preprocessors#toc-enabling-css-source-maps
        }
      }
    },<% } %>
<% if (useAutoprefixer && (preproCss !== 'css')) { %>    // CSS-autoprefixer
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      app: {
        files: [{
          expand: true,
          cwd: 'assets/css',
          src: 'main.css',
          dest: 'assets/css'
        }]
      }
    },<% } %><% if (useAutoprefixer && (preproCss === 'css')) { %>    // CSS-autoprefixer
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      app: {
        files: [{
          src: 'assets/css/app.css',
          dest: 'assets/css/main.css'
        }]
      }
    },<% } %>

    // CSS minification
    cssmin: {
      dist: {
        files: {
          '<%%= yeoman.dist %>/assets/css/main.css': [
            'assets/css/main.css'
          ]
        }
      }
    },

<% if (useImagemin) { %>    // IMAGES
    imagemin: {
      options: {
        force: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/img',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%%= yeoman.dist %>/assets/img'
        }, {
          expand: true,
          cwd: '.',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/img',
          src: '{,*/}*.svg',
          dest: '<%%= yeoman.dist %>/assets/img'
        }]
      }
    },<% } %><% if (starterTheme === 'roots') { %>
    version: {
      options: {
        file: 'lib/scripts.php',
        css: 'assets/css/main.css',
        cssHandle: 'roots_styles',
        js: 'assets/js/main.js',
        jsHandle: 'roots_scripts'
      }
    },<% } %>
<% if (useModernizr) { %>   // Modernizr minimal custom build
    modernizr: {
      devFile: 'bower_components/modernizr/modernizr.js',
      outputFile: '<%%= yeoman.dist %>/bower_components/modernizr/modernizr.js',
      files: [
        'assets/js/{,*/}*.js',
        'assets/css/{,*/}*.css'
      ],
      uglify: true
    },<% } %>

    // WATCH DAEMON
    // Automatic tasks

    watch: {<% if (preproCss === 'less') { %>
      less: {
        files: [
          'assets/less/*.less',
          'assets/less/bootstrap/*.less'
        ],
        tasks: [
          'less',<% if (useAutoprefixer) { %>
          'autoprefixer',<% } %><% if (starterTheme === 'roots') { %>
          'version'<% } %>
        ]
      },<% } %><% if (preproCss === 'sass') { %>
      compass: {
        files: [
          'assets/sass/{,*/}*.{scss,sass}'
        ],
        tasks: [
          'compass',<% if (useAutoprefixer) { %>
          'autoprefixer',<% } %><% if (starterTheme === 'roots') { %>
          'version'<% } %>
        ]
      },<% } %><% if (preproCss === 'css') { %>
      css: {
        files: [
          'assets/css/{,*/}*.css',
          '!assets/css/main.css'
        ],
        tasks: [<% if (useAutoprefixer) { %>
          'autoprefixer',<% } %><% if (starterTheme === 'roots') { %>
          'version'<% } %>
        ]
      },<% } %>
      js: {
        files: [
          'Gruntfile.js',
          'assets/js/{,*/}*.js',
          '!assets/js/main.js'
        ],
        tasks: [<% if (useJshint) { %>
          'newer:jshint',<% } %>
          'uglify',<% if (starterTheme === 'roots') { %>
          'version'<% } %>
        ]
      },<% if (useTest) { %>
      jstest: { // TODO
          files: ['test/spec/{,*/}*.js'],
          tasks: ['test:watch']
      },<% } %><% if (useCoffee) { %>
//      coffee: {
//        files: ['js/{,*/}*.{coffee,litcoffee,coffee.md}'],
//        tasks: ['coffee:dist']
//      },<% } %>
      // Files that trigger a livereload event
      livereload: {
        options: {
          livereload: true
        },
        files: [
          'assets/css/main.css',
          'assets/js/main.js',
          'assets/img/{,*/}*.{png,jpg,jpeg,gif,svg,webp}',<% if (starterTheme === 'roots') { %>
          'templates/*.php',
          'lib/*.php',<% } %>
          '*.php'
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      options: {
        // force is needed in case of deleting files outside the root directory
        force: true
      },
      app: [<% if (preproCss !== 'css') { %>
        'assets/css/main.css',<% } %>
        'assets/js/main.js'
      ],
      dist: [
        '<%%= yeoman.dist %>'
      ]
    },

    // Copies remaining unprocessed files to dist
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '.',
          dest: '<%%= yeoman.dist %>',
          src: [
            'style.css',
            '*.{ico,png,txt}',
            'assets/img/{,*/}*.webp',<% if (!useImagemin) { %>
            'assets/img/{,*/}*.{png,jpg,jpeg,gif,svg}',<% } %>
            'bower_components/sass-bootstrap/fonts/*.*',
            'bower_components/jquery/jquery.min.js',
            'screenshot.{png/jpg/jpeg}',
            '{,*/}*.php',
            'lang/*.*',
            'assets/fonts/*.*',
            'assets/js/main.js',
            'assets/js/vendor/{,*/}*.js'
          ]
        }]
      },
      initphp: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'bower_components/roots',
          dest: '.',
          src: [
            'templates/*.php',
            'lib/*.php',
            'lang/*.*',
            '*.php'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: '.phpmod',
          dest: '.',
          src: [
            'templates/*.php',
            'lib/*.php',
            '*.php'
          ]
        }]
      }
    }

  });

  /*****************************************************************************
   *  TASKS REGISTERING
   */

  // Internal tasks, usually not called from grunt CLI

  // Compiles sass/less files to CSS
  grunt.registerTask('compile-css', [<% if (preproCss === 'less') { %>
    'less:app',<% } %><% if (preproCss === 'sass') { %>
    'compass:app',<% } %><% if (useAutoprefixer) { %>
    'autoprefixer'<% } %>
  ]);

  // Public tasks, called from grunt CLI

  grunt.registerTask('default', [
    'dist'
  ]);

  grunt.registerTask('app', [
    'clean:app',<% if (useJshint) { %>
    'jshint',<% } %><% if (useCoffee) { %>
    'coffee',<% } %>
    'uglify',
    'compile-css',<% if (starterTheme === 'roots') { %>
    'copy:initphp',
    'version'<% } %>
  ]);

  grunt.registerTask('dist', [
    'app',
    'clean:dist',
    'copy:dist',
    'cssmin',<% if (useImagemin) { %>
    'imagemin',
    'svgmin',<% } %><% if (useModernizr) { %>
    'modernizr'<% } %>
  ]);
<% if (starterTheme === 'roots') { %>
  grunt.registerTask('initphp', [
    'copy:initphp'
  ]);<% } %>

  // Aliases

  grunt.registerTask('server', function () {
    grunt.log.writeln('You should use `watch` task instead.');
    grunt.log.warn('`server` will soon be deprecated !');
    grunt.task.run(['watch']);
  });

  grunt.registerTask('build', function () {
    grunt.log.writeln('You can also use `dist` task.');
    grunt.task.run(['dist']);
  });

};
