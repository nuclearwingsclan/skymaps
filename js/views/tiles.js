define(['underscore', 'backbone', 'leaflet'], function(_, Backbone, L) {
	'use strict';

	var TilesView = Backbone.View.extend({
		initialize: function() {
			var location = this.model.get('location');
			var tiles = L.tileLayer('maps/' + location.region + '/' + location.map + '/tiles/{z}-{x}-{y}.png', {
				maxZoom: 3,
				minZoom: 0,
				continuousWorld: true,
				zoomReverse: true
			});
			return tiles;
		}
	});

	return TilesView;

});
