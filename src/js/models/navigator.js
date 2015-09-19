define(['backbone'], function(Backbone) {
	'use strict';

	return Backbone.Model.extend({
		initialize: function(options) {
			var app = this.app = options.app;
			this.updateLocation();
			this.listenTo(app, 'change:location', this.updateLocation);
		},
		updateLocation: function() {
			var location = this.app.get('location');
			if (location) {
				this.set({
					region: location.region,
					level: location.level
				});
			}
		},
		open: function(level) {
			this.app.set({
				location: {
					region: this.get('region'),
					level: level
				}
			});
		}
	});

});
