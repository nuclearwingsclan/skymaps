require.config({
	paths: {
		'backbone': '../bower_components/backbone/backbone',
		'jquery': '../bower_components/jquery/dist/jquery.min',
		'leaflet': '../bower_components/leaflet/dist/leaflet',
		'leaflet.label': '../bower_components/Leaflet.label/dist/leaflet.label',
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
		},
		'leaflet.label': {
			deps: ['leaflet']
		}
	}
});

require(['backbone', 'models/app', 'views/container', 'router'], function(Backbone, AppModel, ContainerView, Router) {
	'use strict';

	var appModel = new AppModel(),
		containerView = new ContainerView({ model: appModel }),
		router = new Router(appModel);

	Backbone.history.start({ pushState: true, root: '/' });
});
