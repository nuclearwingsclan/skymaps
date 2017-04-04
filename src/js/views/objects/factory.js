define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var L = require('leaflet');
	var _ = require('underscore');
	var NoteView = require('views/objects/note');

	return NoteView.extend({
		hintText: function(params) {
			return (!/завод/i.test(params.data.caption) ? 'Завод ' : '') + '«' + params.data.caption + '»';
		},

		markerIcon: L.icon({
			iconUrl: '/img/objects/factory.svg',
			iconSize: [58, 58],
			iconAnchor: [11, 11],
			popupAnchor:  [19, -4]
		}),

		popupContent: function(data) {
			return _.template($('#factory-popup').html())(data);
		}
	});

});
