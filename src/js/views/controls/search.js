define(['jquery', 'views/dialog', 'collections/regions', 'collections/objects'], function($, DialogView, regionsCollection, objectsCollection) {
	'use strict';

	return Backbone.View.extend({
		initialize: function(params) {
			this.buildDialog(params.caption);
		},
		buildDialog: function(caption) {
			var _this = this;
			var dialog = new DialogView();
			var $body = this.$body = $('<div class="search">');
			var $form = this.buildForm();

			dialog
				.setCaption(caption)
				.setContent($body)
				.open();
		},
		buildForm: function() {
			var _this = this;
			var $form = $(_.template($('#search-dialog-form').html())({
				regions: regionsCollection.toJSON(),
				objects: objectsCollection.toJSON()
			}));

			$form.submit(function() {
				var request = {};
				$form.serializeArray().map(function(field) {
					if (field.value) {
						request[field.name] = field.value;
					}
				});
				_this.getResults(request);
				return false;
			});

			return $form.appendTo(this.$body);
		},
		getResults: function(request) {
			var _this = this;
			$.post('/search.php', request, function(data) {
				var $results = _this.buildResults(data);
				$results.appendTo(_this.$body);
			});
		},
		buildResults: function(data) {
			return _.template($('#search-dialog-results').html())(data);
		}
	});

});
