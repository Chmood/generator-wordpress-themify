# TODO

## Functions

Coffeescript

> http://js2coffee.org/

RequireJS

> Needs harcoded script inclusion, unless wp_enqueue() can handle data-main attribute
Plus crappy tweeks in order to let wordpress handle jquery by itself. See : http://kaidez.com/requirejs-wordpress/


## Enhancement

Add an options.js config file

Add a .tmp folder? (and then usemin too?)

> Like generator-webapp do. So no more 'uneditable' compiled/processed files like main.js and main.css poluting the app, amongst other advantages.

Re-re-add the app/ directory?

> Wordpress seems able to find themes in subdirs, is it a valid practice?

Add grunt-concurrent tasks

Drop load-grunt-task in favor of conditional loading

> Seems to boost smaller tasks : https://github.com/gruntjs/grunt/issues/975#issuecomment-29058707


## To fix

Boostrap's menu collapse plugin malfunction

Fix the php files copying routine

> Already tried hard copy with [http://stackoverflow.com/questions/19582786/yeoman-custom-generator-how-to-access-the-generated-project-in-the-dependencie](this trick). Also gave a go to remote.copy(), raises a warning because of [https://github.com/yeoman/generator/issues/303](this issue).

Fix the mocha/chai files copying routine (no sub-generator)

Fix mocha tests to look nice in browser (plus jquery-plugin test refuse to work withou app.js loaded)

How to write a test on app.js? (no global from the anonymous IIFE)


## Known issues

When using Roots without Bootstrap, Roots markup still include Bootstrap's presentational classes.

> Sounds like mass replace in many files. Out of the scope of my skills (wordpress php functions). Ask Roots authors.
