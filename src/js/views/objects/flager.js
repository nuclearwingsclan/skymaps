define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var L = require('leaflet');
	var _ = require('underscore');
	var NoteView = require('views/objects/note');

	return NoteView.extend({
		hintText: 'Флягеры',

		markerIcon: L.icon({
			iconUrl: '/img/objects/flager.svg',
			iconSize: [70, 90],
			iconAnchor: [13, 21],
			popupAnchor:  [22, -11]
		}),

		popupContent: function(data) {
			return _.template($('#flager-popup').html())(data);
		}
	});

});
