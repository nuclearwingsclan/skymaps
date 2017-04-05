define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var _ = require('underscore');
	var $ = require('jquery');
	var SearchControlView = require('views/controls/search');
	var FarmControlView = require('views/controls/farm');
	var EditControlView = require('views/controls/edit');
	var LinkControlView = require('views/controls/link');
	var NavigatorControlsView = require('views/controls/navigator');

	return Backbone.View.extend({
		initialize: function(options) {
			var searchControlView = new SearchControlView({ app: options.app });
			var farmControlView = new FarmControlView({ app: options.app, meta: options.meta });
			var editControlView = new EditControlView({ app: options.app });
			var linkControlView = new LinkControlView({ app: options.app });
			var navigatorControlsView = new NavigatorControlsView();
		}	
	});

});
