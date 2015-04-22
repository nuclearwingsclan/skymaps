define(['underscore', 'backbone', 'leaflet', 'views/objects/label'], function(_, Backbone, L, LabelView) {
	'use strict';

	return LabelView.extend({
		/*markerIcon: L.icon({
			opacity: 1,
			iconSize: [30, 30]
		}),*/
		popupContent: function(data) {
			return _.template($('#fish-popup').html())(data);
		}
	});

});
