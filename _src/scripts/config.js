'use strict';
requirejs.config({
	baseUrl: '/scripts/',
	paths: {
		'main': 'main',
		// Framework
		'core': 'framework/core',
		// Libs
		'jquery': '../components/jquery/jquery',
		'imagesloaded': '../components/imagesloaded/imagesloaded',
		'eventEmitter/EventEmitter': '../components/eventEmitter/EventEmitter',
		'clndr': 'plugins/clndr',
		'moment': '../components/moment/moment',
		'underscore': '../components/underscore/underscore',
		'eventie/eventie': '../components/eventie/eventie',
		// Plugins
		'waypoints': 'plugins/jquery-waypoints-2.0.3-dev'
	},
	shim: {
		waypoints: ['jquery']
	},
	config: {
		moment: {
			noGlobal: false
		}
	},
	deps: ['main']
});