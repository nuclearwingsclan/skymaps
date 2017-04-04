define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var L = require('leaflet');
	var _ = require('underscore');
	var TilesView = require('views/tiles');
	var ObjectsView = require('views/objects');

	return Backbone.View.extend({
		initialize: function(options) {
			this.appModel = options.app;
			this.container = options.container;
			this.coordinates = options.coordinates;
			this.location = options.location;
			this.listenTo(this.model, 'change:meta', this.configure);
			this.listenTo(this.model, 'change:objects', this.renderObjects);
		},

		configure: function() {
			var meta = this.meta = this.model.get('meta');
			this.createTilesLayer(meta);
			this.configureContainer(meta);
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
				appModel: this.appModel,
				model: this.model,
				objects: objects
			});
		},

		configureCoordinates: function(meta) {
			if (this.location.region != 'index') {
				this.coordinates.connect({
					size: meta.size,
					model: this.model
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
