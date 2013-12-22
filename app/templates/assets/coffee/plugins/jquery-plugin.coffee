"use strict"

# ========================================================================
# * BOOTSTRAP STYLE JQUERY PLUGIN TEMPLATE
# *
# * ========================================================================
# * Copyright 2013 Twitter, Inc.
# * By Nicolas Giethlen
#

# How to use :
#  - say your plugin name is 'Foo'
#  - rename this file into foo.js
#  - search and replace any occurence in this file :
#    - from 'JQueryPlugin' to 'Foo'
#    - from 'jQueryPlugin' to 'foo'
#  - you're done, start coding magic!

#global jQuery
(($) ->

  # PUBLIC CLASS DEFINITION
  # =======================
  JQueryPlugin = (element, options) ->
    @$element = $(element)
    @options = $.extend({}, JQueryPlugin.DEFAULTS, options)

    # Do something with element
    @$element.css "border-bottom", "4px solid"


  # Define the plugin defaults
  JQueryPlugin.DEFAULTS = someParameter: "someValue"

  # PLUGIN DEFINITION
  # =================
  old = $.fn.jQueryPlugin
  $.fn.jQueryPlugin = (option) ->
    @each ->
      $this = $(this)
      data = $this.data("ns.jQueryPlugin")
      options = typeof option is "object" and option
      $this.data "ns.jQueryPlugin", (data = new JQueryPlugin(this, options))  unless data


  $.fn.jQueryPlugin.Constructor = JQueryPlugin

  # NO CONFLICT
  # ===========
  $.fn.jQueryPlugin.noConflict = ->
    $.fn.jQueryPlugin = old
    this

# DATA-API
# ========

#  $(document).on "click", (e) ->
) jQuery
