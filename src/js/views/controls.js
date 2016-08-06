define(['underscore', 'backbone', 'jquery', 'views/controls/link'], function(_, Backbone, $, LinkView) {
	'use strict';

	var $editBtn = $('.controls button.edit');
	var $linkBtn = $('.controls button.link');

	var $navigatorBtn = $('.caption .controls button.navigator, button.open-navigator');
	var $navigatorOverlay = $('.navigator-overlay');

	return Backbone.View.extend({
		initialize: function(options) {
			this.app = options.app;

			$linkBtn.click(_.bind(this.openLinkDialog, this));
			$navigatorBtn.click(_.bind(this.toggleNavigator, this));
			$navigatorOverlay.on('click mousedown touchdown', _.bind(this.closeNavigator, this));

			this.listenTo(this.app, 'change:location', this.updateEditorLink);
		},

		openLinkDialog: function() {
			var linkView = new LinkView({
				caption: $linkBtn.attr('title')
			});
		},

		toggleNavigator: function() {
			$('body').toggleClass('navigator');
		},

		closeNavigator: function() {
			$('body').removeClass('navigator');
		},

		updateEditorLink: function() {
			var location = this.app.get('location');
			$editBtn.attr('onclick', 'window.open("/editor/?map=' + location.region + '/' + location.level + '")');
		}	
	});

});
