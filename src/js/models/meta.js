define(['backbone'], function(Backbone) {
	'use strict';

	var MetaModel = Backbone.Model.extend({
		setMeta: function(meta, top) {
			this.set({
				caption: meta.caption,
				mapInfo: {
					author: meta.navigator,
					date: meta.date
				},
				top: top,
				drop: meta.drop
			});
		}
	});

	return new MetaModel();

});
