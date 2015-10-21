define(['backbone', 'models/app'], function(Backbone, appModel) {
	'use strict';

	return Backbone.Model.extend({
		initialize: function(options) {
			this.updateLocation();
			this.listenTo(appModel, 'change:location', this.updateLocation);
		},
		updateLocation: function() {
			var location = appModel.get('location');
			if (location) {
				this.set(location);
			}
		},
		open: function(level) {
			appModel.load(this.get('region'), level);
		},
		home: function() {
			appModel.load('index', 'index');
		}
	});

});
