define(['underscore', 'backbone', 'leaflet', 'views/objects/label'], function(_, Backbone, L, LabelView) {
	'use strict';

	return LabelView.extend({
		markerIcon: L.icon({
			iconUrl: '/i/objects/master.png',
			iconSize: [30, 30],
			iconAnchor: [0, 0],
			popupAnchor:  [15, 0]
		}),
		popupContent: function(data) {
			return _.template($('#master-popup').html())(data);
		}
	});

});
