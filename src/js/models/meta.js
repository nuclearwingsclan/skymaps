define(['backbone'], function(Backbone) {
	'use strict';

	return Backbone.Model.extend({
		setMeta: function(meta, location) {
			this.set({
				caption: meta.caption,
				mapInfo: {
					author: meta.navigator,
					date: meta.date
				},
				top: location.region == 'index',
				drop: meta.drop
			});
		}
	});

});
