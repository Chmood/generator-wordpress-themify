/* ========================================================================
 * UMD + BOOTSTRAP STYLE JQUERY PLUGIN TEMPLATE
 * 
 * ========================================================================
 * Copyright 2013.
 */



'use strict';

(function (factory) {
	/*global define */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }

}(function ($) {

	// PUBLIC CLASS DEFINITION
	// =======================

	var JQueryPlugin = function (element, options) {
		this.$element = $(element);
		this.options  = $.extend({}, JQueryPlugin.DEFAULTS, options);
		this.$element.css('background-color', 'gray');
	};

	JQueryPlugin.DEFAULTS = {
		loadingText: 'loading...'
	};

/*	JQueryPlugin.prototype.setState = function (state) {
	};
*/

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

	$(document).on('click', function (e) {
//		var $btn = $(e.target);
		e.preventDefault();
	});

}));
