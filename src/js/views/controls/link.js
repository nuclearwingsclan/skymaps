define(['jquery', 'clipboard', 'views/dialog'], function($, Clipboard, DialogView) {
	'use strict';

	return Backbone.View.extend({
		initialize: function(params) {
			var _this = this;

			$.post('/link/add.php', {
				link: window.location.href
			}, function(shortlink) {
				_this.buildDialog(params.caption, shortlink);
			});
		},

		dialogContent: function(data) {
			return _.template($('#link-dialog').html())(data);
		},

		buildDialog: function(caption, shortlink) {
			var dialog = new DialogView(),
				$body = $(this.dialogContent({ href: shortlink }));

			var $href = $body.find('.href');
			this.activateClipboard($href);

			dialog
				.setCaption(caption)
				.setContent($body)
				.open();
		},

		activateClipboard: function($href) {
			var clipboard = new Clipboard($href[0]);
			clipboard.on('success', function() {
				$href.addClass('used').text($href.data('copied'));
			});
		}
	});

});
