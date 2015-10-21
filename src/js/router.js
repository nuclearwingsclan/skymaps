define(['backbone'], function(Backbone) {
	'use strict';

	return Backbone.Router.extend({
		initialize: function(appModel) {
			this.appModel = appModel;
			this.enableHistory();
			appModel.on('change:location', this.navigate, this);
		},
		routes: {
			'': 'index',
			':region/:map/': 'loadMap'
		},
		index: function() {
			this.loadMap('index', 'index');
		},
		loadMap: function(region, level) {
			this.appModel.load(region, level);
		},
		navigate: function() {
			var location = this.appModel.get('location');
			if (location.region != 'index') {
				Backbone.history.navigate(location.region + '/' + location.level + '/');
			} else {
				Backbone.history.navigate('/');
			}
		},
		enableHistory: function() {
			$('#map .caption > button.prev').click(function() {
				window.history.back();
			});
			$('#map .caption > button.next').click(function() {
				window.history.forward();
			});
		}
	});

});
