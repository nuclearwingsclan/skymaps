define(['underscore', 'backbone', 'leaflet', 'views/objects/note'], function(_, Backbone, L, NoteView) {
	'use strict';

	return NoteView.extend({
		hintText: function(params) {
			return (!/завод/i.test(params.data.caption) ? 'Завод ' : '') + '«' + params.data.caption + '»';
		},
		markerIcon: L.icon({
			iconUrl: '/img/objects/factory.svg',
			iconSize: [58, 58],
			iconAnchor: [11, 11],
			popupAnchor:  [19, -4]
		}),
		popupContent: function(data) {
			return _.template($('#factory-popup').html())(data);
		}
	});

});
