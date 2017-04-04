define(['underscore', 'backbone', 'leaflet'], function(_, Backbone, L) {
	'use strict';

	return Backbone.View.extend({
		initialize: function(options) {
			var tiles = L.tileLayer('/maps/' + options.location.region + '/' + options.location.level + '/tiles/{x}-{y}.png', {
				bounds: options.meta.bounds,
				maxZoom: 0,
				minZoom: 0,
				continuousWorld: true,
				zoomReverse: true
			}).addTo(options.container);

			this.options = options;
			this.tilesLayer = tiles;
			this.listenTo(this.model, 'destroy', this.destroy);
		},

		destroy: function() {
			this.options.container.removeLayer(this.tilesLayer);
			this.remove();
		}
	});

});
