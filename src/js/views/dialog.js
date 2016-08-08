define(['jquery', 'tinyscrollbar'], function($, tinyscrollbar) {
	'use strict';

	return function(options) {
		var $dialog = $('<div class="dialog">'),
			$overlay = $('<div class="dialog-overlay">').appendTo($dialog),
			$container = $('<div class="dialog-container">').appendTo($dialog),
			$caption = $('<div class="dialog-caption">').appendTo($container),
			$body = $('<div class="dialog-body">').appendTo($container),
			$closeButton = $('<button class="dialog-close-button">').html('&times;').appendTo($container);

		this.setCaption = function(newValue) {
			$caption.text(newValue);
			return this;
		};

		this.setContent = function(body) {
			if (typeof body == 'object' && body instanceof $) {
				$body.append(body);
			} else {
				$body.html(body);
			}
			return this;
		};

		this.setSize = function(width, height) {
			$dialog.css({
				width: width + 'px',
				height: height + 'px',
				marginLeft: -(width / 2) + 'px',
				marginTop: -(height / 2) + 'px'
			});
			$body.css({
				height: (height - 70) + 'px'
			});
		};

		this.open = function() {
			$dialog.add($overlay).appendTo('body');
			$dialog.draggable({ cancel: '.dialog-body, .dialog-close-button' });
			$body.tinyscrollbar();
			return this;
		};

		this.update = function() {
			$body.data('plugin_tinyscrollbar').update();
		};

		var closeDialog = this.close = function() {
			$dialog.add($overlay).remove();
		};

		$overlay.add($closeButton).click(function() {
			closeDialog();
		});
	};

});
