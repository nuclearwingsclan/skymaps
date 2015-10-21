define(['backbone', 'leaflet', 'models/app', 'models/map', 'views/map', 'models/navigator', 'views/navigator'], function(Backbone, L, appModel, MapModel, MapView, NavigatorModel, NavigatorView) {
	'use strict';

	var AppView = Backbone.View.extend({
		el: $('#map'),
		initialize: function() {
			this.leafletMap = new L.Map('map', {
				attributionControl: false,
				crs: L.CRS.Simple,
				zoomControl: false
			});

			var navigatorModel = new NavigatorModel({ app: this.model });
			this.navigator = new NavigatorView({ model: navigatorModel });

			this.listenTo(this.model, 'change:location', this.open);
			this.listenTo(this.model, 'change:center', this.center);
		},
		open: function() {
			//var mapModel = new MapModel({ app: this.model });
			var mapView = new MapView({
				container: this.leafletMap,
				model: this.model//mapModel
			});
		},
		center: function() {
			var center = this.model.get('center');
			if (center) {
				this.leafletMap.setView([ -center.y, center.x ], 0);
			}
		}
	});

	return new AppView({ model: appModel });

});
