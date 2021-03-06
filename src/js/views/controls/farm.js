define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var _ = require('underscore');
	var $ = require('jquery');
	var FarmView = require('views/farm');
	require('views/hint');

	return Backbone.View.extend({
		el: $('#map > .controls button.farm'),

		initialize: function(options) {
			this.appModel = options.app;
			this.metaModel = options.meta;
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
			var farmView = new FarmView({
				caption: this.$el.data('title'),
				drop: this.metaModel.get('drop')
			});
		}
	});

});
