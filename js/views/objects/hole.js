define(['underscore', 'backbone', 'leaflet'], function(_, Backbone, L) {
	'use strict';

	var HoleView = Backbone.View.extend({
		initialize: function(params) {
			params.object.setIcon(this.markerIcon);
			this.listenTo(params.object, 'click', this.onClick);

			this.params = params;
		},
		markerIcon: L.icon({
			iconUrl: '/i/objects/hole.png',
			iconRetinaUrl: '/i/objects/hole-2x.png',
			iconSize: [35, 35],
			iconAnchor: [0, 0]
		}),
		onClick: function() {
			this.params.appModel.load(this.params.data.region, this.params.data.map);
		}
	});

	var WormholeView = HoleView.extend({
		initialize: function(params) {
			this.__proto__.initialize(params);

			var holeArrow = this.holeArrow(params);
			this.listenTo(params.object, 'mouseover', function() {
				holeArrow.setStyle({ opacity: 0.9 });
			});
			this.listenTo(params.object, 'mouseout', function() {
				holeArrow.setStyle({ opacity: 0 });
			});
		},
		holeArrow: function(params) {
			var points = [
					new L.LatLng(params.position[1] - 17, params.position[0] + 17),
					new L.LatLng(params.data.goto.y - 17, params.data.goto.x + 17)
				],
				options = {
					color: 'white',
					noClip: true,
					opacity: 0,
					weight: 4
				};
			return L.polyline(points, options).addTo(params.container);
		}
	});

	return {
		HoleView: HoleView,
		WormholeView: WormholeView
	};

});
