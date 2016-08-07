define(['backbone'], function(Backbone) {
	'use strict';

	var MetaModel = Backbone.Model.extend({
		setMeta: function(meta) {
			this.set({
				caption: meta.caption,
				mapInfo: {
					author: meta.navigator,
					date: meta.date
				},
				drop: meta.drop
			});
		}
	});

	return new MetaModel();

});
