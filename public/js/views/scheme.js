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
					_this.regionLayer = _this.build(data, _this.model);
					_this.setBounds();
					_this.center(location.level);
				}
			});

			this.options = options;
		},
		build: function(data, model) {
			var holes = [];
			var locations = [];
			var streams = [];

			_.each(data.holes, function(hole) {
				var start = this.calculateMarkerPosition(data.locations[hole[0]].position);
				var finish = this.calculateMarkerPosition(data.locations[hole[1]].position);
				holes.push(L.polyline([start, finish], {
					color: 'black',
					weight: 4
				}));
			}, this);

			_.each(data.locations, function(level, url) {
				var marker = this.makeNavigatorMarker(level.position, level.abbr, level.features ? ' ' + level.features.join(' ') : '');
				marker.label._onMouseClick = function() {
					model.set('location', {
						region: model.get('location').region,
						level: url
					});
				};
				locations.push(marker);
			}, this);

			_.each(data.streams, function(stream) {
				var start = this.calculateMarkerPosition(data.locations[stream[0]].position);
				var finish = this.calculateMarkerPosition(data.locations[stream[1]].position);
				start = [start[0] - 3, start[1] + 6];
				finish = [finish[0] - 3, finish[1] + 6];
				streams.push(L.polyline([start, finish], {
					color: 'orange',
					dashArray: '5',
					weight: 3
				}));
			}, this);

			var holesLayer = L.featureGroup(holes);
			var locationsLayer = L.featureGroup(locations);
			var streamsLayer = L.featureGroup(streams);

			return L.featureGroup([holesLayer, locationsLayer, streamsLayer]).addTo(this.options.navigator);
		},
		calculateMarkerPosition: function(position) {
			return [-position[1] * 18, position[0] * 16];
		},
		makeNavigatorMarker: function(position, caption, featuresClass) {
			var marker = L.marker(this.calculateMarkerPosition(position));
			marker.setIcon(this.markerIcon);
			marker.bindLabel(caption, {
				className: 'navigator-label' + featuresClass,
				clickable: true,
				noHide: true,
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
