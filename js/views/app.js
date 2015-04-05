define(['backbone', 'leaflet', 'views/map'], function(Backbone, L, MapView) {
	'use strict';

	var AppView = Backbone.View.extend({
		el: $('#map'),
		initialize: function() {
			this._createInstance();
			this.listenTo(this.model, 'change:location', this.load);
			this.listenTo(this.model, 'change:params', this._setParams);
		},
		_createInstance: function() {
			this._instance = new L.Map('map', {
				zoomControl: false,
				crs: L.CRS.Simple,
				attributionControl: false
			});
		},
		getInstance: function() {
			return this._instance;
		},
		load: function() {
			var mapView = new MapView({ model: this.model }),
				mapInstance = mapView.getInstance();
			mapInstance.addTo(this.getInstance());
		},
		_setParams: function() {
			var instance = this.getInstance(),
				params = this.model.get('params');
			instance.setMaxBounds(params.bounds);
			instance.setView(params.center, 3);
		}
	});

	return AppView;

});
