define([
	'underscore', 'backbone', 'leaflet',
	'views/objects/hole',
	'views/objects/wormhole',
	'views/objects/maphole',
	'views/objects/locationhole',
	'views/objects/instance',
	'views/objects/boss',
	'views/objects/note',
	'views/objects/quest',
	'views/objects/flager',
	'views/objects/master',
	'views/objects/factory',
	'views/objects/fish',
	'views/objects/tree',
	'views/objects/npc',
	'views/objects/beacon',
	'views/objects/flag',
	'views/objects/barrier',
	'views/objects/stream',
	'views/objects/station',
	'views/objects/city',
	'views/objects/instances',
	'views/objects/mobzone'
], function(
	_, Backbone, L,
	HoleView,
	WormholeView,
	MapholeView,
	LocationholeView,
	InstanceView,
	BossView,
	NoteView,
	QuestView,
	FlagerView,
	MasterView,
	FactoryView,
	FishView,
	TreeView,
	NpcView,
	BeaconView,
	FlagView,
	BarrierView,
	StreamView,
	StationView,
	CityView,
	InstancesView,
	MobzoneView
) {
	'use strict';

	return Backbone.View.extend({
		initialize: function(options) {
			var model = this.model;
			var objects = L.geoJson(options.objects, {
				onEachFeature: function(item, object) {
					var params = {
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
						//case 'stream': new StreamView(params); break;
						case 'station': new StationView(params); break;
						case 'city': new CityView(params); break;
						case 'instances': new InstancesView(params); break;
						//case 'mobzone': new MobzoneView(params); break;
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

});
