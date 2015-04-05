define(['backbone', 'leaflet', 'views/tiles'], function(Backbone, L, TilesView) {
	'use strict';

	var MapView = Backbone.View.extend({
		el: $('#map'),
		initialize: function() {
			this._createMap();
			this.listenTo(this.model, 'change:location', this.load);
		},
		_createMap: function() {
			this._map = new L.Map('map', {
				zoomControl: false,
				crs: L.CRS.Simple,
				attributionControl: false
			});
		},
		getMap: function() {
			return this._map;
		},
		load: function() {
			var location = this.model.get('location');
			//var tiles = new TilesView({ model: this.model });
			$.ajax({
				dataType: 'json',
				url: '/maps/' + location.region + '/' + location.map + '/mapdata.json',
				success: function(data) {
					console.log(data);
				}
			});
		}
	});

	return MapView;

});
