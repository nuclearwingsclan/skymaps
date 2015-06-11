define(['underscore', 'backbone', 'leaflet'], function(_, Backbone, L) {
	'use strict';

	return Backbone.View.extend({
		initialize: function(params) {
			params.object.setIcon(this.markerIcon);
			params.object.bindPopup(this.popupContent(params.data));
			this.listenTo(params.object, 'click', this.onClick);

			this.params = params;
		},
		markerIcon: L.icon({
			iconUrl: '/i/objects/note.svg',
			iconSize: [50, 50],
			iconAnchor: [0, 0],
			popupAnchor:  [17, 0]
		}),
		popupContent: function(data) {
			return _.template($('#note-popup').html())(data);
		},
		onClick: function() {
			this.params.object.openPopup();
		}
	});

});
