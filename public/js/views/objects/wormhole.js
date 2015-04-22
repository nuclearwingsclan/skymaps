define(['underscore', 'backbone', 'leaflet', 'views/objects/hole'], function(_, Backbone, L, HoleView) {
	'use strict';

	return HoleView.extend({
		onClick: function() {
			this.params.appModel.center(this.params.data.goto);
		},
		onMouseOver: function() {
			this.holeArrow = L.polyline([
					new L.LatLng(this.params.position[1] - 17, this.params.position[0] + 17),
					new L.LatLng(-this.params.data.goto.y - 17, this.params.data.goto.x + 17)
				], {
					color: 'white',
					noClip: true,
					opacity: 0.9,
					weight: 4
				})
				.addTo(this.params.container);
		},
		onMouseOut: function(params) {
			if (typeof this.holeArrow != 'undefined') {
				this.params.container.removeLayer(this.holeArrow);
			}
		}
	});

});
