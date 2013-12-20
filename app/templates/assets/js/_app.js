'use strict';
/*global jQuery, document */
(function ($) {

  var App = function () {
  };

  App.prototype.init = function () {

    $('h1').css('color', '#f08');<% if (useSampleJquery) { %>
    $('h1').jQueryPlugin();<% } %>
    console.log('Welcome to Wordpress-themify!');
  };

  $(document).ready(function () {
    var app = new App();
    app.init();
  });

}(jQuery));

