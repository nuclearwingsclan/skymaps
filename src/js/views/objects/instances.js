define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var L = require('leaflet');
	var _ = require('underscore');
	var StationView = require('views/objects/station');

	return StationView.extend({
		initialize: function(params) {
			params.object.setIcon(this.markerIcon);
			params.object.setHint(typeof this.hintText == 'function' ? this.hintText(params) : this.hintText);
			this.listenTo(params.object, 'click', this.onClick);

			this.params = params;
		},
		hintText: function(params) {
			return (!/инстанс/i.test(params.data.caption) ? 'Инстанс ' : '') + '«' + params.data.caption + '»';
		},
		markerIcon: L.icon({
			iconUrl: '/img/objects/instance.svg',
			iconSize: [60, 60],
			iconAnchor: [19, 19],
			popupAnchor:  [17, 0]
		}),
		dialogContent: function(data) {
			return _.template($('#instances-dialog').html())(data);
		}
	});

});
