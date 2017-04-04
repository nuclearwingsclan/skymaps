define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var L = require('leaflet');
	var _ = require('underscore');
	var FlagView = require('views/objects/flag');

	return FlagView.extend({
		hintText: 'Барьер (вешает сеть в корму)',

		markerIcon: L.icon({
			iconUrl: '/img/objects/barrier.svg',
			iconSize: [20, 20],
			iconAnchor: [4, 4]
		})
	});

});
