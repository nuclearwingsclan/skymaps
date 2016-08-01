define(['underscore', 'jquery'], function(_, $) {
	'use strict';

	var $title = $('title');
	var $caption = $('#map .caption > label');
	var $meta = $('#map .meta');
	var siteTitle = $title.html();

	return {
		setMeta: function(meta) {
			this.setCaption(meta.caption);
			this.setMapInfo({
				author: meta.navigator,
				date: meta.date
			});
		},

		setCaption: function(caption) {
			$caption.text(caption);
			$title.html(caption + ' — ' + siteTitle);
		},

		setMapInfo: function(data) {
			var content = _.template($('#map-meta').html())(data);
			$meta.html(content);
		}
	};

});
