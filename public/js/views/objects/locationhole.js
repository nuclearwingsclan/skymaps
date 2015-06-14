define(['underscore', 'backbone', 'leaflet', 'views/objects/hole'], function(_, Backbone, L, HoleView) {
	'use strict';

	return HoleView.extend({
		markerIcon: L.icon({
			iconUrl: '/i/objects/locationhole.svg',
			iconSize: [100, 100],
			iconAnchor: [14, 14]
		})
	});

});
