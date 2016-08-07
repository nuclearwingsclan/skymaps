define(['underscore', 'backbone', 'leaflet', 'views/tiles', 'views/objects', 'views/meta', 'views/coordinates', 'models/meta'], function(_, Backbone, L, TilesView, ObjectsView, metaView, CoordinatesView, metaModel) {
	'use strict';

	return Backbone.View.extend({
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
							meta: data.meta,
							model: _this.model,
							objects: data.objects
						});
					metaModel.setMeta(data.meta);
					_this.configureContainer(params);

					var coordinatesView = new CoordinatesView({
						container: _this.container,
						model: _this.model,
						size: data.meta.size
					});
				}
			});
		},
		processMapParams: function(meta) {
			var width = meta.size.width,
				height = meta.size.height,
				center = this.model.get('center') || meta.center || { x: width / 2, y: height / 2 };

			return {
				bounds: L.latLngBounds([[-height, width], [0, 0]]),
				center: [ -center.y, center.x ]
			};
		},
		configureContainer: function(params) {
			var container = this.container;
			container.setMaxBounds(params.bounds);
			container.setView(params.center, 0, { reset: true, animate: false });

			// Weird stuff to avaid panning out of bounds
			var hardBoundsFunc = function() {
				container.panInsideBounds(params.bounds, { animate: false });
			};
			container.on('drag', hardBoundsFunc);
			this.listenTo(this.model, 'change:location', function() {
				container.off('drag', hardBoundsFunc);
			});
		},
		destroy: function() {
			this.remove();
		}
	});

});
