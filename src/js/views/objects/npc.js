define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var L = require('leaflet');
	var _ = require('underscore');
	var NoteView = require('views/objects/note');

	return NoteView.extend({
		hintText: function(params) {
			return params.data.caption;
		},

		markerIcon: L.icon({
			iconUrl: '/img/objects/npc.svg',
			iconSize: [52, 20],
			iconAnchor: [7, 20],
			popupAnchor:  [19, -19]
		}),

		popupContent: function(data) {
			return _.template($('#npc-popup').html())(data);
		}
	});

});
