define(['backbone', 'models/app'], function(Backbone, appModel) {
	'use strict';

	return Backbone.Model.extend({
		open: function(region, level, center) {
			appModel.load(region, level, center);
		},
		getRegion: function() {
			return appModel.get('location').region;
		}
	});

});
