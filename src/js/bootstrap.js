require(['backbone', 'models/app', 'views/app', 'router'], function(Backbone, appModel, appView, router) {
	'use strict';

	Backbone.history.start({ pushState: true, root: '/' });

});
