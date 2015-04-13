define(['backbone', 'leaflet', 'views/map'], function(Backbone, L, MapView) {
	'use strict';

	var ContainerView = Backbone.View.extend({
		el: $('#map'),
		initialize: function() {
			this.leafletMap = new L.Map('map', {
				attributionControl: false,
				crs: L.CRS.Simple,
				zoomControl: false
			});
			this.listenTo(this.model, 'change:location', this.open);
			this.listenTo(this.model, 'change:center', this.center);
		},
		open: function() {
			var mapView = new MapView({
				container: this.leafletMap,
				model: this.model
			});
		},
		center: function() {
			var center = this.model.get('center');
			this.leafletMap.setView([ -center.y, center.x ], 0);
		}
	});

	return ContainerView;

});
