define(['underscore', 'backbone', 'leaflet', 'views/objects/note'], function(_, Backbone, L, NoteView) {
	'use strict';

	return NoteView.extend({
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
