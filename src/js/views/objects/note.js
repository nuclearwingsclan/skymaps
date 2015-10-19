define(['underscore', 'backbone', 'leaflet', 'rrose'], function(_, Backbone, L) {
	'use strict';

	return Backbone.View.extend({
		initialize: function(params) {
			params.object.setIcon(this.markerIcon);
			params.object.setHint(typeof this.hintText == 'function' ? this.hintText(params) : this.hintText);
			params.object.bindPopup(this.popup(params.data));
			this.listenTo(params.object, 'click', this.onClick);
			this.listenTo(params.container, 'drag', this.updatePopup);

			this.params = params;
		},
		hintText: 'Подсказка',
		markerIcon: L.icon({
			iconUrl: '/img/objects/note.svg',
			iconSize: [50, 50],
			iconAnchor: [5, 5],
			popupAnchor:  [17, 0]
		}),
		popup: function(data) {
			return new L.Rrose({
				autoPan: false,
				x_bound: 180,
				y_bound: 130,
				maxWidth: 250,
				minWidth: 130
			}).setContent(this.popupContent(data));
		},
		updatePopup: function() {
			var popup = this.params.object.getPopup();
			if (popup._isOpen) {
				popup.updateDirection();
			}
		},
		popupContent: function(data) {
			return _.template($('#note-popup').html())(data);
		},
		onClick: function() {
			this.params.object.openPopup();
		}
	});

});
