define(['underscore', 'backbone', 'leaflet', 'leaflet.label', 'views/hint'], function(_, Backbone, L) {
	'use strict';

	return Backbone.View.extend({
		initialize: function(params) {
			params.object.setIcon(this.markerIcon);
			params.object.setHint('Босс класса «' + params.data.class + '»');
			params.object.bindLabel(params.data.caption, {
				className: 'boss-label',
				clickable: true,
				noHide: true
			});
			
			params.object.label.on('click', function() { params.object.fire('click'); });
			params.object.label.on('mouseover', function() { params.object.fire('mouseover'); });
			params.object.label.on('mouseout', function() { params.object.fire('mouseout'); });

			this.params = params;
		},
		markerIcon: L.icon({
			iconUrl: '/i/objects/boss.svg',
			iconSize: [27, 27],
			iconAnchor: [6, 6]
		})
	});

});
