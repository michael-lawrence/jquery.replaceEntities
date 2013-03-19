'use strict';

(function ($, plugin) {
	if ($) { // Global jQuery
		plugin.fn = (plugin.isStatic ? $ : $.fn)[plugin.name] = plugin.factory($);
	}

	if (typeof exports !== 'undefined' && plugin.fn) { // CommonJS
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = plugin.fn;
		}

		exports[plugin.name] = plugin.fn;
	} else if (typeof define === 'function' && define.amd) { // AMD
		define(plugin.deps, function ($) {
			var fn = (plugin.isStatic ? $ : $.fn)[plugin.name] = plugin.factory($);
			return fn;
		});
	} else if (!$) {
		/*
			jQuery isn't defined and user is
			trying to use plugin directly without
			CommonJS or AMD support
		*/
		throw 'jQuery not defined.';
	}
})(window.$, {
	'name' : 'replaceEntities',
	'isStatic' : true,
	'deps' : ['jquery'],
	'factory' : function ($) {
		return function () {
			var decoded = $(this).html().replace(/(\&\w+\;)/g, function(match, $1) {
				return $('<div/>').html($1).text();
			});

			return $(this).html(decoded);
		};
	}
});