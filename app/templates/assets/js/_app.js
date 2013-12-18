'use strict';
/*global jQuery, document */
(function ($) {

  $(document).ready(function () {
<% if (useSampleJquery) { %>
    $('h1').jQueryPlugin();<% } %>

    console.log('Welcome to WPT!');
  });

}(jQuery));

