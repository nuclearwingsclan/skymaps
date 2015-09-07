require(['backbone', 'models/app', 'views/app', 'router'], function(Backbone, AppModel, AppView, Router) {
	'use strict';

	var appModel = new AppModel(),
		appView = new AppView({ model: appModel }),
		router = new Router(appModel);

	Backbone.history.start({ pushState: true, root: '/' });
});
