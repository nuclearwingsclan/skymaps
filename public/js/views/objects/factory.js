define(['underscore', 'backbone', 'leaflet', 'views/objects/note'], function(_, Backbone, L, NoteView) {
	'use strict';

	return NoteView.extend({
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
