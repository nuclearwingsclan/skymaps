define(['underscore', 'backbone', 'leaflet', 'views/objects/note'], function(_, Backbone, L, NoteView) {
	'use strict';

	return NoteView.extend({
		hintText: 'Флягеры',
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
