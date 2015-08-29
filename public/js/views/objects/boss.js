define(['underscore', 'backbone', 'leaflet', 'leaflet.label'], function(_, Backbone, L) {
	'use strict';

	return Backbone.View.extend({
		initialize: function(params) {
			params.object.setIcon(this.markerIcon);
			params.object.bindLabel(params.data.caption, { noHide: true, className: 'boss-label' });

			this.params = params;
		},
		markerIcon: L.icon({
			iconUrl: '/i/objects/boss.svg',
			iconSize: [27, 27],
			iconAnchor: [6, 6]
		})
	});

});
