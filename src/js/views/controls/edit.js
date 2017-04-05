define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var _ = require('underscore');
	var $ = require('jquery');
	var LinkView = require('views/link');
	require('views/hint');

	return Backbone.View.extend({
		el: $('#map > .controls button.link'),

		initialize: function(options) {
			this.appModel = options.app;
			this.$el.click(_.bind(this.openDialog, this)).hint(this.$el.data('title'));
			this.listenTo(this.appModel, 'change:location', this.updateControl);
		},

		updateControl: function() {
			var location = this.appModel.get('location');
			if (location.region == 'index') {
				this.$el.hide();
			} else {
				this.$el.show();
			}
		},

		openDialog: function() {
			var linkView = new LinkView({
				caption: this.$el.data('title'),
				url: window.location.href
			});
		}
	});

});
