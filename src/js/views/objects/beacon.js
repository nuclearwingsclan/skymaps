define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var L = require('leaflet');
	var _ = require('underscore');
	var NoteView = require('views/objects/note');

	return NoteView.extend({
		hintText: 'Пиратский маяк',
		markerIcon: L.icon({
			iconUrl: '/img/objects/beacon.svg',
			iconSize: [40, 40],
			iconAnchor: [7, 7],
			popupAnchor:  [18, -5]
		}),
		popupContent: function(data) {
			return _.template($('#beacon-popup').html())(data);
		}
	});

});
