define(['underscore', 'backbone', 'leaflet', 'views/objects/hole'], function(_, Backbone, L, HoleView) {
	'use strict';

	return HoleView.extend({
		hintText: 'Червиный вихрь на эту же карту',
		onClick: function() {
			this.params.appModel.center(this.params.data.goto);
		},
		onMouseOver: function() {
			this.holeArrow = L.polyline([
					new L.LatLng(this.params.position[1] - 17, this.params.position[0] + 17),
					new L.LatLng(-this.params.data.goto.y, this.params.data.goto.x)
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
