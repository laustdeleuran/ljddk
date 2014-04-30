module.exports = function(grunt) {
	'use strict';

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);
	
	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Config
	var config = {
		dev: '_src',
		host: 'localhost',
		port: 1337
	};

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		config: config,
		modernizr: {
			dist: {
				// [REQUIRED] Path to the build you're using for development.
				devFile : '<%=config.dev%>/components/modernizr/modernizr.js',

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
						'<%=config.dev%>/scripts/{,*/}*.js',
						'<%=config.dev%>/styles/{,*/}*.css'
					]
				},
				'excludeFiles': [
					'scripts/*.js',
					'<%=config.dev%>/components/modernizr/modernizr.js'
				],

				// When parseFiles = true, matchCommunityTests = true will attempt to
				// match user-contributed tests.
				'matchCommunityTests' : false,

				// Have custom Modernizr tests? Add paths to their location here.
				'customTests' : []
			}
		},
		clean: {
			build: ['scripts', 'styles', '_layouts', '_posts', 'images', '_site', '*.html', '*.ico', '*.yml']
		},
		requirejs: {
			compile: {
				options: {
					name: '../components/almond/almond',
					wrap: true,
					findNestedDependencies: true,
					preserveLicenseComments: false,
					insertRequire: ['main'],
					baseUrl: '<%=config.dev%>/scripts/',
					mainConfigFile: '<%=config.dev%>/scripts/config.js',
					out: 'scripts/scripts.min.js',
					optimize: 'uglify'
				}
			}
		},
		compass: {
			options: {
				basePath: '',
				imagesDir: 'images',
				cssDir: '<%=config.dev%>/styles',
				sassDir: '<%=config.dev%>/styles',
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
			dist: {
				files: [{
					expand: true,
					cwd: '<%=config.dev%>/',
					src: ['{,*/}*.html', '{,*/}*.markdown', '{,*/}*.md', '*.ico', '*.yml'],
					dest: '',
					filter: 'isFile'
				}]
			}
		},
		imagemin: {
			dynamic: {
				expand: true, // Enable dynamic expansion
				cwd: '<%=config.dev%>/images/', // Src matches are relative to this path
				src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
				dest: 'images/' // Destination path prefix
			}
		},
		replace: {
			compiled: {
				src: ['*.html', '*.markdown', '*.md', '_posts/*.md', '_posts/*.markdown', '_posts/*.html', '_layouts/*.html'],
				overwrite: true,
				replacements: [{
					from: '<script src="/components/modernizr/modernizr.js"></script>',
					to: '<script src="/scripts/modernizr.min.js?version=<%=pkg.version%>"></script>'
				}, {
					from: '<script data-main="/scripts/config" src="/components/requirejs/require.js"></script>',
					to: ''
				}, {
					from: '<!-- <script src="scripts.min.js"></script> -->',
					to: '<script src="/scripts/scripts.min.js?version=<%=pkg.version%>"></script>'
				}, {
					from: '%APPVERSION%',
					to: '<%=pkg.version%>'
				}]
			}
		},
		watch: {
			sass: {
				files: ['<%=config.dev%>/styles/{,*/}{,*/}*.scss'],
				tasks: ['compass:dev', 'jekyll:dev']
			},
			content: {
				files: ['<%=config.dev%>/*.html', '<%=config.dev%>/{,*/}*.markdown', '<%=config.dev%>/{,*/}*.md'],
				tasks: ['jekyll:dev']
			}
		},
		bump: { // https://github.com/vojtajina/grunt-bump
			options: {
				pushTo: 'origin',
				updateConfigs: [ 'pkg' ],
				commitFiles: ['-a']
			}
		},
		jekyll: {
			options: {
				serve: false,
				watch: false,
				exclude: [ '<%=config.dev%>' ]
			},
			build: {
				options: {
					host: config.host,
					port: config.port,
					serve: true
				}
			},
			watch: {
				options: {
					host: config.host,
					port: config.port,
					src: '<%=config.dev%>',
					serve: true,
					watch: true
				}
			},
			dev: {
				options: {
					serve: false,
					watch: false,
					src: '<%=config.dev%>',
				}
			}
		},
		connect: {
			dev: {
				options: {
					hostname: config.host,
					port: config.port,
					base: '_site',
					keepalive: true,
					livereload: true
				}
			}
		},
		open: {
			dev: {
				path: 'http://<%=config.host%>:<%=config.port%>/',
				app: 'Google Chrome'
			}
		},
		parallel: {
			dev: {
				options: {
					grunt: true,
					stream: true
				},
				tasks: ['connect:dev', 'watch', 'open:dev']
			},
			build: {
				options: {
					grunt: true,
					stream: true
				},
				tasks: ['jekyll:build', 'open']
			}
		}
	});

	// Build for distribution to 3rd party vendor
	grunt.registerTask('build', [
		'clean:build',
		'requirejs',
		'modernizr',
		'compass:build',
		'copy:dist',
		'imagemin',
		'replace:compiled'
	]);

	// Use Jekyll server to test build results
	grunt.registerTask('build-serve', [
		'build',
		'parallel:build'
	]);

	// Run simple server for development
	grunt.registerTask('develop', [
		'compass:dev',
		'jekyll:dev',
		'parallel:dev'
	]);

	// Bump version number, rebuild, tag and commit
	grunt.registerTask('build-bump', [
		'bump-only',
		'build',
		'bump-commit'
	]);
	grunt.registerTask('build-bump-minor', [
		'bump-only:minor',
		'build',
		'bump-commit'
	]);
	grunt.registerTask('build-bump-major', [
		'bump-only:major',
		'build',
		'bump-commit'
	]);
};