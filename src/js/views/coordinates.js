define(['underscore', 'backbone', 'leaflet'], function(_, Backbone, L) {
	'use strict';

	var $coordinates = $('#map .coordinates').hide();

	return Backbone.View.extend({
		initialize: function(options) {
			$coordinates.show();
			this.clean();

			this.container = options.container;
			this.size = options.size;

			options.container.on('mousemove', _.bind(this.update, this));
			options.container.on('mouseout mouseleave', _.bind(this.clean, this));

			this.listenTo(this.model, 'destroy', this.destroy);
		},

		update: function(event) {
			var pos = this.container.project(event.latlng);
			if (pos.x >= 0 && pos.x <= this.size.width && pos.y >= 0 && pos.y <= this.size.height) {
				$coordinates.html(Math.round(100 * pos.x / this.size.width) + ':' + Math.round(100 * pos.y / this.size.height));
			} else {
				this.clean();
			}
		},

		clean: function() {
			$coordinates.html('');
		},

		destroy: function() {
			$coordinates.hide();

			this.container.off('mousemove mouseout mouseleave');
			this.remove();
		}
	});

});
