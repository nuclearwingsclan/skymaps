define(['underscore', 'backbone', 'leaflet'], function(_, Backbone, L) {
	'use strict';

	return Backbone.View.extend({
		$el: $('#map .coordinates'),

		initialize: function(options) {
			this.container = options.container;
		},

		connect: function(options) {
			this.size = options.size;

			this.container.on('mousemove', _.bind(this.update, this));
			this.container.on('mouseout mouseleave', _.bind(this.clean, this));

			this.listenTo(options.model, 'destroy', this.disconnect);
		},

		disconnect: function() {
			this.container.off('mousemove mouseout mouseleave');
			this.clean();
		},

		update: function(event) {
			var pos = this.container.project(event.latlng);
			if (pos.x >= 0 && pos.x <= this.size.width && pos.y >= 0 && pos.y <= this.size.height) {
				this.$el.html(Math.round(100 * pos.x / this.size.width) + ':' + Math.round(100 * pos.y / this.size.height));
			} else {
				this.clean();
			}
		},

		clean: function() {
			this.$el.html('');
		}
	});

});
