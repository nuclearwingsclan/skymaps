define(['underscore', 'backbone', 'leaflet', 'views/objects/note'], function(_, Backbone, L, NoteView) {
	'use strict';

	return NoteView.extend({
		markerIcon: L.icon({
			iconUrl: '/i/objects/beacon.svg',
			iconSize: [40, 40],
			iconAnchor: [7, 7],
			popupAnchor:  [18, -5]
		}),
		popupContent: function(data) {
			return _.template($('#beacon-popup').html())(data);
		}
	});

});
