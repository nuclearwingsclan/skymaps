define(['backbone'], function(Backbone) {
	'use strict';

	var AppModel = Backbone.Model.extend({
		load: function(region, level) {
			this.set('location', {
				region: region,
				level: level
			});
		}
	});

	return AppModel;

});
