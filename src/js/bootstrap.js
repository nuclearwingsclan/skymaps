require(['models/app', 'views/app', 'router'], function(AppModel, AppView, Router) {
	'use strict';

	var appModel = new AppModel();
	var appView = new AppView({ model: appModel });
	var router = new Router({ model: appModel });

});
