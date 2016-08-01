define(['underscore', 'backbone', 'jquery'], function(_, Backbone, $) {
	'use strict';

	var $navigatorBtn = $('.caption .controls button.navigator, button.open-navigator');
	var $navigatorOverlay = $('.navigator-overlay');

	return Backbone.View.extend({
		initialize: function() {
			$navigatorBtn.click(_.bind(this.toggleNavigator, this));
			$navigatorOverlay.on('click mousedown touchdown', _.bind(this.closeNavigator, this));
		},

		toggleNavigator: function() {
			console.log('toggle');
			$('body').toggleClass('navigator');
		},

		closeNavigator: function() {
			console.log('cloes');
			$('body').removeClass('navigator');
		}		
	});

});
