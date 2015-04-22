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
			iconUrl: '/i/objects/label.png',
			iconSize: [35, 35],
			iconAnchor: [0, 0],
			popupAnchor:  [17, 0]
		}),
		popupContent: function(data) {
			return _.template($('#label-popup').html())(data);
		},
		onClick: function() {
			this.params.object.openPopup();
		}
	});

});
