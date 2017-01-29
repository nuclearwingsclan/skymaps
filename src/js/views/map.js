define(['underscore', 'backbone', 'leaflet', 'views/tiles', 'views/objects', 'views/meta', 'views/coordinates', 'models/meta'], function(_, Backbone, L, TilesView, ObjectsView, metaView, CoordinatesView, metaModel) {
	'use strict';

	return Backbone.View.extend({
		initialize: function(options) {
			this.container = options.container;
			this.location = options.location;
			this.listenTo(this.model, 'change:meta', this.configure);
			this.listenTo(this.model, 'change:objects', this.renderObjects);
		},
		configure: function() {
			var meta = this.meta = this.model.get('meta');
			this.createTilesLayer(meta);
			this.configureContainer(meta);
			metaModel.setMeta(meta, location);
			this.configureCoordinates(meta);
		},
		createTilesLayer: function(meta) {
			return new TilesView({
				container: this.container,
				location: this.location,
				model: this.model,
				meta: this.meta
			});
		},
		renderObjects: function() {
			var objects = this.model.get('objects');
			return new ObjectsView({
				container: this.container,
				meta: this.meta,
				model: this.model,
				objects: objects
			});
		},
		configureCoordinates: function(meta) {
			if (location.region != 'index') {
				var coordinatesView = new CoordinatesView({
					container: this.container,
					model: this.model,
					size: meta.size
				});
			}
		},
		configureContainer: function(meta) {
			this.container.setMaxBounds(meta.bounds);
			this.container.setView(meta.prjCenter, 0, { reset: true, animate: false });
		},
		destroy: function() {
			this.remove();
		}
	});

});
