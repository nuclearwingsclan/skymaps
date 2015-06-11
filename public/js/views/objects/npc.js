define(['underscore', 'backbone', 'leaflet', 'views/objects/note'], function(_, Backbone, L, NoteView) {
	'use strict';

	return NoteView.extend({
		markerIcon: L.icon({
			iconUrl: '/i/objects/npc.svg',
			iconSize: [52, 20],
			iconAnchor: [7, 20],
			popupAnchor:  [19, -19]
		}),
		popupContent: function(data) {
			return _.template($('#npc-popup').html())(data);
		}
	});

});
