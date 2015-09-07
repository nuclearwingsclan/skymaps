define(['underscore', 'backbone', 'leaflet', 'views/tiles', 'views/objects'], function(_, Backbone, L, TilesView, ObjectsView) {
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
					_this.configureContainer(params);
					_this.setMeta(data.meta);
					
				}
			});
		},
		setMeta: function(meta) {
			this.setCaption(meta.caption);
			this.setMapInfo({ author: meta.navigator, date: meta.date });
		},
		setCaption: function(caption) {
			$('#map .caption').text(caption);
			$('title').html(caption + ' — ' + this.model.get('defaultCaption'));
		},
		setMapInfo: function(data) {
			var content = _.template($('#map-meta').html())(data);
			$('#map .meta').html(content);
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
