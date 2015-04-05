define(['underscore', 'backbone', 'leaflet'], function(_, Backbone, L) {
	'use strict';

	var MapView = Backbone.View.extend({
		initialize: function() {
			var model = this.model,
				location = model.get('location'),
				tiles = this._createInstance(location);
			$.ajax({
				dataType: 'json',
				url: '/maps/' + location.region + '/' + location.level + '/mapdata.json',
				success: function(data) {
					var zoom = Math.pow(2, 3),
						params = {
							bounds: L.latLngBounds([[-(data.meta.size.height / zoom), data.meta.size.width / zoom], [0, 0]]),
							center: [-((data.meta.center ? data.meta.center.y : data.meta.size.height / 2) / zoom), (data.meta.center ? data.meta.center.x : data.meta.size.width / 2) / zoom]
						};
					tiles.bounds = params.bounds;
					model.set('params', params);
				}
			});
		},
		_createInstance: function(location) {
			var tiles = L.tileLayer('/maps/' + location.region + '/' + location.level + '/tiles/{z}-{x}-{y}.png', {
				maxZoom: 3,
				minZoom: 0,
				continuousWorld: true,
				zoomReverse: true
			});

			this._instance = tiles;
			return tiles;
		},
		getInstance: function() {
			return this._instance;
		}
	});

	return MapView;

});
