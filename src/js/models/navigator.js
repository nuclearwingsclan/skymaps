define(['backbone'], function(Backbone) {
	'use strict';

	return Backbone.Model.extend({
		initialize: function(options) {
			this.appModel = options.app;
			this.updateLocation();
			this.listenTo(this.appModel, 'change:location', this.updateLocation);
		},
		updateLocation: function() {
			var location = this.appModel.get('location');
			if (location) {
				this.set(location);
			}
		},
		open: function(level) {
			this.appModel.load(this.get('region'), level);
		},
		home: function() {
			this.appModel.load('index', 'index');
		}
	});

});
