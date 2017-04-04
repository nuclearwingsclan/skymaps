define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var L = require('leaflet');
	var _ = require('underscore');
	var HoleView = require('views/objects/hole');

	return HoleView.extend({
		hintText: function(params) {
			return 'Регион «' + params.data.caption + '»';
		},

		markerIcon: L.icon({
			iconUrl: '/img/objects/locationhole.svg',
			iconSize: [100, 100],
			iconAnchor: [14, 14]
		})
	});

});
