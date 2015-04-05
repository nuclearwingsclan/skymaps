require.config({
	paths: {
		'backbone': '../bower_components/backbone/backbone',
		'backbone-query-parameters': '../bower_components/backbone-query-parameters/backbone.queryparams.min',
		'jquery': '../bower_components/jquery/dist/jquery.min',
		'leaflet': '../bower_components/leaflet/dist/leaflet',
		'underscore': '../bower_components/underscore/underscore-min'
	},
	shim: {
		'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backbone-query-parameters': {
 			deps: ['backbone-query-parameters']
        },
        'underscore': {
            exports: '_'
        },
        'leaflet': {
            exports: 'L'
        }
	}
});

require(['backbone', 'models/map', 'views/map', 'router'], function(Backbone, MapModel, MapView, Router) {
	'use strict';

	var mapModel = new MapModel(),
		mapView = new MapView({ model: mapModel }),
		router = new Router(mapModel);

	Backbone.history.start({ pushState: true, root: '/' });
});
