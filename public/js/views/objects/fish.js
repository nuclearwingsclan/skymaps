define(['underscore', 'backbone', 'leaflet', 'views/objects/label'], function(_, Backbone, L, LabelView) {
	'use strict';

	return LabelView.extend({
		markerIcon: L.icon({
			iconUrl: '/i/objects/fish.svg',
			iconSize: [40, 40],
			iconAnchor: [5, 4],
			popupAnchor:  [15, -2]
		}),
		popupContent: function(data) {
			return _.template($('#fish-popup').html())(data);
		}
	});

});
