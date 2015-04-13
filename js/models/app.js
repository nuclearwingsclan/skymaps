define(['backbone'], function(Backbone) {
	'use strict';

	var AppModel = Backbone.Model.extend({
		initialize: function() {
			this.set('defaultCaption', $('title').html());
		},
		load: function(region, level) {
			this.set('location', {
				region: region,
				level: level
			});
		}
	});

	return AppModel;

});
