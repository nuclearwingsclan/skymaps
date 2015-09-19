define(['underscore', 'backbone', 'leaflet', 'views/scheme'], function(_, Backbone, L, SchemeView) {
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

			var _this = this;
			$.ajax({
				dataType: 'json',
				url: '/data/regions.json',
				success: function(data) {
					_this.regions = data;
					_this.open();
					_this.listenTo(_this.model, 'change:region', _this.open);
					_this.listenTo(_this.model, 'change:level', _this.center);
				}
			});
		},
		check: function() {
			var region = this.model.get('region');
			if (region && this.regions[region]) {
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
		}
	});

});
