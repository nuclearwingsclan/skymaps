define(['underscore', 'backbone', 'leaflet', 'models/app'], function(_, Backbone, L, appModel) {
	'use strict';

	return Backbone.View.extend({
		initialize: function(options) {
			this.container = options.container;
			this.size = options.size;

			options.container.on('mousemove', _.bind(this.update, this));
			options.container.on('mouseout mouseleave', _.bind(this.clear, this));

			this.listenTo(appModel, 'change:location', this.destroy);
		},
		update: function(event) {
			var pos = this.container.project(event.latlng);
			if (pos.x >= 0 && pos.x <= this.size.width && pos.y >= 0 && pos.y <= this.size.height) {
				$('#map .coordinates').html(Math.round(100 * pos.x / this.size.width) + ':' + Math.round(100 * pos.y / this.size.height));
			} else {
				this.clear();
			}
		},
		clear: function() {
			$('#map .coordinates').html('');
		},
		destroy: function() {
			this.clear();
			this.remove();
		}
	});

});
