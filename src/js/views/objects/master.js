define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var L = require('leaflet');
	var _ = require('underscore');
	var NoteView = require('views/objects/note');

	return NoteView.extend({
		hintText: 'Мастерская',

		markerIcon: L.icon({
			iconUrl: '/img/objects/master.svg',
			iconSize: [68, 68],
			iconAnchor: [17, 21],
			popupAnchor:  [18, -16]
		}),

		popupContent: function(data) {
			return _.template($('#master-popup').html())(data);
		}
	});

});
