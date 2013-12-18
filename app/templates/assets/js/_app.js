'use strict';
/*global jQuery, document */
(function ($) {

  var App = function () {
  };

  App.prototype.init = function () {
<% if (useSampleJquery) { %>
    $('h1').jQueryPlugin();<% } %>
    console.log('Welcome to Wordpress-themify!');
  };

  $(document).ready(function () {
    var app = new App();
    app.init();
  });

}(jQuery));

