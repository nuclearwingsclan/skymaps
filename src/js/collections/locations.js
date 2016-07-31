define(['backbone'], function(Backbone) {
	'use strict';

	var locations = new Backbone.Collection();
	locations.url = '/data/locations';

	locations.loadData = function(region) {
		return $.ajax({
			dataType: 'json',
			url: '/data/locations/' + region + '.json',
			success: function(data) {
				var items = [];
				for (var location in data.locations) {
					data.locations[location].url = location;
					items.push(data.locations[location]);
				}
				locations.set(items);
			}
		});
	};

	return locations;

});
