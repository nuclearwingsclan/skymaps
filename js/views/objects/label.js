define(['underscore', 'backbone', 'leaflet'], function(_, Backbone, L) {
	'use strict';

	var LabelView = Backbone.View.extend({
		initialize: function(params) {
			params.object.setIcon(this.markerIcon);
			params.object.bindPopup(this.popupContent(params.data));
			this.listenTo(params.object, 'click', this.onClick);

			this.params = params;
		},
		markerIcon: L.icon({
			iconUrl: '/i/objects/label.png',
			iconSize: [35, 35],
			iconAnchor: [0, 0],
			popupAnchor:  [17, 0]
		}),
		popupContent: function(data) {
			return _.template($('#label-popup').html())(data);
		},
		onClick: function() {
			this.params.object.openPopup();
		}
	});

	var QuestView = LabelView.extend({
		markerIcon: L.icon({
			iconUrl: '/i/objects/quest.png',
			iconSize: [34, 30],
			iconAnchor: [0, 0],
			popupAnchor:  [17, 0]
		}),
		popupContent: function(data) {
			return _.template($('#quest-popup').html())(data);
		}
	});

	var FlagerView = LabelView.extend({
		markerIcon: L.icon({
			iconUrl: '/i/objects/flager.png',
			iconSize: [42, 62],
			iconAnchor: [0, 0],
			popupAnchor:  [21, 0]
		}),
		popupContent: function(data) {
			return _.template($('#flager-popup').html())(data);
		}
	});

	var MasterView = LabelView.extend({
		markerIcon: L.icon({
			iconUrl: '/i/objects/master.png',
			iconSize: [30, 30],
			iconAnchor: [0, 0],
			popupAnchor:  [15, 0]
		}),
		popupContent: function(data) {
			return _.template($('#master-popup').html())(data);
		}
	});

	var FactoryView = LabelView.extend({
		markerIcon: L.icon({
			iconUrl: '/i/objects/factory.png',
			iconSize: [35, 35],
			iconAnchor: [0, 0],
			popupAnchor:  [17, 0]
		}),
		popupContent: function(data) {
			return _.template($('#factory-popup').html())(data);
		}
	});

	var FishView = LabelView.extend({
		/*markerIcon: L.icon({
			opacity: 1,
			iconSize: [30, 30]
		}),*/
		popupContent: function(data) {
			return _.template($('#fish-popup').html())(data);
		}
	});

	var NpcView = LabelView.extend({
		/*markerIcon: L.icon({
			opacity: 1,
			iconSize: [40, 40]
		}),*/
		popupContent: function(data) {
			return _.template($('#npc-popup').html())(data);
		}
	});

	return {
		LabelView: LabelView,
		QuestView: QuestView,
		FlagerView: FlagerView,
		MasterView: MasterView,
		FactoryView: FactoryView,
		FishView: FishView,
		NpcView: NpcView
	};

});
