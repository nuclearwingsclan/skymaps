define(['underscore', 'backbone', 'jquery'], function(_, Backbone, $) {
	'use strict';

	var $editBtn = $('.controls button.edit');

	var $navigatorBtn = $('.caption .controls button.navigator, button.open-navigator');
	var $navigatorOverlay = $('.navigator-overlay');

	return Backbone.View.extend({
		initialize: function(options) {
			this.app = options.app;

			$navigatorBtn.click(_.bind(this.toggleNavigator, this));
			$navigatorOverlay.on('click mousedown touchdown', _.bind(this.closeNavigator, this));

			this.listenTo(this.app, 'change:location', this.updateEditorLink);
		},

		updateEditorLink: function() {
			var location = this.app.get('location');
			$editBtn.attr('onclick', 'window.open("/editor/?map=' + location.region + '/' + location.level + '")');
		},

		toggleNavigator: function() {
			$('body').toggleClass('navigator');
		},

		closeNavigator: function() {
			$('body').removeClass('navigator');
		}		
	});

});
