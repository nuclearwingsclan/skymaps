define(['jquery'], function($) {
	'use strict';

	var $hint = $('#hint');
	var offset = [5, 7];

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

		return this;
	};

	var hintOnMusemove = function(e) {
		var top = e.originalEvent.clientY;
		var left = e.originalEvent.clientX;
		var width = $hint.outerWidth();
		var height = $hint.outerHeight();

		top += (top + height + offset[0]) < $(window).height() ? offset[0] : -height;
		left += (left + width + offset[1]) < $(window).width() ? offset[1] : -width;

		$hint.css({
			top: top + 'px',
			left: left + 'px'
		});
	};

	$.extend($.prototype, { hint: addHint });
	L.Marker.include({ setHint: addHint });

	return addHint;

});
