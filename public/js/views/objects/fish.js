define(['underscore', 'backbone', 'leaflet', 'views/objects/label'], function(_, Backbone, L, LabelView) {
	'use strict';

	return LabelView.extend({
		markerIcon: L.icon({
			iconUrl: '/i/objects/fish.svg',
			iconSize: [42, 42],
			iconAnchor: [6, 5],
			popupAnchor:  [16, -3]
		}),
		popupContent: function(data) {
			return _.template($('#fish-popup').html())(data);
		}
	});

});
