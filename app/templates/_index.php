<html>
  <head>
    <link rel="stylesheet" href="<?php bloginfo( 'template_url' ); ?>/assets/css/main.css" media="all">
<% if (useModernizr) { %>
    <script src="<?php bloginfo( 'template_url' ); ?>/bower_components/modernizr/modernizr.js"></script><% } %>
    <script src="<?php bloginfo( 'template_url' ); ?>/bower_components/jquery/jquery.min.js"></script>
  </head>
  <body>
<% if (useBootstrap) { %>
    <div class="jumbotron">
      <h1> Welcome to WPT!<h1>
    </div><% } %><% if (!useBootstrap) { %>
    <h1> Welcome to WPT!<h1><% } %>

    <script src="<?php bloginfo( 'template_url' ); ?>/assets/js/main.js"></script>
  </body>
</html>
