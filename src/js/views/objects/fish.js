define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var L = require('leaflet');
	var _ = require('underscore');
	var NoteView = require('views/objects/note');

	return NoteView.extend({
		hintText: 'Рыбное место',
		markerIcon: L.icon({
			iconUrl: '/img/objects/fish.svg',
			iconSize: [42, 42],
			iconAnchor: [6, 5],
			popupAnchor:  [16, -3]
		}),
		popupContent: function(data) {
			return _.template($('#fish-popup').html())(data);
		}
	});

});
