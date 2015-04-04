(function() {

	var map = {
		init: function() {
			var map = new L.Map('map', {
				zoomControl: false,
				crs: L.CRS.Simple,
				attributionControl: false
			});

			this.instance = map;
		},
		getInstance: function() {
			if (typeof this.instance == 'undefined') {
				this.init();
			}
			return this.instance;
		},
		hardBounds: function(bounds) {
			var instance = this.getInstance();
			instance.on('drag', function() {
				instance.panInsideBounds(bounds, {
					animate: false
				});
			});
		},
		load: function(region, map) {
			var _this = this,
				instance, tiles;

			instance = this.getInstance();
			tiles = L.tileLayer('maps/' + region + '/' + map + '/tiles/{z}-{x}-{y}.png', {
				maxZoom: 3,
				minZoom: 0,
				continuousWorld: true,
				zoomReverse: true
			});

			$.ajax({
				dataType: 'json',
				url: '/maps/' + region + '/' + map + '/mapdata.json',
				success: function(data) {
					var mapParams = processParams(data.meta);
					tiles.bounds = mapParams.tileBounds;
					tiles.addTo(instance);
					instance.setMaxBounds(mapParams.mapBounds);
					instance.setView(mapParams.center, 3);
					_this.hardBounds(mapParams.mapBounds);
				}
			});
		}
	};

	var MapsRouter = Backbone.Router.extend({
		routes: {
			'': 'index',
			'!/': 'index',
			'!/:region/:map/': 'loadMap'
		},
		index: function() {
			this.loadMap('pf', 'index');
		},
		loadMap: function(region, location) {
			map.load(region, location);
		}
	});

	var mapsRouter = new MapsRouter();
	Backbone.history.start();

})();

function processParams(params) {
	var zoom = Math.pow(2, params.zoom || 3);
	return {
		mapBounds: L.latLngBounds([[-(params.size.height / zoom), params.size.width / zoom], [0, 0]]),
		tileBounds: L.latLngBounds([[-((params.size.height - 1) / zoom), (params.size.width - 1) / zoom], [0, 0]]),
		center: [-((params.center ? params.center.y : params.size.height / 2) / zoom), (params.center ? params.center.x : params.size.width / 2) / zoom]
	};
}