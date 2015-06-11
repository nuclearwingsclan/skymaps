define(['underscore', 'backbone', 'leaflet', 'views/objects/note'], function(_, Backbone, L, NoteView) {
	'use strict';

	return NoteView.extend({
		markerIcon: L.icon({
			iconUrl: '/i/objects/quest.svg',
			iconSize: [52, 52],
			iconAnchor: [10, 10],
			popupAnchor:  [17, 0]
		}),
		popupContent: function(data) {
			return _.template($('#quest-popup').html())(data);
		}
	});

});
