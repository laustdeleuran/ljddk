module.exports = function(grunt) {
	'use strict';

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);
	
	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Config
	var config = {
		dev: 'app',
		host: 'localhost'
	};

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		config: config,
		modernizr: {
			dist: {
				// [REQUIRED] Path to the build you're using for development.
				devFile : 'src/components/modernizr/modernizr.js',

				// [REQUIRED] Path to save out the built file.
				'outputFile' : 'scripts/modernizr.min.js',

				// Based on default settings on http://modernizr.com/download/
				'extra' : {
					'shiv' : true,
					'printshiv' : false,
					'load' : true,
					'mq' : false,
					'cssclasses' : true
				},

				// Based on default settings on http://modernizr.com/download/
				'extensibility' : {
					'addtest' : false,
					'prefixed' : false,
					'teststyles' : false,
					'testprops' : false,
					'testallprops' : false,
					'hasevents' : false,
					'prefixes' : false,
					'domprefixes' : false
				},

				// By default, source is uglified before saving
				'uglify' : true,

				// Define any tests you want to implicitly include.
				'tests' : [],

				// By default, this task will crawl your project for references to Modernizr tests.
				// Set to false to disable.
				'parseFiles' : true,

				// When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
				// You can override this by defining a 'files' array below.
				'files' : {
					'src': [
						'src/scripts/{,*/}*.js',
						'src/styles/{,*/}*.css'
					]
				},
				'excludeFiles': [
					'scripts/*.js',
					'src/components/modernizr/modernizr.js'
				],

				// When parseFiles = true, matchCommunityTests = true will attempt to
				// match user-contributed tests.
				'matchCommunityTests' : false,

				// Have custom Modernizr tests? Add paths to their location here.
				'customTests' : []
			}
		},
		clean: {
			build: ['scripts', 'styles', '_layouts', '_posts', 'images']
		},
		requirejs: {
			compile: {
				options: {
					name: '../components/almond/almond',
					wrap: true,
					preserveLicenseComments: false,
					insertRequire: ['main'],
					baseUrl: 'src/scripts/',
					mainConfigFile: 'src/scripts/config.js',
					out: 'scripts/scripts.min.js'
				}
			}
		},
		compass: {
			options: {
				basePath: '',
				imagesDir: 'images',
				cssDir: 'src/styles',
				sassDir: 'src/styles',
				noLineComments: false,
				outputStyle: 'expanded',
				environment: 'development'
			},
			dev: {
			},
			build: {
				options: {
					cssDir: 'styles',
					noLineComments: true,
					outputStyle: 'compressed',
					environment: 'production'
				}
			}
		},
		copy: {
			html: {
				files: [{
					expand: true,
					cwd: '/',
					src: ['src/{,*/}*.html', 'src/{,*/}*.markdown', 'src/{,*/}*.md'],
					dest: '/',
					filter: 'isFile'
				}]
			}
		},
		imagemin: {
			dynamic: {
				expand: true, // Enable dynamic expansion
				cwd: 'src/images/', // Src matches are relative to this path
				src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
				dest: 'images/' // Destination path prefix
			}
		},
		replace: {
			compiled: {
				src: ['*.html', '*.markdown', '*.md', '_posts/*.md', '_posts/*.markdown', '_posts/*.html', '_layouts/*.html'],
				overwrite: true,
				replacements: [{
					from: '<script src="/src/components/modernizr/modernizr.js"></script>',
					to: '<script src="/build/modernizr.min.js"></script>'
				}, {
					from: '<script data-main="/src/scripts/config" src="/src/components/requirejs/require.js"></script>',
					to: ''
				}, {
					from: '<!-- <script src="scripts.min.js"></script> -->',
					to: '<script src="/scripts/scripts.min.js"></script>'
				}, {
					from: '<link rel="stylesheet" href="/src/styles/style.css" media="all" />',
					to: '<link rel="stylesheet" href="/styles/style.css" media="all" />'
				}, {
					from: '<link rel="stylesheet" href="/src/styles/print.css" media="print" />',
					to: '<link rel="stylesheet" href="/styles/print.css" media="all" />'
				}]
			}
		},
		watch: {
			sass: {
				files: ['src/styles/{,*/}{,*/}*.scss'],
				tasks: ['compass:dev']
			},
			content: {
				files: ['src/{,*/}*.html', 'src/{,*/}*.markdown', 'src/{,*/}*.md'],
				tasks: ['copy:html']
			},
		},
		bump: { // https://github.com/vojtajina/grunt-bump
			options: {
				pushTo: 'origin'
			}
		}
	});

	// Build for distribution to 3rd party vendor
	grunt.registerTask('build', [
		'clean:build',
		'requirejs',
		'modernizr',
		'compass:build',
		'copy:html',
		'imagemin',
		'replace:compiled'
	]);

	// Run simple server for development
	grunt.registerTask('develop', [
		'compass:dev',
		'compass:html',
		'watch'
	]);
};