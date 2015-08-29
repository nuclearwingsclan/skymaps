define(['underscore', 'backbone', 'leaflet', 'views/objects/station'], function(_, Backbone, L, StationView) {
	'use strict';

	return StationView.extend({
		hintText: function(params) {
			return (!/город/i.test(params.data.caption) ? 'Город ' : '') + '«' + params.data.caption + '»';
		}
	});

});
