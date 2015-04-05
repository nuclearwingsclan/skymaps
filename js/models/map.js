define(['backbone'], function(Backbone) {
	'use strict';

	var MapModel = Backbone.Model.extend({
		load: function(region, map) {
			this.set('location', {
				region: region,
				map: map
			});
		}
	});

	return MapModel;

});
