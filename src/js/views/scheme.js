define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var L = require('leaflet');
	var _ = require('underscore');
	var locations = require('collections/locations');

	return Backbone.View.extend({
		initialize: function(options) {
			var _this = this;
			
			locations.loadData(this.model.get('region'))
				.done(function(data) {
					_this.regionData = data;
					_this.regionLayer = _this.build(data, _this.model);
					_this.setBounds();
					options.center();
				});

			this.listenTo(this.model, 'change:region', this.destroy);
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
				marker.setHint(level.caption);

				marker.on('click', function() {
					model.open(url);
				});

				marker.label.on('click', function() { marker.fire('click'); });
				marker.label.on('mouseover', function() { marker.fire('mouseover'); });
				marker.label.on('mouseout', function() { marker.fire('mouseout'); });

				locations.push(marker);
			}, this);

			_.each(data.streams, function(stream) {
				var start = this.calculateMarkerPosition(data.locations[stream[0]].position);
				var finish = this.calculateMarkerPosition(data.locations[stream[1]].position);
				start = [start[0] - 3, start[1] + 6];
				finish = [finish[0] - 3, finish[1] + 6];
				streams.push(L.polyline([start, finish], {
					color: 'orange',
					dashArray: '7',
					weight: 3
				}));
			}, this);

			var holesLayer = L.featureGroup(holes);
			var locationsLayer = L.featureGroup(locations);
			var streamsLayer = L.featureGroup(streams);

			return L.featureGroup([holesLayer, locationsLayer, streamsLayer]).addTo(this.options.navigator);
		},
		calculateMarkerPosition: function(position) {
			return [-position[1] * 20, position[0] * 20];
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
			bounds._northEast.lat += 70;
			bounds._northEast.lng += 80;
			bounds._southWest.lat -= 90;
			bounds._southWest.lng -= 80;

			this.options.navigator.setMaxBounds(bounds);
			this.options.navigator.setView([0, 0], 0);
		},
		getCenter: function() {
			var level = this.model.get('level');

			if (this.regionData && this.regionData.locations[level]) {
				var levelPosition = this.regionData.locations[level].position;
				var newNavigatorCenter = this.calculateMarkerPosition(levelPosition);
				return [newNavigatorCenter[0] - 1, newNavigatorCenter[1] + 1];
			} else {
				return [0, 0];
			}
		},
		destroy: function() {
			this.options.navigator.removeLayer(this.regionLayer);
			this.remove();
		}
	});

});
