# TODO

## Functions

RequireJS

> Needs harcoded script inclusion, unless wp_enqueue() can handle the data-main attribute
Plus crappy tweeks in order to let wordpress handle jquery by itself. See : http://kaidez.com/requirejs-wordpress/

Stylus bootstrap ?


## Enhancement

Add an options.js config file

Add a .tmp folder? (and then usemin too?)

> Like generator-webapp do. So no more 'uneditable' compiled/processed files like main.js and main.css poluting the app, amongst other advantages. And more complexity...

Re-re-add the app/ directory?

> Wordpress seems able to find themes in subdirs, is it a valid (development) practice?

Add grunt-concurrent tasks

Drop load-grunt-task in favor of conditional loading

> Seems to boost smaller tasks : https://github.com/gruntjs/grunt/issues/975#issuecomment-29058707


## To fix

* Damn FOUC when livereloading sass/less!
* Fix mocha tests to look nice in browser (plus jquery-plugin test refuses to work without app.js loaded)
* Find how to write a test on app.js (no global from the anonymous IIFE)
* Figure out why to explicitly call installDependencies (there was no need to before, iirc)
* newer:compass and newer:less stopped working


## Known issues

When using Roots without Bootstrap, Roots markup still include Bootstrap's presentational classes.

> Sounds like mass replace in many files. Out of the scope of my skills (wordpress php functions). Ask Roots authors!
