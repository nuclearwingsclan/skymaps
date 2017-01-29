define(['backbone'], function(Backbone) {
	'use strict';

	return Backbone.Model.extend({
		initialize: function(options) {
			var app = this.app = options.app;
			var location = this.location = options.location;
			this.load(location);

			this.listenTo(app, 'change:location', this.destroy);
		},
		load: function(location) {
			var _this = this;
			$.ajax({
				dataType: 'json',
				url: '/maps/' + location.region + '/' + location.level + '/mapdata.json',
				success: function(data) {
					_this.set('meta', _.extend(data.meta, _this.processMapMeta(data.meta)));
					_this.set('objects', data.objects);
				}
			});
		},
		processMapMeta: function(meta) {
			var width = meta.size.width,
				height = meta.size.height,
				center = this.app.get('center') || meta.center || { x: width / 2, y: height / 2 };

			return {
				bounds: L.latLngBounds([[-height, width], [0, 0]]),
				prjCenter: [ -center.y, center.x ]
			};
		}
	});

});
