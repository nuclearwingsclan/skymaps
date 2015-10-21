define(['underscore', 'backbone', 'leaflet', 'views/objects/hole'], function(_, Backbone, L, HoleView) {
	'use strict';

	return HoleView.extend({
		hintText: function(params) {
			return (!/инстанс/i.test(params.data.caption) ? 'Инстанс ' : '') + '«' + params.data.caption + '»';
		},
		markerIcon: L.icon({
			iconUrl: '/img/objects/instance.svg',
			iconSize: [60, 60],
			iconAnchor: [19, 19],
			popupAnchor:  [17, 0]
		})
	});

});
