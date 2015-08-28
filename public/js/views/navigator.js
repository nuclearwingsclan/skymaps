define(['underscore', 'backbone'], function(_, Backbone) {
	'use strict';

	return Backbone.View.extend({
		el: $('#navigator'),
		initialize: function(options) {
			this.mapNavigator = new L.Map('navigator', {
				attributionControl: false,
				crs: L.CRS.Simple,
				zoomControl: false
			});
			this.listenTo(this.model, 'change:location', this.check);
		},
		check: function() {
			var location = this.model.get('location');
			if (location && location.region && this.navigatorRegion != location.region) {
				this.open(region);
			} else (location && location.level && this.navigatorLevel != location.level) {
				this.center(level);
			}
		},
		open: function(region) {
			this.navigatorRegion = region;
		},
		center: function(location) {

		}
	});

});
