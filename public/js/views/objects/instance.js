define(['underscore', 'backbone', 'leaflet', 'views/objects/hole'], function(_, Backbone, L, HoleView) {
	'use strict';

	return HoleView.extend({
		markerIcon: L.icon({
			iconUrl: '/i/objects/instance.svg',
			iconSize: [60, 60],
			iconAnchor: [19, 19],
			popupAnchor:  [17, 0]
		})
	});

});
