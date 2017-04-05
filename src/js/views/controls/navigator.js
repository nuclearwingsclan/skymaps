define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var _ = require('underscore');
	var $ = require('jquery');

	return Backbone.View.extend({
		initialize: function() {
			var $navigatorBtn = $('.caption .controls button.navigator, button.open-navigator');
			var $navigatorOverlay = $('.navigator-overlay');

			$navigatorBtn.click(_.bind(this.toggleNavigator, this));
			$navigatorOverlay.on('click mousedown touchdown', _.bind(this.closeNavigator, this));
		},

		toggleNavigator: function() {
			$('body').toggleClass('navigator');
		},

		closeNavigator: function() {
			$('body').removeClass('navigator');
		}
	});

});
