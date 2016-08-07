define(['underscore', 'jquery', 'models/meta'], function(_, $, metaModel) {
	'use strict';

	var $title = $('title');
	var $caption = $('#map .caption > label');
	var $meta = $('#map .meta');
	var siteTitle = $title.html();

	var MetaView = Backbone.View.extend({
		initialize: function() {
			this.listenTo(metaModel, 'change:caption', this.setCaption);
			this.listenTo(metaModel, 'change:mapInfo', this.setMapInfo);
		},

		setCaption: function() {
			var caption = metaModel.get('caption');
			$caption.text(caption);
			$title.html(caption + ' — ' + siteTitle);
		},

		setMapInfo: function() {
			var data = metaModel.get('mapInfo');
			var content = _.template($('#map-meta').html())(data);
			$meta.html(content);
		}
	});

	return new MetaView();

});
