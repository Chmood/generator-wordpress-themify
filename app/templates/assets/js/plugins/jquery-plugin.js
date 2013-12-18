'use strict';
/* ========================================================================
 * BOOTSTRAP STYLE JQUERY PLUGIN TEMPLATE
 *
 * ========================================================================
 * By Nicolas Giethlen
 */

// How to use :
//  - say your plugin name is 'Foo'
//  - rename this file into foo.js
//  - search and replace any occurence in this file :
//    - from 'JQueryPlugin' to 'Foo'
//    - from 'jQueryPlugin' to 'foo'
//  - you're done, start coding magic!

/*global jQuery */
(function ($) {

  // PUBLIC CLASS DEFINITION
  // =======================

  var JQueryPlugin = function (element, options) {
    this.$element = $(element);
    this.options  = $.extend({}, JQueryPlugin.DEFAULTS, options);

    // Do something with element
    this.$element.css('background-color', 'gray');
  };

  // Define the plugin defaults
  JQueryPlugin.DEFAULTS = {
    someParameter: 'someValue'
  };


  // PLUGIN DEFINITION
  // =================

  var old = $.fn.jQueryPlugin;

  $.fn.jQueryPlugin = function (option) {
    return this.each(function () {
      var $this   = $(this);
      var data    = $this.data('ns.jQueryPlugin');
      var options = typeof option === 'object' && option;

      if (!data) {
        $this.data('ns.jQueryPlugin', (data = new JQueryPlugin(this, options)));
      }
    });
  };

  $.fn.jQueryPlugin.Constructor = JQueryPlugin;


  // NO CONFLICT
  // ===========

  $.fn.jQueryPlugin.noConflict = function () {
    $.fn.jQueryPlugin = old;
    return this;
  };


  // DATA-API
  // ========

//  $(document).on('click', function (e) {
//  });

}(jQuery));
