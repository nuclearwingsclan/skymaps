define(['backbone'], function(Backbone) {
	'use strict';

	return Backbone.Router.extend({
		initialize: function(appModel) {
			this.appModel = appModel;
			appModel.on('change:location', this.navigate, this);
		},
		routes: {
			'': 'index',
			':region/:map/': 'loadMap'
		},
		index: function() {
			this.loadMap('index', 'index');
		},
		loadMap: function(region, level) {
			this.appModel.load(region, level);
		},
		navigate: function() {
			var location = this.appModel.get('location');
			if (location.region != 'index') {
				Backbone.history.navigate(location.region + '/' + location.level + '/');
			}
		}
	});

});