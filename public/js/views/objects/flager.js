define(['underscore', 'backbone', 'leaflet', 'views/objects/label'], function(_, Backbone, L, LabelView) {
	'use strict';

	return LabelView.extend({
		markerIcon: L.icon({
			iconUrl: '/i/objects/flager.png',
			iconSize: [42, 62],
			iconAnchor: [0, 0],
			popupAnchor:  [21, 0]
		}),
		popupContent: function(data) {
			return _.template($('#flager-popup').html())(data);
		}
	});

});
