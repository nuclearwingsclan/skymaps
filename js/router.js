define(['backbone'], function(Backbone) {
	'use strict';

	var Router = Backbone.Router.extend({
		initialize: function(mapModel) {
			this.mapModel = mapModel;
		},
		routes: {
			'': 'index',
			':region/:map/': 'loadMap'
		},
		index: function() {
			this.loadMap('pf', 'index');
		},
		loadMap: function(region, map) {
			this.mapModel.load(region, map);
		}
	});

	return Router;

});
