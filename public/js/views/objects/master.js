define(['underscore', 'backbone', 'leaflet', 'views/objects/label'], function(_, Backbone, L, LabelView) {
	'use strict';

	return LabelView.extend({
		markerIcon: L.icon({
			iconUrl: '/i/objects/master.svg',
			iconSize: [68, 68],
			iconAnchor: [17, 21],
			popupAnchor:  [18, -16]
		}),
		popupContent: function(data) {
			return _.template($('#master-popup').html())(data);
		}
	});

});
