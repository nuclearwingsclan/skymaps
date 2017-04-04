define(['backbone'], function(Backbone) {
	'use strict';

	return Backbone.Router.extend({
		initialize: function(options) {
			this.model = options.model;
			this.enableHistoryBtns();

			Backbone.history.start({ pushState: true, root: '/' });
			this.model.on('change:location', this.navigate, this);
		},
		routes: {
			'': 'index',
			':region/:map/': 'loadMap'
		},
		index: function() {
			this.loadMap('index', 'index');
		},
		loadMap: function(region, level) {
			this.model.load(region, level);
		},
		navigate: function() {
			var location = this.model.get('location');
			if (location.region != 'index') {
				Backbone.history.navigate(location.region + '/' + location.level + '/');
			} else {
				Backbone.history.navigate('/');
			}
		},
		enableHistoryBtns: function() {
			if (window.history) {
				$('#map .caption > button.prev').click(function() {
					window.history.back();
				});
				$('#map .caption > button.next').click(function() {
					window.history.forward();
				});
			} else {
				$('#map .caption').find('button.prev, button.next').hide();
			}
		}
	});

});
