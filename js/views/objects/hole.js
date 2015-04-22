define(['underscore', 'backbone', 'leaflet'], function(_, Backbone, L) {
	'use strict';

	var HoleView = Backbone.View.extend({
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

	var WormholeView = HoleView.extend({
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

	return {
		HoleView: HoleView,
		WormholeView: WormholeView
	};

});
