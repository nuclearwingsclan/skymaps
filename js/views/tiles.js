define(['underscore', 'backbone', 'leaflet'], function(_, Backbone, L) {
	'use strict';

	var TilesView = Backbone.View.extend({
		initialize: function(options) {
			var tiles = L.tileLayer('/maps/' + options.location.region + '/' + options.location.level + '/tiles/{z}-{x}-{y}.png', {
				bounds: options.params.bounds,
				maxZoom: 0,
				minZoom: 0,
				continuousWorld: true,
				zoomReverse: true
			}).addTo(options.container);

			this.options = options;
			this.tilesLayer = tiles;
			this.listenTo(this.model, 'change:location', this.destroy);
		},
		destroy: function() {
			this.options.container.removeLayer(this.tilesLayer);
			this.remove();
		}
	});

	return TilesView;

});
