define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var L = require('leaflet');
	var _ = require('underscore');
	var HoleView = require('views/objects/hole');

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
