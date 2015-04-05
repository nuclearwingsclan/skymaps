require.config({
	paths: {
		'backbone': '../bower_components/backbone/backbone',
		'jquery': '../bower_components/jquery/dist/jquery.min',
		'leaflet': '../bower_components/leaflet/dist/leaflet',
		'underscore': '../bower_components/underscore/underscore-min'
	},
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		},
		'leaflet': {
			exports: 'L'
		}
	}
});

require(['backbone', 'models/app', 'views/app', 'router'], function(Backbone, AppModel, AppView, Router) {
	'use strict';

	var appModel = new AppModel(),
		appView = new AppView({ model: appModel }),
		router = new Router(appModel);

	Backbone.history.start({ pushState: true, root: '/' });
});
