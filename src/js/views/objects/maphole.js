define(['underscore', 'backbone', 'leaflet', 'models/app', 'views/objects/wormhole'], function(_, Backbone, L, appModel, WormholeView) {
	'use strict';

	return WormholeView.extend({
		hintText: function(params) {
			return '«Червиный» вихрь в ' + params.data.caption;
		},
		onClick: function() {
			var data = this.params.data;
			appModel.load(data.region, data.map, data.goto);
			this.params.object.fire('mouseout');
		},
		onMouseOver: function() {
			var minimapUrl = '/maps/' + this.params.data.region + '/' + this.params.data.map + '/minimap.jpg',
				minimapScale = 8,
				minimapSize = [this.params.meta.size.height / minimapScale, this.params.meta.size.width / minimapScale],
				minimapPosition = [this.params.position[1] + minimapSize[1] - 30, this.params.position[0] - minimapSize[0] - 20],
				minimapBounds = [minimapPosition, [minimapPosition[0] - minimapSize[0], minimapPosition[1] + minimapSize[1]]],
				minimap = L.imageOverlay(minimapUrl, minimapBounds),
				arrow = L.polyline([
					new L.LatLng(this.params.position[1] - 17, this.params.position[0] + 17),
					new L.LatLng(minimapPosition[0] - (this.params.data.goto.y / minimapScale), minimapPosition[1] + (this.params.data.goto.x / minimapScale))
				], {
					color: 'white',
					noClip: true,
					opacity: 0.9,
					weight: 4
				});

			this.holeArrow = L.layerGroup([minimap, arrow])
				.addTo(this.params.container);
		}
	});

});
