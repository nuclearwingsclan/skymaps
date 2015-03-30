var zoom = 3,
	tileSize = 256,
	bounds = L.latLngBounds([[-120, 100], [0, 0]]);

var map = new L.Map('map', {
	zoomControl: false,
	crs: L.CRS.Simple,
	maxBounds: bounds,
	attributionControl: false
});

L.tileLayer('maps/index/index/z{z}/{x}x{y}.jpg', {
	maxZoom: zoom,
	minZoom: 1.5, // Fit bounds
	continuousWorld: true,
	bounds: bounds
}).addTo(map);

map.setView([-1, 1], 3);

map.on('drag', function() {
	map.panInsideBounds(bounds, { animate: false });
});

