define(function(require) {
	'use strict';

	var $ = require('jquery');
	var DialogView = require('views/dialog');
	var metaModel = require('models/meta');
	var resourcesCollection = require('collections/resources');

	return Backbone.View.extend({
		initialize: function(params) {
			var drop = this.processDropList(metaModel.get('drop'));
			this.buildDialog(params.caption, drop);
		},
		dialogContent: function(data) {
			return _.template($('#farm-dialog').html())(data);
		},
		buildDialog: function(caption, drop) {
			var dialog = new DialogView(),
				$body = $(this.dialogContent({ drop: drop }));

			$body.find('img').each(function() {
				$(this).hint($(this).data('caption'));
			});

			dialog
				.setCaption(caption)
				.setContent($body)
				.open();
		},
		processDropList: function(drop) {
			if (typeof drop == 'undefined' || !drop.length) {
				return [];
			}

			return drop.map(function(item) {
				var id = item.split('_');
				var resource = {
					type: id[0],
					subtype: id[1]
				};
				resource.caption = resourcesCollection.findWhere(resource).get('caption');
				return resource;
			});
		}
	});

});
