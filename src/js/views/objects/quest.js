define(['underscore', 'backbone', 'leaflet', 'views/objects/note'], function(_, Backbone, L, NoteView) {
	'use strict';

	return NoteView.extend({
		hintText: function(params) {
			return 'Квест «' + params.data.caption + '»';
		},
		markerIcon: L.icon({
			iconUrl: '/img/objects/quest.svg',
			iconSize: [52, 52],
			iconAnchor: [12, 12],
			popupAnchor:  [17, 0]
		}),
		popupContent: function(data) {
			return _.template($('#quest-popup').html())(data);
		}
	});

});
