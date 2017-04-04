define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var L = require('leaflet');
	var _ = require('underscore');
	var DialogView = require('views/dialog');
	var locations = require('collections/locations');

	return Backbone.View.extend({
		initialize: function(params) {
			params.object.setIcon(this.markerIcon(params.data.size));
			params.object.setHint(typeof this.hintText == 'function' ? this.hintText(params) : this.hintText);
			this.listenTo(params.object, 'click', this.onClick);

			this.params = params;
		},

		hintText: function(params) {
			return (!/платформа/i.test(params.data.caption) ? 'Платформа ' : '') + '«' + params.data.caption + '»';
		},

		markerIcon: function(size) {
			return L.icon({
				iconUrl: '/img/objects/station.svg',
				iconSize: [size, size]
			});
		},

		dialogContent: function(data) {
			return _.template($('#station-dialog').html())(data);
		},

		onClick: function() {
			var dialog = new DialogView(this.params.data.caption, $body),
				$body = $(this.dialogContent(this.params.data)),
				appModel = this.params.appModel;

			if (typeof(this.params.data.list) !== 'undefined') {
				var $list = $body.find('.streams-list');

				_.each(this.params.data.list, function(item) {
					$('<li>')
						.html(item.caption)
						.addClass('icon ' + item.type)
						.click(function() {
							appModel.load(item.region, item.map, { x: item.x, y: item.y });
							dialog.close();
						})
						.hint(locations.findWhere({url: item.map}).get('caption'))
						.appendTo($list);
				});
			}

			dialog
				.setCaption(this.params.data.caption)
				.setContent($body)
				.open();
		}
	});

});
