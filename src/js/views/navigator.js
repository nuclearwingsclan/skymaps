define(['underscore', 'backbone', 'leaflet', 'jquery-ui', 'views/scheme', 'collections/regions'], function(_, Backbone, L, jQueryUI, SchemeView, regions) {
	'use strict';

	return Backbone.View.extend({
		el: $('#navigator'),
		initialize: function(options) {
			this.navigator = new L.Map('navigator', {
				attributionControl: false,
				crs: L.CRS.Simple,
				zoomControl: false,
				maxZoom: 0,
				minZoom: 0
			});

			this.makeResizable();
			this.check();

			this.listenTo(this.model, 'change:location', this.check);
		},
		check: function() {
			var location = this.model.get('location');
			if (location && location.region && regions.findWhere({ id: location.region })) {
				if (this.navigatorRegion != location.region) {
					this.open(location);
				} else if (this.navigatorLevel != location.level) {
					this.center(location.level);
				}
				this.show();
			} else {
				// There is no scheme for this region
				this.hide();
			}
		},
		open: function(location) {
			var schemeView = this.scheme = new SchemeView({
				navigator: this.navigator,
				model: this.model
			});
			this.navigatorRegion = location.region;
		},
		center: function(level) {
			this.navigatorLevel = level;
			if (this.scheme) {
				this.scheme.center(level);
			}
		},
		show: function() {
			this.$el.show();
		},
		hide: function() {
			this.$el.hide();
		},
		makeResizable: function() {
			var _this = this;

			this.$el.resizable({
				handles: 'n, w, nw',
				minWidth: 160,
				minHeight: 200,
				resize: function() {
					_this.navigator.invalidateSize();
				}
			});

			// Prevent also dragging instead of only resizing
			$('#navigator .ui-resizable-handle').mouseover(function() {
				_this.navigator.dragging.disable();
			});
			$('#navigator .ui-resizable-handle').mouseout(function() {
				_this.navigator.dragging.enable();
			});
		}
	});

});
