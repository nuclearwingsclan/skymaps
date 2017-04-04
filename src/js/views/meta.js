define(['underscore', 'jquery'], function(_, $) {
	'use strict';

	var $title = $('title');
	var $caption = $('#map .caption > label');
	var $meta = $('#map .meta');
	var siteTitle = $title.html();

	return Backbone.View.extend({
		initialize: function() {
			this.listenTo(this.model, 'change:caption', this.setCaption);
			this.listenTo(this.model, 'change:mapInfo', this.setMapInfo);
		},

		setCaption: function() {
			var caption = this.model.get('caption');
			$caption.text(caption);
			$title.html((!this.model.get('top') ? caption + ' — ' : '') + siteTitle);
		},

		setMapInfo: function() {
			var data = this.model.get('mapInfo');
			var content = _.template($('#map-meta').html())(data);
			$meta.html(content);
		}
	});

});
