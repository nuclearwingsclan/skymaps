define(function(require) {
	'use strict';

	var $ = require('jquery');
	var DialogView = require('views/dialog');
	var regionsCollection = require('collections/regions');
	var objectsCollection = require('collections/objects');

	return Backbone.View.extend({
		initialize: function(params) {
			this.buildDialog(params.caption);
			this.model = params.model;
		},

		buildDialog: function(caption) {
			var _this = this;
			var dialog = this.dialog = new DialogView();
			var $body = this.$body = $('<div class="search">');
			var $form = this.buildForm();

			dialog
				.setCaption(caption)
				.setContent($body)
				.open();
		},

		buildForm: function() {
			var _this = this;
			var $form = this.$form = $(_.template($('#search-dialog-form').html())({
				regions: regionsCollection.toJSON(),
				objects: objectsCollection.toJSON()
			}));

			$form.find('select.region').val(this.model.getRegion());
			$form.find('input.query, select.class').on('change input', _.bind(this.validateForm, this)).trigger('change');

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

		validateForm: function() {
			var query = this.$form.find('input.query').val();
			var type = this.$form.find('select.class').val();
			this.$form.find('button.submit').prop('disabled', !(query || type));
		},

		getResults: function(request) {
			var _this = this;
			this.$form.find('button.submit').prop('disabled', true);
			$.post('/search.php', request, function(data) {
				_this.$form.find('button.submit').prop('disabled', false);
				var $results = _this.$results = $(_this.buildResults(JSON.parse(data)));
				$results.appendTo(_this.$body.addClass('list'));

				$results.accordion({
					activate: _this.dialog.update,
					active: false,
					animate: 200,
					collapsible: true,
					header: 'label',
					heightStyle: 'content'
				});
				_this.dialog.setSize(350, 400);
				_this.dialog.update();

				$results.find('.item').click(function() {
					var region = $(this).data('region');
					var level = $(this).data('level');
					var center = { x: $(this).data('x'), y: $(this).data('y') };
					_this.model.open(region, level, center);
				});
				$results.find('button.back').click(_.bind(_this.closeResults, _this));
			});
		},

		buildResults: function(data) {
			return _.template($('#search-dialog-results').html())(data);
		},

		closeResults: function() {
			this.$body.removeClass('list');
			this.$results.remove();
			this.dialog.setSize(300, 220);
			this.dialog.update();
		}
	});

});
