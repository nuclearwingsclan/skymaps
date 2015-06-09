define(['underscore', 'backbone', 'leaflet', 'views/objects/flag'], function(_, Backbone, L, FlagView) {
	'use strict';

	return FlagView.extend({
		markerIcon: L.icon({
			iconUrl: '/i/objects/tree.svg',
			iconSize: [46, 46],
			iconAnchor: [1, 0],
			popupAnchor:  [18, -5]
		});
	});

});
