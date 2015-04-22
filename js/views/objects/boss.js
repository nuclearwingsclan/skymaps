define(['underscore', 'backbone', 'leaflet', 'leaflet.label'], function(_, Backbone, L) {
	'use strict';

	var BossView = Backbone.View.extend({
		initialize: function(params) {
			params.object.setIcon(this.markerIcon);
			params.object.bindLabel(params.data.caption, { noHide: true });

			this.params = params;
		},
		markerIcon: L.icon({
			iconUrl: '/i/objects/boss.png',
			iconSize: [13, 15],
			iconAnchor: [0, 0]
		})
	});

	return {
		BossView: BossView
	};

});
