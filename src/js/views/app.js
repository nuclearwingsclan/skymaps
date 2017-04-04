define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var L = require('leaflet');
	var MapModel = require('models/map');
	var MapView = require('views/map');
	var NavigatorModel = require('models/navigator');
	var NavigatorView = require('views/navigator');
	var ControlsView = require('views/controls');
	var MetaModel = require('models/meta');
	var MetaView = require('views/meta');
	require('leaflet.hardbounds');

	return Backbone.View.extend({
		el: $('#map'),
		initialize: function() {
			this.leafletMap = new L.Map('map', {
				attributionControl: false,
				crs: L.CRS.Simple,
				zoomControl: false
			});
			this.leafletMap.addHardBounds();

			var navigatorModel = new NavigatorModel({ app: this.model });
			var nagivatorView = new NavigatorView({ model: navigatorModel });
			var controlsView = new ControlsView({ app: this.model });
			var metaModel = this.metaModel = new MetaModel();
			var metaView = new MetaView({ model: metaModel });

			this.listenTo(this.model, 'change:location', this.open);
			this.listenTo(this.model, 'change:center', this.center);
		},
		open: function() {
			var location = this.model.get('location');
			var mapModel = new MapModel({
				app: this.model,
				metaModel: this.metaModel,
				location: location
			});
			var mapView = new MapView({
				container: this.leafletMap,
				app: this.model,
				model: mapModel,
				location: location
			});
		},
		center: function() {
			var center = this.model.get('center');
			if (center) {
				this.leafletMap.setView([ -center.y, center.x ], 0);
			}
		}
	});

});
