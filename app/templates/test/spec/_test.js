/*global describe, it, expect, before, after */
'use strict';
(function ($) {

  before(function () {<% if (useSampleJquery) { %>
    $('body').append('<h1 class="test">jQuery plugin test</h1>');
    $('h1.test').jQueryPlugin();<% } %>
  });

  after(function () {<% if (useSampleJquery) { %>
    $('h1.test').remove();<% } %>
  });

  describe('<%= themeName %> unit tests', function () {

    describe('Testing app.js', function () {

      it('should validate something', function () {
        // Not very useful yet
        expect(true).to.be.true;
      });
    });<% if (useSampleJquery) { %>

    describe('Testing jquery-plugin.js', function () {

      it('should be initialized', function () {
        expect($('h1.test').data('ns.jQueryPlugin')).to.be.a('object');
      });

      it('should make h1 border-bottomed', function () {
        expect($('h1.test').css('border-bottom-width') === '4px').to.be.true;
      });
    });<% } %>
  });

  }(jQuery));
