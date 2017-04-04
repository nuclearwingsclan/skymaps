define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var L = require('leaflet');
	var _ = require('underscore');
	var NoteView = require('views/objects/note');

	return NoteView.extend({
		hintText: function(params) {
			return 'Квест «' + params.data.caption + '»';
		},
		markerIcon: L.icon({
			iconUrl: '/img/objects/quest.svg',
			iconSize: [52, 52],
			iconAnchor: [12, 12],
			popupAnchor:  [17, 0]
		}),
		popupContent: function(data) {
			return _.template($('#quest-popup').html())(data);
		}
	});

});
