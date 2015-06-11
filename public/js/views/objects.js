define([
	'underscore', 'backbone', 'leaflet',
	'views/objects/hole',
	'views/objects/wormhole',
	'views/objects/maphole',
	'views/objects/locationhole',
	'views/objects/instance',
	'views/objects/boss',
	'views/objects/label',
	'views/objects/quest',
	'views/objects/flager',
	'views/objects/master',
	'views/objects/factory',
	'views/objects/fish',
	'views/objects/npc',
	'views/objects/flag',
	'views/objects/barrier',
	'views/objects/beacon',
	'views/objects/stream',
	'views/objects/station',
	'views/objects/city',
	'views/objects/instances'
], function(
	_, Backbone, L,
	HoleView,
	WormholeView,
	MapholeView,
	LocationholeView,
	InstanceView,
	BossView,
	LabelView,
	QuestView,
	FlagerView,
	MasterView,
	FactoryView,
	FishView,
	NpcView,
	FlagView,
	BarrierView,
	BeaconView,
	StreamView,
	StationView,
	CityView,
	InstancesView
) {
	'use strict';

	return Backbone.View.extend({
		initialize: function(options) {
			var model = this.model;
			var objects = L.geoJson(options.objects, {
				onEachFeature: function(item, object) {
					var params = {
						appModel: model,
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
						/*case 'locationhole': new LocationholeView(params); break;*/
						case 'instance': new InstanceView(params); break;
						case 'boss': new BossView(params); break;
						case 'label': new LabelView(params); break;
						case 'quest': new QuestView(params); break;
						case 'flager': new FlagerView(params); break;
						case 'master': new MasterView(params); break;
						case 'factory': new FactoryView(params); break;
						case 'fish': new FishView(params); break;
						case 'npc': new NpcView(params); break;
						/*case 'flag': new FlagView(params); break;
						case 'barrier': new BarrierView(params); break;
						case 'beacon': new BeaconView(params); break;
						case 'stream': new StreamView(params); break;*/
						case 'station': new StationView(params); break;
						/*case 'city': new CityView(params); break;
						case 'instances': new InstancesView(params); break;*/
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
