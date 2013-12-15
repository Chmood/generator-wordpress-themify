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
      app: '.',
      dist: '../<%%= pkg.name %>-dist'
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
        '!assets/js/scripts.min.js'
      ]
    },<% } %>
    uglify: {
      watch: {
        files: {
          'assets/js/scripts.min.js': [
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
            'bower_components/bootstrap/js/affix.js',
            'assets/js/plugins/*.js',
            'assets/js/_*.js'
          ]
        },
        options: {
          // JS source map: to enable, uncomment the lines below and update sourceMappingURL based on your install
          // sourceMap: 'assets/js/scripts.min.js.map',
          // sourceMappingURL: '/app/themes/roots/assets/js/scripts.min.js.map'
        }
      }
    },

    // CSS
    // TODO : simple css case
<% if (preproCss === 'less') { %>   // Less compilation
    less: {
      watch: {
        files: {
          'assets/css/main.min.css': [
            'assets/less/app.less'
          ]
        },
        options: {
          compress: true,
          // LESS source map
          // To enable, set sourceMap to true and update sourceMapRootpath based on your install
          sourceMap: false,
          sourceMapFilename: 'assets/css/main.min.css.map',
          sourceMapRootpath: '/app/themes/roots/'
        }
      }
    },<% } %>
<% if (preproCss === 'sass') { %>   // Sass compilation
    compass: {
      options: {
        sassDir: 'assets/sass',
        cssDir: '.tmp/assets/css',
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
      },
      watch: {
        options: {
          generatedImagesDir: 'assets/img/generated'
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
          cwd: 'assets/css',
          src: 'main.min.css',
          dest: 'assets/css'
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
          cwd: 'assets/img',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%%= yeoman.dist %>/assets/img'
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
    },<% } %>
    version: {
      options: {
        file: 'lib/scripts.php',
        css: 'assets/css/main.min.css',
        cssHandle: 'roots_main',
        js: 'assets/js/scripts.min.js',
        jsHandle: 'roots_scripts'
      }
    },
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

    watch: {
      // WARNING : this setup is highly acrobatic :
      //  compiles BOTH lass AND sass on file change
      //  you better comment out either less: or compass: section below
      less: {
        files: [
          'assets/less/*.less',
          'assets/less/bootstrap/*.less'
        ],
        tasks: ['less', 'autoprefixer', 'version']
      },
      compass: {
        files: [
          'assets/sass/{,*/}*.{scss,sass}'
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
          'assets/css/main.min.css',
          'assets/js/scripts.min.js',
          'templates/*.php',
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
      watch: [
        'assets/css/main.min.css',
        'assets/js/scripts.min.js'
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
