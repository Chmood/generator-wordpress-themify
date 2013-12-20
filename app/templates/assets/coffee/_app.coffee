"use strict"

#global jQuery, document
(($) ->
  App = ->

  App::init = ->
    $("h1").css "color", "#f08"<% if (useSampleJquery) { %>
    $("h1").jQueryPlugin()<% } %>
    console.log "Welcome to Wordpress-themify!"

  $(document).ready ->
    app = new App()
    app.init()

) jQuery
