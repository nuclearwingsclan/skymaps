define(['underscore', 'backbone', 'leaflet', 'views/objects/label'], function(_, Backbone, L, LabelView) {
	'use strict';

	return LabelView.extend({
		markerIcon: L.icon({
			iconUrl: '/i/objects/flager.svg',
			iconSize: [70, 90],
			iconAnchor: [13, 21],
			popupAnchor:  [22, -11]
		}),
		popupContent: function(data) {
			return _.template($('#flager-popup').html())(data);
		}
	});

});
