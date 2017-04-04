define(['backbone'], function(Backbone) {
	'use strict';

	return Backbone.Model.extend({
		initialize: function(options) {
			this.appModel = options.app;
		},

		open: function(region, level, center) {
			this.appModel.load(region, level, center);
		},

		getRegion: function() {
			return this.appModel.get('location').region;
		}
	});

});
