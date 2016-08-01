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

			this.highlight = L.circleMarker([0, 0], { radius: 14, weight: 10 }).addTo(this.navigator);

			this.makeResizable();
			this.enableHomeButton();

			this.open();
			this.listenTo(this.model, 'change:region', this.open);
			this.listenTo(this.model, 'change:level', this.center);
		},
		check: function() {
			var region = this.model.get('region');
			if (region && regions.findWhere({ id: region })) {
				this.show();
				return true;
			} else {
				// There is no scheme for this region
				this.hide();
				return false;
			}
		},
		open: function() {
			if (this.check()) {
				this.scheme = new SchemeView({
					highlight: this.highlight,
					navigator: this.navigator,
					model: this.model
				});
			}
		},
		center: function() {
			var newNavigatorCenter = [0, 0];

			if (this.scheme) {
				newNavigatorCenter = this.scheme.getCenter();
			}

			this.highlight.setLatLng(newNavigatorCenter);
			this.navigator.panTo(newNavigatorCenter);
			this.navigator.panInsideBounds(this.navigator.getBounds());
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
		},
		enableHomeButton: function() {
			var model = this.model;
			this.$el.find('button.home').click(function() {
				model.home();
			});
		}
	});

});
