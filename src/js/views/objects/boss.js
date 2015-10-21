define(['underscore', 'backbone', 'leaflet', 'collections/bosses', 'leaflet.label', 'views/hint'], function(_, Backbone, L, bosses) {
	'use strict';

	return Backbone.View.extend({
		initialize: function(params) {
			params.object.setIcon(this.markerIcon);
			params.object.setHint('Босс класса «' + bosses.findWhere({'class': params.data.class}).get('caption') + '»');
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
			iconUrl: '/img/objects/boss.svg',
			iconSize: [27, 27],
			iconAnchor: [6, 6]
		})
	});

});
