#global describe, it, expect, before, after
"use strict"
(($) ->
  before -><% if (useSampleJquery) { %>
    $("body").append "<h1 class=\"wpt-test\"> </h1>"
    $("h1.test").jQueryPlugin()<% } %>

  after -><% if (useSampleJquery) { %>
    $("h1.wpt-test").remove()<% } %>

  describe "<%= themeName %> unit tests", ->
    describe "Testing app.js", ->
      it "should validate something", ->

        # Not very useful yet
        expect(true).to.be.true<% if (useSampleJquery) { %>


    describe "Testing jquery-plugin.js", ->
      it "should be initialized", ->
        expect($("h1.wpt-test").data("ns.jQueryPlugin")).to.be.a "object"

      it "should make h1 border-bottomed", ->
        expect($("h1.wpt-test").css("border-bottom-width") is "4px").to.be.true
<% } %>


) jQuery
