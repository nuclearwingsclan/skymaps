define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var L = require('leaflet');
	var _ = require('underscore');
	var FlagView = require('views/objects/flag');

	return FlagView.extend({
		hintText: 'Дерево',
		markerIcon: L.icon({
			iconUrl: '/img/objects/tree.svg',
			iconSize: [46, 46],
			iconAnchor: [1, 0],
			popupAnchor:  [18, -5]
		})
	});

});
