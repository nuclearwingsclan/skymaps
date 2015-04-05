define(['backbone'], function(Backbone) {
	'use strict';

	var Router = Backbone.Router.extend({
		initialize: function(appModel) {
			this.appModel = appModel;
		},
		routes: {
			'': 'index',
			':region/:map/': 'loadMap'
		},
		index: function() {
			this.loadMap('pf', 'index');
		},
		loadMap: function(region, level) {
			this.appModel.load(region, level);
		}
	});

	return Router;

});
