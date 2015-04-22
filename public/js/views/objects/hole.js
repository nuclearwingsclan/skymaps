define(['underscore', 'backbone', 'leaflet'], function(_, Backbone, L) {
	'use strict';

	return Backbone.View.extend({
		initialize: function(params) {
			params.object.setIcon(this.markerIcon);
			this.listenTo(params.object, 'click', this.onClick);

			if (typeof this.onMouseOver != 'undefined' && typeof this.onMouseOut != 'undefined') {
				this.listenTo(params.object, 'mouseover', this.onMouseOver);
				this.listenTo(params.object, 'mouseout', this.onMouseOut);
			}

			this.params = params;
		},
		markerIcon: L.icon({
			iconUrl: '/i/objects/hole.png',
			iconSize: [35, 35],
			iconAnchor: [0, 0]
		}),
		onClick: function() {
			var data = this.params.data;
			this.params.appModel.load(data.region, data.map, data.center);
		}
	});

});
