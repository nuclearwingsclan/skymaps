define(['underscore', 'backbone', 'leaflet', 'views/tiles', 'views/objects'], function(_, Backbone, L, TilesView, ObjectsView) {
	'use strict';

	var MapView = Backbone.View.extend({
		initialize: function(options) {
			this.container = options.container;
			this.load(this.model.get('location'));
			this.listenTo(this.model, 'change:location', this.destroy);
		},
		load: function(location) {
			var _this = this;
			$.ajax({
				dataType: 'json',
				url: '/maps/' + location.region + '/' + location.level + '/mapdata.json',
				success: function(data) {
					var params = _this.processMapParams(data.meta),
						tiles = new TilesView({
							container: _this.container,
							location: location,
							model: _this.model,
							params: params
						}),
						objects = new ObjectsView({
							container: _this.container,
							model: _this.model,
							objects: data.objects
						});
					_this.configureContainer(params);
				}
			});
		},
		processMapParams: function(meta) {
			var zoom = meta.zoom || 3,
				zoomScale = Math.pow(2, zoom),
				width = meta.size.width,
				height = meta.size.height,
				center = meta.center ? [ meta.center.y, meta.center.x ] : [ height / 2, width / 2 ];

			return {
				bounds: L.latLngBounds([[-(height / zoomScale), width / zoomScale], [0, 0]]),
				center: [ -(center[0] / zoomScale), center[1] / zoomScale ],
				zoom: zoom
			};
		},
		configureContainer: function(params) {
			this.container.setMaxBounds(params.bounds);
			this.container.setView(params.center, params.zoom);
		},
		destroy: function() {
			this.remove();
		}
	});

	return MapView;

});
