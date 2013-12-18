# generator-wordpress-themify

Wordpress Theme generator for [Yeoman](http://yeoman.io).
Mostly based on [Roots](https://github.com/roots/roots) starter theme.


## Features

* Bootstrap, in Less, Sass or plain css version
* Modernizr (with custom optimized build) 
* CSS autoprefixer
* True 'dist' folder for production use
* Image minification
* Some boilerplate exemple files

### TODO

* Coffeescript
* Unit testing
* RequireJS


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

Install your theme and configure options :

```
yo wordpress-themify
```

If you choose to use Roots starter theme, initialize it :
(This step shouldn't be necessary in the future.)

```
grunt init
```

Start watching for file change

```
grunt watch
```


In wordpress admin pannel, go to Appearance > Themes. Activate the development version of your theme. Browse to your site, and eventually activate your browser's livereload plugin now.


Now you're set up, start coding the magic!

Once you're done, build an optimized production theme :
(You can set the destination folder in Gruntfile.js)

```
grunt
```
And then switch wordpress to the production theme.
(But do keep a copy of the dev theme!)

Have fun!





## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
