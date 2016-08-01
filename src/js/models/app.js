define(['backbone'], function(Backbone) {
	'use strict';

	var AppModel = Backbone.Model.extend({
		load: function(region, level, center) {
			this.set({
				location: {
					region: region,
					level: level
				},
				center: center
			});
		},
		center: function(center) {
			this.set('center', center);
		}
	});

	return new AppModel();

});
