define(['underscore', 'backbone', 'leaflet'], function(_, Backbone, L) {
	'use strict';

	return Backbone.View.extend({
		el: $('#navigator'),
		initialize: function(options) {
			this.mapNavigator = new L.Map('navigator', {
				attributionControl: false,
				crs: L.CRS.Simple,
				zoomControl: false,
				center: [0, 0],
				maxZoom: 0,
				minZoom: 0,
				zoom: 0
			});

			var _this = this;
			$.ajax({
				dataType: 'json',
				url: '/data/regions.json',
				success: function(data) {
					_this.regions = data;
					_this.check();
					_this.listenTo(_this.model, 'change:location', _this.check);
				}
			});
		},
		check: function() {
			var location = this.model.get('location');
			if (location && location.region && this.regions[location.region]) {
				if (this.navigatorRegion != location.region) {
					this.open(location);
				} else if (this.navigatorLevel != location.level) {
					this.center(location.level);
				}
				this.show();
			} else {
				this.hide();
			}
		},
		open: function(location) {
			var _this = this;
			$.ajax({
				dataType: 'json',
				url: '/data/locations/' + location.region + '.json',
				success: function(data) {
					_this.regionLayer = _this.build(data);
					_this.center(location.level);
				}
			});
			this.navigatorRegion = location.region;
		},
		center: function(level) {
			this.navigatorLevel = level;
			console.log('open level: ' + level);
		},
		show: function() {},
		hide: function() {},
		build: function(data) {
			var features = [];

			for (var hole in data.holes) {
				var points = data.holes[hole];
				var start = this.calculateMarkerPosition(data.locations[points[0]].position);
				var finish = this.calculateMarkerPosition(data.locations[points[1]].position);
				features.push(L.polyline([start, finish], {
					color: 'black',
					weight: 4
				}));
			}

			for (var level in data.locations) {
				var info = data.locations[level];
				features.push(this.makeNavigatorMarker(info.position, info.abbr));
			}

			return L.layerGroup(features).addTo(this.mapNavigator);
		},
		calculateMarkerPosition: function(position) {
			return [-position[1] * 18, position[0] * 16];
		},
		makeNavigatorMarker: function(position, caption) {
			var marker = L.marker(this.calculateMarkerPosition(position));
			marker.setIcon(this.markerIcon);
			marker.bindLabel(caption, {
				noHide: true,
				className: 'navigator-label',
				offset: [-13, -13]
			});
			return marker;
		},
		markerIcon: L.icon({
			iconUrl: '/i/spacer.svg',
			iconSize: [1, 1]
		})
	});

});
