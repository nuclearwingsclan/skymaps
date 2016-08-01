define(['underscore', 'backbone', 'jquery'], function(_, Backbone, $) {
	'use strict';

	var $navigatorBtn = $('.caption .controls button.navigator');
	var $navigatorOverlay = $('.navigator-overlay');

	return Backbone.View.extend({
		initialize: function() {
			$navigatorBtn.click(_.bind(this.toggleNavigator, this));
			$navigatorOverlay.on('click mousedown touchdown', _.bind(this.closeNavigator, this));
		},

		openNavigator: function() {
			$('body').addClass('navigator');
		},

		closeNavigator: function() {
			$('body').removeClass('navigator');
		},

		isNavigatorOpen: function() {
			return $('body').hasClass('navigator');
		},

		toggleNavigator: function() {
			if (!this.isNavigatorOpen()) {
				this.openNavigator();
			} else {
				this.closeNavigator();
			}
			return false;
		}
	});

});
