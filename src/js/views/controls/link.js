define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var _ = require('underscore');
	var $ = require('jquery');
	require('views/hint');

	return Backbone.View.extend({
		el: $('#map > .controls button.edit'),

		initialize: function(options) {
			this.appModel = options.app;
			this.$el.hint(this.$el.data('title'));
			this.listenTo(this.appModel, 'change:location', this.updateLink);
		},

		updateLink: function() {
			var location = this.appModel.get('location');
			var path = location.region != 'index' ? '?map=' + location.region + '/' + location.level : '';
			this.$el.attr('onclick', 'window.open("/editor/' + path + '")');
		}	
	});

});
