define(['underscore', 'backbone', 'leaflet', 'views/objects/hole'], function(_, Backbone, L, HoleView) {
	'use strict';

	var ObjectsView = Backbone.View.extend({
		initialize: function(options) {
			var model = this.model;
			var objects = L.geoJson(options.objects, {
				onEachFeature: function(item, object) {
					var params = {
						appModel: model,
						data: item.properties,
						position: item.geometry.coordinates,
						object: object
					};

					switch (item.properties.type) {
						case 'hole': new HoleView(params); break;
					}
				}
			}).addTo(options.container);

			this.options = options;
			this.objectsLayer = objects;
			this.listenTo(this.model, 'change:location', this.destroy);
		},
		destroy: function() {
			this.options.container.removeLayer(this.objectsLayer);
			this.remove();
		}
	});

	return ObjectsView;

});
