define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var L = require('leaflet');
	var _ = require('underscore');
	var StationView = require('views/objects/station');

	return StationView.extend({
		hintText: function(params) {
			return (!/город/i.test(params.data.caption) ? 'Город ' : '') + '«' + params.data.caption + '»';
		}
	});

});
