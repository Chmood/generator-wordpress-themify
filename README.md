# generator-wordpress-themify

Wordpress Theme generator for [Yeoman](http://yeoman.io).

## Features

* Bootstrap, in both Less and Sass versions
* [Roots](https://github.com/roots/roots) starter theme
* Modernizr (with custom build task) 
* TODO RequireJS, plus some sample files
* CSS autoprefixer
* True 'dist' folder for optimized builds
* Image minification support

All features are optional, take only what you need!


## Quick startup

(Assuming you already have node installed properly)

* Install software (needs admin rights)

...
npm install -g yo generator-wordpress-themify
...

* Browse to your wordpress theme folder. Something like :

...
cd /var/www/wordpress/wp-content/themes/
...

* Create a directory, name it something like 'dev' or 'mytheme-factory', no matter :

...
mkdir dev && cd $_
...

* Configure your theme options

...
yo wordpress-themify
...

* Initialize the theme

...
grunt
...

* Start watching for file change

...
grunt watch
...

(Eventually activate your browser's livereload plugin now)

* In wordpress admin pannel, go to Appearance > Themes. You will see your new theme, in both a development and a production version. Activate the development version.

WARNING : so far, both themes look identical (they share the same styles.css). In order to distinct the two, activate one and check the sources for either main.js or main.css. If the code is minified, you picked the production theme. Activate the other theme in this case. If the code isn't minified, you're done. I will fix this soon.

* Now you're set up, start coding the magic!

* Once you're done, build an optimized production theme

...
grunt
...




## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-wordpress-themify from npm, run:

```
$ npm install -g generator-wordpress-themify
```

Finally, initiate the generator:

```
$ yo wordpress-themify
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
