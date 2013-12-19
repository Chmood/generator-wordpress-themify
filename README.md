# generator-wordpress-themify

Wordpress Theme generator for [Yeoman](http://yeoman.io).
Mostly based on popular [Roots](https://github.com/roots/roots) starter theme.

(Still WIP, please use with caution)


## Features

* Bootstrap, in Less, Sass or plain css version
* Modernizr (with custom optimized build) 
* CSS autoprefixer
* Image minification
* True 'dist' folder for production use
* Some sample example files

All features are optional, take only what you need!


## Quick start


### Tools installation

(Assuming you already have node installed properly)
Install software (needs admin rights) :

```
npm install -g yo generator-wordpress-themify
```

### Theme creation

Browse to your wordpress theme folder. Something like :

```
cd /var/www/wordpress/wp-content/themes/
```

Create a directory, name it something like 'dev' or 'mytheme-factory', no matter, and jump into it :

```
mkdir dev && cd $_
```

Install your theme and configure options :

```
yo wordpress-themify
```

### Theme activation

Once the installation finished, you still need to initialize the theme.

```
grunt init
```
It will fetch Roots' php files, plus run the first 'compilation' of your source files.
You only need to run ```grunt init``` once, after what you can safely delete the hidden .phpmod directory.
(I'm still looking for a better solution)

In wordpress admin pannel, go to Appearance > Themes. Activate the development version of your theme. Browse to your site, and eventually turn on your browser's livereload plugin now.


### Workflow

Start watching for file change

```
grunt watch
```

Now you're set up, start coding the magic!

Once you're done, build an optimized production theme :
(You can set the destination folder in Gruntfile.js)

```
grunt
```
And then switch wordpress to the production theme.
(But do keep a copy of the development files!)


Have fun!


### TODO

* Coffeescript
* Unit testing
* RequireJS

* fix the php files copying routine
* add a .tmp folder (and usemin)
* add an options.js config file


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
