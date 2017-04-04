define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var _ = require('underscore');
	var $ = require('jquery');
	var SearchModel = require('models/search');
	var SearchView = require('views/controls/search');
	var FarmView = require('views/controls/farm');
	var LinkView = require('views/controls/link');
	var hintView = require('views/hint');

	var $container = $('#map > .controls');
	var $searchBtn = $('button.search', $container);
	var $farmBtn = $('button.farm', $container);
	var $editBtn = $('button.edit', $container);
	var $linkBtn = $('button.link', $container);

	var $navigatorBtn = $('.caption .controls button.navigator, button.open-navigator');
	var $navigatorOverlay = $('.navigator-overlay');

	return Backbone.View.extend({
		initialize: function(options) {
			this.appModel = options.app;
			this.metaModel = options.meta;

			$searchBtn.click(_.bind(this.openSearchDialog, this)).hint($searchBtn.data('title'));
			$farmBtn.click(_.bind(this.openFarmDialog, this)).hint($farmBtn.data('title'));
			$linkBtn.click(_.bind(this.openLinkDialog, this)).hint($linkBtn.data('title'));

			$navigatorBtn.click(_.bind(this.toggleNavigator, this));
			$navigatorOverlay.on('click mousedown touchdown', _.bind(this.closeNavigator, this));

			$editBtn.hint($editBtn.data('title'));
			this.listenTo(this.appModel, 'change:location', this.updateEditorLink);

			this.listenTo(this.appModel, 'change:location', this.turnControls);
		},

		turnControls: function() {
			var location = this.appModel.get('location');
			if (location.region == 'index') {
				$container.hide();
			} else {
				$container.show();
			}
		},

		openSearchDialog: function() {
			var searchModel = new SearchModel({
				app: this.appModel
			});
			var searchView = new SearchView({
				caption: $searchBtn.data('title'),
				model: searchModel
			});
		},

		openFarmDialog: function() {
			var farmView = new FarmView({
				caption: $farmBtn.data('title'),
				drop: this.metaModel.get('drop')
			});
		},

		openLinkDialog: function() {
			var linkView = new LinkView({
				caption: $linkBtn.data('title')
			});
		},

		toggleNavigator: function() {
			$('body').toggleClass('navigator');
		},

		closeNavigator: function() {
			$('body').removeClass('navigator');
		},

		updateEditorLink: function() {
			var location = this.appModel.get('location');
			$editBtn.attr('onclick', 'window.open("/editor/?map=' + location.region + '/' + location.level + '")');
		}	
	});

});
