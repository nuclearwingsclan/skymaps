define(['underscore', 'backbone', 'leaflet', 'views/objects/note'], function(_, Backbone, L, NoteView) {
	'use strict';

	return NoteView.extend({
		hintText: 'Мастерская',
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
