define(['underscore', 'backbone', 'leaflet', 'views/objects/station'], function(_, Backbone, L, StationView) {
	'use strict';

	return StationView.extend({
		initialize: function(params) {
			params.object.setIcon(this.markerIcon);
			this.listenTo(params.object, 'click', this.onClick);

			this.params = params;
		},
		markerIcon: L.icon({
			iconUrl: '/i/objects/instance.svg',
			iconSize: [60, 60],
			iconAnchor: [19, 19],
			popupAnchor:  [17, 0]
		}),
		dialogContent: function(data) {
			return _.template($('#instances-dialog').html())(data);
		}
	});

});
