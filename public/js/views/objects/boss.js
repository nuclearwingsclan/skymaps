define(['underscore', 'backbone', 'leaflet', 'leaflet.label', 'views/hint'], function(_, Backbone, L, LeafletLabel, hint) {
	'use strict';

	return Backbone.View.extend({
		initialize: function(params) {
			params.object.setIcon(this.markerIcon);
			params.object.bindLabel(params.data.caption, {
				className: 'boss-label',
				clickable: true,
				noHide: true
			});

			this.params = params;
		},
		markerIcon: L.icon({
			iconUrl: '/i/objects/boss.svg',
			iconSize: [27, 27],
			iconAnchor: [6, 6]
		})
	});

});
