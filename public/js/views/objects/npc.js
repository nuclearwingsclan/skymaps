define(['underscore', 'backbone', 'leaflet', 'views/objects/label'], function(_, Backbone, L, LabelView) {
	'use strict';

	return LabelView.extend({
		markerIcon: L.icon({
			iconUrl: '/i/objects/npc.svg',
			iconSize: [50, 18],
			iconAnchor: [6, 19],
			popupAnchor:  [19, -19]
		}),
		popupContent: function(data) {
			return _.template($('#npc-popup').html())(data);
		}
	});

});
