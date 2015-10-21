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
			this.addHomeButton();

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
					navigator: this.navigator,
					model: this.model
				});
			}
		},
		center: function() {
			if (this.scheme) {
				this.scheme.center();
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
		},
		addHomeButton: function() {
			var model = this.model;
			this.$el.find('button.home').click(function() {
				model.home();
			});
		}
	});

});
