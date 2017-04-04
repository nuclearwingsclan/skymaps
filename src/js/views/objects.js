define(function(require) {
	'use strict';

	var Backbone = require('backbone');
	var L = require('leaflet');
	var _ = require('underscore');
	var HoleView = require('views/objects/hole');
	var WormholeView = require('views/objects/wormhole');
	var MapholeView = require('views/objects/maphole');
	var LocationholeView = require('views/objects/locationhole');
	var InstanceView = require('views/objects/instance');
	var BossView = require('views/objects/boss');
	var NoteView = require('views/objects/note');
	var QuestView = require('views/objects/quest');
	var FlagerView = require('views/objects/flager');
	var MasterView = require('views/objects/master');
	var FactoryView = require('views/objects/factory');
	var FishView = require('views/objects/fish');
	var TreeView = require('views/objects/tree');
	var NpcView = require('views/objects/npc');
	var BeaconView = require('views/objects/beacon');
	var FlagView = require('views/objects/flag');
	var BarrierView = require('views/objects/barrier');
	var StationView = require('views/objects/station');
	var CityView = require('views/objects/city');
	var InstancesView = require('views/objects/instances');

	return Backbone.View.extend({
		initialize: function(options) {
			var model = this.model;
			var objects = L.geoJson(options.objects, {
				onEachFeature: function(item, object) {
					var params = {
						appModel: options.appModel,
						container: options.container,
						data: item.properties,
						meta: options.meta,
						position: item.geometry.coordinates,
						object: object
					};

					switch (item.properties.type) {
						case 'hole': new HoleView(params); break;
						case 'wormhole': new WormholeView(params); break;
						case 'maphole': new MapholeView(params); break;
						case 'locationhole': new LocationholeView(params); break;
						case 'instance': new InstanceView(params); break;
						case 'boss': new BossView(params); break;
						case 'note': new NoteView(params); break;
						case 'quest': new QuestView(params); break;
						case 'flager': new FlagerView(params); break;
						case 'master': new MasterView(params); break;
						case 'factory': new FactoryView(params); break;
						case 'fish': new FishView(params); break;
						case 'tree': new TreeView(params); break;
						case 'npc': new NpcView(params); break;
						case 'beacon': new BeaconView(params); break;
						case 'flag': new FlagView(params); break;
						case 'barrier': new BarrierView(params); break;
						case 'station': new StationView(params); break;
						case 'city': new CityView(params); break;
						case 'instances': new InstancesView(params); break;
					}
				}
			}).addTo(options.container);

			this.options = options;
			this.objectsLayer = objects;
			this.listenTo(this.model, 'destroy', this.destroy);
		},
		destroy: function() {
			this.options.container.removeLayer(this.objectsLayer);
			this.remove();
		}
	});

});
