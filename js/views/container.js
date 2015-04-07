define(['backbone', 'leaflet', 'views/map'], function(Backbone, L, MapView) {
	'use strict';

	var ContainerView = Backbone.View.extend({
		el: $('#map'),
		initialize: function() {
			this.leafletMap = new L.Map('map', {
				zoomControl: false,
				crs: L.CRS.Simple,
				attributionControl: false
			});
			this.listenTo(this.model, 'change:location', this.open);
		},
		open: function() {
			var mapView = new MapView({
				container: this.leafletMap,
				model: this.model
			});
		}
	});

	return ContainerView;

});
