define(['underscore', 'backbone', 'leaflet', 'views/objects/label'], function(_, Backbone, L, LabelView) {
	'use strict';

	return LabelView.extend({
		markerIcon: L.icon({
			iconUrl: '/i/objects/factory.png',
			iconSize: [35, 35],
			iconAnchor: [0, 0],
			popupAnchor:  [17, 0]
		}),
		popupContent: function(data) {
			return _.template($('#factory-popup').html())(data);
		}
	});

});
