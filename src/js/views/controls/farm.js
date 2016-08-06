define(['jquery', 'views/dialog'], function($, DialogView) {
	'use strict';

	return Backbone.View.extend({
		initialize: function(params) {
			this.buildDialog(params.caption);
		},
		dialogContent: function(data) {
			return _.template($('#farm-dialog').html())(data);
		},
		buildDialog: function(caption) {
			var dialog = new DialogView(),
				$body = $(this.dialogContent());

			dialog
				.setCaption(caption)
				.setContent($body)
				.open();
		}
	});

});
