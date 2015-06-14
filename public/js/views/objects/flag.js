define(['underscore', 'backbone', 'leaflet'], function(_, Backbone, L) {
	'use strict';

	return Backbone.View.extend({
		initialize: function(params) {
			params.object.setIcon(this.markerIcon);
			this.params = params;
		},
		markerIcon: L.icon({
			iconUrl: '/i/objects/flag.svg',
			iconSize: [50, 60],
			iconAnchor: [15, 20]
		})
	});

});
