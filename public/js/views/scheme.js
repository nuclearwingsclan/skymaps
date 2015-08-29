define(['underscore', 'backbone', 'leaflet'], function(_, Backbone, L) {
	'use strict';

	return Backbone.View.extend({
		initialize: function(options) {
			var location = this.model.get('location');
			var _this = this;
			$.ajax({
				dataType: 'json',
				url: '/data/locations/' + location.region + '.json',
				success: function(data) {
					_this.regionData = data;
					_this.regionLayer = _this.build(data);
					_this.setBounds();
					_this.center(location.level);
				}
			});

			this.options = options;
		},
		build: function(data) {
			var holes = [];
			var locations = [];
			var streams = [];

			for (var hole in data.holes) {
				var points = data.holes[hole];
				var start = this.calculateMarkerPosition(data.locations[points[0]].position);
				var finish = this.calculateMarkerPosition(data.locations[points[1]].position);
				holes.push(L.polyline([start, finish], {
					color: 'black',
					weight: 4
				}));
			}

			for (var level in data.locations) {
				var info = data.locations[level];
				locations.push(this.makeNavigatorMarker(info.position, info.abbr, info.features ? ' ' + info.features.join(' ') : ''));
			}

			for (var stream in data.streams) {
				var points = data.streams[stream];
				var start = this.calculateMarkerPosition(data.locations[points[0]].position);
				var finish = this.calculateMarkerPosition(data.locations[points[1]].position);
				start = [start[0] - 2, start[1] + 5];
				finish = [finish[0] - 2, finish[1] + 5];
				streams.push(L.polyline([start, finish], {
					color: 'orange',
					dashArray: '5',
					weight: 2
				}));
			}

			var holesLayer = L.featureGroup(holes);
			var locationsLayer = L.featureGroup(locations);
			var streamsLayer = L.featureGroup(streams);

			return L.layerGroup([holesLayer, locationsLayer, streamsLayer]).addTo(this.options.navigator);
		},
		calculateMarkerPosition: function(position) {
			return [-position[1] * 18, position[0] * 16];
		},
		makeNavigatorMarker: function(position, caption, featuresClass) {
			var marker = L.marker(this.calculateMarkerPosition(position));
			marker.setIcon(this.markerIcon);
			marker.bindLabel(caption, {
				noHide: true,
				className: 'navigator-label' + featuresClass,
				offset: [-13, -13]
			});
			return marker;
		},
		markerIcon: L.icon({
			iconUrl: '/i/spacer.svg',
			iconSize: [1, 1]
		}),
		setBounds: function(navigator, regionLayer) {
			var bounds = this.regionLayer.getLayers()[1].getBounds();

			// Padding
			bounds._northEast.lat += 40;
			bounds._northEast.lng += 80;
			bounds._southWest.lat -= 90;
			bounds._southWest.lng -= 80;

			this.options.navigator.setMaxBounds(bounds);
			this.options.navigator.setView([0, 0], 0);
		},
		center: function(level) {
			var levelPosition = this.regionData.locations[level].position;
			var newNavigatorCenter = this.calculateMarkerPosition(levelPosition);
			this.options.navigator.panTo(newNavigatorCenter);
			this.options.navigator.panInsideBounds(this.options.navigator.getBounds());
		}
	});

});
