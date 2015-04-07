define(['underscore', 'backbone', 'leaflet'], function(_, Backbone, L) {
	'use strict';

	var ObjectsView = Backbone.View.extend({
		initialize: function(options) {
			var objects = L.geoJson(options.objects).addTo(options.container);

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
