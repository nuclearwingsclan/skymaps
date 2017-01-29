require.config({
	paths: {
		'backbone': '../assets/backbone',
		'jquery': '../assets/jquery.min',
		'jquery-ui': '../assets/jquery-ui.min',
		'leaflet': '../assets/leaflet',
		'leaflet.hardbounds': '../assets/leaflet.hardbounds',
		'leaflet.label': '../assets/leaflet.label',
		'underscore': '../assets/underscore-min',
		'tinyscrollbar': '../assets/jquery.tinyscrollbar.min',
		'rrose': '../assets/rrose-src',
		'clipboard': '../assets/clipboard.min'
	},
	shim: {
		'jquery': {
			exports: '$'
		},
		'jquery-ui': {
			deps: ['jquery']
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		},
		'leaflet': {
			exports: 'L'
		},
		'leaflet.hardbounds': {
			deps: ['leaflet']
		},
		'leaflet.label': {
			deps: ['leaflet']
		},
		'rrose': {
			deps: ['leaflet']
		},
		'tinyscrollbar': {
			deps: ['jquery']
		},
		'clipboard': {
			exports: 'Clipboard'
		}
	}
});