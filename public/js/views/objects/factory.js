define(['underscore', 'backbone', 'leaflet', 'views/objects/label'], function(_, Backbone, L, LabelView) {
	'use strict';

	return LabelView.extend({
		markerIcon: L.icon({
			iconUrl: '/i/objects/factory.svg',
			iconSize: [58, 58],
			iconAnchor: [11, 11],
			popupAnchor:  [19, -4]
		}),
		popupContent: function(data) {
			return _.template($('#factory-popup').html())(data);
		}
	});

});
