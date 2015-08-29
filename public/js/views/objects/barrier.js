define(['underscore', 'backbone', 'leaflet', 'views/objects/flag'], function(_, Backbone, L, FlagView) {
	'use strict';

	return FlagView.extend({
		hintText: 'Барьер (вешает сеть в корму)',
		markerIcon: L.icon({
			iconUrl: '/i/objects/barrier.svg',
			iconSize: [20, 20],
			iconAnchor: [4, 4]
		})
	});

});
