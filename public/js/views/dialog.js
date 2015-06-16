define(['jquery', 'underscore', 'backbone', 'leaflet', 'tinyscrollbar'], function($, _, Backbone, L, tinyscrollbar) {
	'use strict';

	return function(options) {
		var $dialog = $('<div class="dialog">'),
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

		this.open = function() {
			$dialog.appendTo('body');
			console.log($body.outerHeight());
			$body.tinyscrollbar();
			return this;
		};

		this.close = function() {
			$dialog.remove();
		};

		$closeButton.click(function() {
			$dialog.remove();
		});
	};

});
