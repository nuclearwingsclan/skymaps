define(['underscore', 'backbone', 'leaflet'], function(_, Backbone, L) {
	'use strict';

	var HoleView = Backbone.View.extend({
		initialize: function(params) {
			params.object.setIcon(this.markerIcon);
			this.listenTo(params.object, 'click', this.onClick);

			this.params = params;
		},
		markerIcon: L.icon({
			iconUrl: 'i/hole.png',
			iconRetinaUrl: 'i/hole-2x.png',
			iconSize: [35, 35],
			iconAnchor: [0, 0]
		}),
		onClick: function() {
			this.params.appModel.load(this.params.data.region, this.params.data.map);
		}
	});

	return {
		HoleView: HoleView
	};

});
