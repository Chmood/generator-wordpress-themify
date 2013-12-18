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

Install software (needs admin rights) :

```
npm install -g yo generator-wordpress-themify
```

Browse to your wordpress theme folder. Something like :

```
cd /var/www/wordpress/wp-content/themes/
```

Create a directory, name it something like 'dev' or 'mytheme-factory', no matter, and jump into it :

```
mkdir dev && cd $_
```

Install and configure your theme options :

```
yo wordpress-themify
```

Initialize the theme

```
grunt
```

Start watching for file change

```
grunt watch
```

(Eventually activate your browser's livereload plugin now)

In wordpress admin pannel, go to Appearance > Themes. You will see your new theme, in both a development and a production version. Activate the development version.

WARNING : so far, both themes look identical (they share the same styles.css). In order to distinct the two, activate one and check the sources for either main.js or main.css. If the code is minified, you picked the production theme. Activate the other theme in this case. If the code isn't minified, you're done. I will fix this soon.

Now you're set up, start coding the magic!

Once you're done, build an optimized production theme

```
grunt
```
Have fun!





## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
