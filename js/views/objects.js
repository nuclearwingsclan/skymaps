define([
	'underscore', 'backbone', 'leaflet',
	'views/objects/hole',
	'views/objects/boss',
	'views/objects/label',
	'views/objects/flag',
	'views/objects/station'
], function(_, Backbone, L, hole, boss, label, flag, station) {
	'use strict';

	var ObjectsView = Backbone.View.extend({
		initialize: function(options) {
			var model = this.model;
			var objects = L.geoJson(options.objects, {
				onEachFeature: function(item, object) {
					var params = {
						appModel: model,
						data: item.properties,
						position: item.geometry.coordinates,
						object: object
					};

					switch (item.properties.type) {
						case 'hole': new hole.HoleView(params); break;
						/*case 'wormhole': new hole.WormholeView(params); break;
						case 'maphole': new hole.MapholeView(params); break;
						case 'locationhole': new hole.LocationholeView(params); break;
						case 'instance': new hole.InstanceView(params); break;
						case 'boss': new boss.BossView(params); break;*/
						case 'label': new label.LabelView(params); break;
						case 'quest': new label.QuestView(params); break;
						case 'flager': new label.FlagerView(params); break;
						case 'master': new label.MasterView(params); break;
						case 'factory': new label.FactoryView(params); break;
						case 'fish': new label.FishView(params); break;
						case 'npc': new label.NpcView(params); break;
						/*case 'flag': new flag.FlagView(params); break;
						case 'barrier': new flag.BarrierView(params); break;
						case 'beacon': new flag.BeaconView(params); break;
						case 'stream': new flag.StreamView(params); break;
						case 'station': new station.StationView(params); break;
						case 'city': new station.CityView(params); break;
						case 'instances': new station.InstancesView(params); break;*/
					}
				}
			}).addTo(options.container);

			this.options = options;
			this.objectsLayer = objects;
			this.listenTo(this.model, 'change:location', this.destroy);
		},
		destroy: function() {
			this.options.container.removeLayer(this.objectsLayer);
			this.remove();
		}
	});

	return ObjectsView;

});
