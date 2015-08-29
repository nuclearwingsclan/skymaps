define(['jquery'], function($) {
	'use strict';

	var $hint = $('#hint');
	var addHint = function(text, target) {
		if (!target) {
			target = this;
		}

		target.on('mouseover', function(e) {
			$hint.html(text).show();
			$(window).on('mousemove', hintOnMusemove);
		});

		target.on('mouseout click', function() {
			$hint.hide();
			$(window).off('mousemove', hintOnMusemove);
		});
	};
	var hintOnMusemove = function(e) {
		$hint.css({
			top: (e.originalEvent.clientY + 5) + 'px',
			left: (e.originalEvent.clientX + 7) + 'px'
		})
	};

	$.extend($.prototype, { hint: addHint });
	L.Marker.include({ setHint: addHint });

	return addHint;

});
