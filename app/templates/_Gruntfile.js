'use strict';
module.exports = function(grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    // Project settings
    yeoman: {
      // Configurable paths
      dist: '../<%= themeName %>'
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
        '<%= dirApp %>assets/js/{,*/}*.js',
        '!<%= dirApp %>/assets/js/scripts.min.js'
      ]
    },<% } %>
<% if (!useRequirejs) { %>    // Uglify scripts
    uglify: {
      watch: {
        files: {
          '<%= dirApp %>/assets/js/scripts.min.js': [<% if (useBootstrap && (preproCss === 'less' || preproCss === 'css')) { %>
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
            '<%= dirApp %>/assets/js/plugins/*.js',
            '<%= dirApp %>/assets/js/_*.js'
          ]
        },
        options: {
          // JS source map: to enable, uncomment the lines below and update sourceMappingURL based on your install
          // sourceMap: 'assets/js/scripts.min.js.map',
          // sourceMappingURL: '/app/themes/roots/assets/js/scripts.min.js.map'
        }
      }
    },<% } %>

    // CSS
    // TODO : simple css case
<% if (preproCss === 'less') { %>   // Less compilation
    less: {
      watch: {
        files: {
          '<%= dirApp %>/assets/css/main.min.css': [
            '<%= dirApp %>/assets/less/app.less'
          ]
        },
        options: {
          compress: true,
          // LESS source map
          // To enable, set sourceMap to true and update sourceMapRootpath based on your install
          sourceMap: false,
          sourceMapFilename: '<%= dirApp %>/assets/css/main.min.css.map',
          sourceMapRootpath: '/app/themes/roots/'
        }
      }
    },<% } %>
<% if (preproCss === 'sass') { %>   // Sass compilation
    compass: {
      options: {
        sassDir: '<%= dirApp %>/assets/sass',
        cssDir: '<%= dirApp %>/.tmp/assets/css',
        // CSS output mode. Can be: nested, expanded, compact, compressed.
        outputStyle: 'compressed',
        // TODO : figure out what's the use of the options below
        generatedImagesDir: '<%= dirApp %>/.tmp/images/generated',
        imagesDir: '<%= dirApp %>/assets/img',
        javascriptsDir: '<%= dirApp %>/assets/js',
        fontsDir: '<%= dirApp %>/assets/fonts',
        importPath: '<%= dirApp %>/bower_components',
        httpImagesPath: '<%= dirApp %>/assets/img',
        httpGeneratedImagesPath: '<%= dirApp %>/assets/img/generated',
        httpFontsPath: '<%= dirApp %>/assets/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        debugInfo: true
      },
      watch: {
        options: {
          generatedImagesDir: '<%= dirApp %>/assets/img/generated'
        }
      }
    },<% } %>
<% if (useAutoprefixer) { %>    // CSS-autoprefixer
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      watch: {
        files: [{
          expand: true,
          cwd: '<%= dirApp %>/assets/css',
          src: 'main.min.css',
          dest: '<%= dirApp %>/assets/css'
        }]
      }
    },<% } %>
<% if (useImagemin) { %>    // IMAGES
    imagemin: {
      options: {
        force: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= dirApp %>/assets/img',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%%= yeoman.dist %>/assets/img'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= dirApp %>/assets/img',
          src: '{,*/}*.svg',
          dest: '<%%= yeoman.dist %>/assets/img'
        }]
      }
    },<% } %>
    version: {
      options: {
        file: '<%= dirApp %>/lib/scripts.php',
        css: '<%= dirApp %>/assets/css/main.min.css',
        cssHandle: 'roots_main',
        js: '<%= dirApp %>/assets/js/scripts.min.js',
        jsHandle: 'roots_scripts'
      }
    },
<% if (useModernizr) { %>   // Modernizr minimal custom build
    modernizr: {
      devFile: 'bower_components/modernizr/modernizr.js',
      outputFile: '<%%= yeoman.dist %>/bower_components/modernizr/modernizr.js',
      files: [
        '<%= dirApp %>/assets/js/{,*/}*.js',
        '<%= dirApp %>/assets/css/{,*/}*.css'
      ],
      uglify: true
    },<% } %>

    // WATCH DAEMON
    // Automatic tasks

    watch: {
      // WARNING : this setup is highly acrobatic :
      //  compiles BOTH lass AND sass on file change
      //  you better comment out either less: or compass: section below
      less: {
        files: [
          '<%= dirApp %>/assets/less/*.less',
          '<%= dirApp %>/assets/less/bootstrap/*.less'
        ],
        tasks: ['less', 'autoprefixer', 'version']
      },
      compass: {
        files: [
          '<%= dirApp %>/assets/sass/{,*/}*.{scss,sass}'
        ],
        tasks: ['compass', 'cssmin', 'autoprefixer', 'version']
      },

      js: {
        files: [
          '<%%= jshint.all %>'
        ],
        tasks: ['jshint', 'uglify', 'version']
      },
      jstest: {
          files: ['test/spec/{,*/}*.js'],
          tasks: ['test:watch']
      },
      // Files that trigger a livereload event
      livereload: {
        options: {
          livereload: true
        },
        files: [
          '<%= dirApp %>/assets/css/main.min.css',
          '<%= dirApp %>/assets/js/scripts.min.js',
          '<%= dirApp %>/templates/*.php',
          '<%= dirApp %>/*.php'
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      options: {
        // force is needed in case of deleting files outside the root directory
        force: true
      },
      watch: [
        '<%= dirApp %>/assets/css/main.min.css',
        '<%= dirApp %>/assets/js/scripts.min.js'
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
            cwd: '<%= dirApp %>',
            dest: '<%%= yeoman.dist %>',
            src: [
              'style.css',
              '*.{ico,png,txt}',
              'assets/img/{,*/}*.webp',
              'bower_components/sass-bootstrap/fonts/*.*',
              'bower_components/jquery/jquery.min.js',
              'screenshot.{png/jpg/jpeg}',
              '{,*/}*.php',
              'assets/css/*.css',
              'assets/fonts/*.*',
              'assets/js/scripts.min.js',
              'assets/js/vendor/{,*/}*.js'
            ]
          }
        ]
      }
    }

  });

  /*****************************************************************************
   *  TASKS REGISTERING
   */

  // Internal tasks, usually not called from grunt CLI

  // Compiles sass/less files to CSS
  grunt.registerTask('compile-css', [<% if (preproCss === 'less') { %>
    'less',<% } %><% if (preproCss === 'sass') { %>
    'compass'<% } %><% if (useAutoprefixer) { %>
    'autoprefixer',<% } %>
  ]);
  
  // Public tasks, called from grunt CLI

  grunt.registerTask('default', [
    'clean:watch',
    'compile-css',
    'uglify',
    'version'
  ]);

  grunt.registerTask('dist', [
    'clean:dist',<% if (useModernizr) { %>
    'modernizr',<% } %><% if (useImagemin) { %>
    'imagemin',
    'svgmin',<% } %>
    'copy:dist'
  ]);

  // Aliases

  grunt.registerTask('server', function () {
      grunt.log.writeln('You can also use `watch` task.');
      grunt.log.warn('`server` task will soon be deprecated !');
      grunt.task.run(['watch']);
  });

  grunt.registerTask('build', function () {
      grunt.log.writeln('You can also use `dist` task.');
      grunt.task.run(['dist']);
  });


};
