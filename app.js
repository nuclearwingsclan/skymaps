var mapParams = processParams({
	width: 1184,
	height: 873
});

var MapsRouter = Backbone.Router.extend({
	routes: {
		'': 'index',
		'!/': 'index',
		'!/:region/:map/': 'loadMap'
	},
	index: function() {
		this.loadMap('index', 'index');
	},
	loadMap: function(region, map) {
		$.ajax({
			dataType: 'json',
			url: '/maps/' + region + '/' + map + '/mapdata.json',
			success: function(data) {
				mapParams = processParams(data.map);
			}
		});
	}
});

var mapsRouter = new MapsRouter();
Backbone.history.start();

var map = new L.Map('map', {
	zoomControl: false,
	crs: L.CRS.Simple,
	maxBounds: mapParams.mapBounds,
	attributionControl: false
});

L.tileLayer('maps/index/index/z{z}/{x}x{y}.png', {
	maxZoom: 3,
	minZoom: 1.5, // Fit bounds
	continuousWorld: true,
	bounds: mapParams.tileBounds
}).addTo(map);

map.setView(mapParams.center, 3);

map.on('drag', function() {
	map.panInsideBounds(mapParams.mapBounds, { animate: false });
});

function processParams(params) {
	var zoom = Math.pow(2, params.zoom || 3);
	return {
		mapBounds: L.latLngBounds([[-(params.height / zoom), params.width / zoom], [0, 0]]),
		tileBounds: L.latLngBounds([[-((params.height - 1) / zoom), (params.width - 1) / zoom], [0, 0]]),
		center: [-((params.center ? params.center.y : params.height / 2) / zoom), (params.center ? params.center.x : params.width / 2) / zoom]
	};
}