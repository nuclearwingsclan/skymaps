define(['jquery', 'clipboard', 'views/dialog'], function($, Clipboard, DialogView) {
	'use strict';

	return Backbone.View.extend({
		initialize: function(params) {
			var _this = this;

			$.post('/link/add.php', {
				link: window.location.href
			}, function(shortlink) {
				var dialog = new DialogView(),
					caption = _this.dialogCaption(),
					$body = $(_this.dialogContent({ href: shortlink }));

				var clipboard = new Clipboard('.shortlink .href');
				clipboard.on('success', function() {
					$('.shortlink .href').addClass('used').text($('.shortlink .href').data('copied'));
				});

				dialog
					.setCaption(caption)
					.setContent($body)
					.open();
			});
		},
		dialogCaption: function() {
			return _.template($('#link-dialog-caption').html())();
		},
		dialogContent: function(data) {
			return _.template($('#link-dialog').html())(data);
		}
	});

});
