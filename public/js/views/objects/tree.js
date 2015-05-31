define(['underscore', 'backbone', 'leaflet', 'views/objects/flag'], function(_, Backbone, L, FlagView) {
	'use strict';

	return FlagView.extend({
		markerIcon: L.icon({
			iconUrl: '/i/objects/tree.svg',
			iconSize: [40, 40],
			iconAnchor: [4, 3],
			popupAnchor:  [15, -2]
		});
	});

});
