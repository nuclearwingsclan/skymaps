define(['underscore', 'backbone', 'jquery', 'views/controls/farm', 'views/controls/link', 'views/hint'], function(_, Backbone, $, FarmView, LinkView, hintView) {
	'use strict';

	var $farmBtn = $('.controls button.farm');
	var $editBtn = $('.controls button.edit');
	var $linkBtn = $('.controls button.link');

	var $navigatorBtn = $('.caption .controls button.navigator, button.open-navigator');
	var $navigatorOverlay = $('.navigator-overlay');

	return Backbone.View.extend({
		initialize: function(options) {
			this.app = options.app;

			$farmBtn.click(_.bind(this.openFarmDialog, this)).hint($farmBtn.data('title'));
			$linkBtn.click(_.bind(this.openLinkDialog, this)).hint($linkBtn.data('title'));
			$navigatorBtn.click(_.bind(this.toggleNavigator, this));
			$navigatorOverlay.on('click mousedown touchdown', _.bind(this.closeNavigator, this));

			$editBtn.hint($editBtn.data('title'));
			this.listenTo(this.app, 'change:location', this.updateEditorLink);
		},

		openFarmDialog: function() {
			var farmView = new FarmView({
				caption: $farmBtn.data('title')
			});
		},

		openLinkDialog: function() {
			var linkView = new LinkView({
				caption: $linkBtn.data('title')
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
