define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var _ = require('underscore');
	var $ = require('jquery');
	var SearchModel = require('models/search');
	var SearchView = require('views/search');
	require('views/hint');

	return Backbone.View.extend({
		el: $('#map > .controls button.search'),

		initialize: function(options) {
			this.appModel = options.app;
			this.$el.on('click', _.bind(this.openDialog, this));
			this.$el.hint(this.$el.data('title'));
		},

		openDialog: function() {
			var searchModel = new SearchModel({
				app: this.appModel
			});
			var searchView = new SearchView({
				caption: this.$el.data('title'),
				model: searchModel
			});
		}	
	});

});
