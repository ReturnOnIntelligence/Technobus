
/*
* Project Gruntfile
*/

module.exports = function(grunt) {
	'use strict';

	var ftpLocalSep = '/';

	if (process.platform === "win32") {
		ftpLocalSep = '\\';
	}

	// Project configuration
	grunt.initConfig({
		// Metadata
		pkg : grunt.file.readJSON('package.json'),

		// Config
		config : {

			// Source's paths
			source : {
				path  : 'source',
				css   : {
					path   : '<%= config.source.path %>/assets/css/',
					vendor : '<%= config.source.path %>/assets/css/vendor/'
				},
				js    : '<%= config.source.path %>/assets/js/',
				img   : '<%= config.source.path %>/assets/images/',
				fonts : '<%= config.source.path %>/assets/fonts/',
				svg   : '<%= config.source.path %>/assets/svg/',
			},

			// Dist's paths
			dist : {
				path  : 'prototype-html',
				css   : {
					path   : '<%= config.dist.path %>/assets/css/',
					vendor : '<%= config.dist.path %>/assets/css/vendor/'
				},
				js    : '<%= config.dist.path %>/assets/js/',
				img   : '<%= config.dist.path %>/assets/images/',
				fonts : '<%= config.dist.path %>/assets/fonts/',
				svg   : '<%= config.dist.path %>/assets/svg/'
			},

			// Deploy Settings
			deploy : {
				host : 'uxddmz01.internal.corp',
				port : 22,
				dest : '/var/www/html/technobus/'
			}
		},

		// Task configuration : Development
		clean : {
			all : ['<%= config.dist.path %>']
		},

		"merge-json": {
			"dev": {
				src: ["<%= config.source.path %>/assets/jsons/**/*.json"],
				dest: "content.json"
			}
		},

		bake : {
			dev : {
				options : { content : 'content.json' },

				files : [{
					expand : true,
					cwd    : '<%= config.source.path %>/',
					src    : ['*.html'],
					dest   : '<%= config.dist.path %>/',
					ext    : '.html'
				}]
			}
		},

		sass     : {
			options : {
				sourceMap   : true,
				outputStyle : 'compressed'
			},
			dev     : {
				files : [{
					expand : true,
					cwd    : '<%= config.source.css.path %>',
					src    : ['*.scss'],
					dest   : '<%= config.dist.css.path %>',
					ext    : '.min.css'
				}]
			}
		},

		copy : {
			dev : {
				files : [{
					expand : true,
					cwd    : '<%= config.source.css.vendor %>',
					src    : ['**/**'],
					dest   : '<%= config.dist.css.vendor %>',
					filter : 'isFile'
				},
				{
					expand : true,
					cwd    : '<%= config.source.js %>',
					src    : '**/*.js',
					dest   : '<%= config.dist.js %>',
					filter : 'isFile'
				},
				{
					expand : true,
					cwd    : '<%= config.source.img %>',
					src    : '**/**',
					dest   : '<%= config.dist.img %>',
					filter : 'isFile'
				},
				{
					expand : true,
					cwd    : '<%= config.source.fonts %>',
					src    : '**/**',
					dest   : '<%= config.dist.fonts %>',
					filter : 'isFile'
				},
				{
					expand : true,
					cwd    : '<%= config.source.path %>',
					src    : '**/*.appcache',
					dest   : '<%= config.dist.path %>',
					filter : 'isFile'
				}]
			}
		},

		svgstore: {
			options: {
				prefix : 'icon-',
				formatting : {
					indent_size : 2
				},
			},
			default: {
				files: {
					'<%= config.dist.svg %>defs.svg': ['<%= config.source.svg %>*.svg'],
				},
			},
		},

		// Task configuration : Watch
		watch : {

			bake : {
				options : { livereload : true },
				files : ['<%= config.source.path %>/**/*.html'],
				tasks : ['bake:dev']
			},

			sass : {
				options : { livereload : true },
				files : ['<%= config.source.css.path %>**/*.scss'],
				tasks : ['sass:dev']
			},

			json        : {
				options : { livereload : true },
				files   : ['<%= config.source.path %>/assets/jsons/**/*.json'],
				tasks   : ['merge-json:dev', 'bake:dev']
			},

			svg : {
				options : { livereload : true },
				files   : ['<%= config.source.svg %>*.svg'],
				tasks   : ['svgstore']
			},

			another : {
				options : { livereload : true },
				files : [
					'<%= config.source.css.vendor %>**',
					'<%= config.source.js %>**',
					'<%= config.source.img %>**',
					'<%= config.source.fonts %>**'
				],
				tasks : ['newer:copy:dev']
			}

		},

		// LiveReload
		express  : {
			all : {
				options : {
					port       : 3000,
					hostname   : 'localhost',
					bases      : ['./prototype-html'],
					livereload : true
				}
			}
		},

		// Task configuration : Linting
		htmlhint : {
			build : {
				options : {
					force                      : true,
					'tagname-lowercase'        : true,
					'attr-lowercase'           : true,
					'attr-value-double-quotes' : true,
					'attr-value-not-empty'     : false,
					'doctype-first'            : false,
					'tag-pair'                 : true,
					'tag-self-close'           : false,
					'spec-char-escape'         : true,
					'id-unique'                : true,
					'src-not-empty'            : true,
					'head-script-disabled'     : false,
					'img-alt-require'          : true,
					'doctype-html5'            : true,
					'id-class-value'           : 'dash'
				},
				src     : ['<%= config.dist.path %>/**/*.html']
			}
		},

		htmllint : {
			all  : {
				options       : {
					force       : true,
					ignore      : [ // Example for ignore errors
						'Bad value “cleartype” for attribute “http-equiv” on element “meta”.',
						'Element “dl” is missing a required child element.',
						'Attribute “aria-autoclose” not allowed on element “div” at this point.'
					],
					errorlevels : 'error' // 'info','warning','error'
				},
				src           : '<%= config.dist.path %>/**/*.html'
			}
		},

		jshint : {
			options : {
				jshintrc : '.jshintrc',
				reporter : require('jshint-stylish'),
				force    : true
			},
			files   : {
				src : ['<%= config.source.js %>*.js']
			}
		},

		jscs : {
			src     : '<%= config.source.js %>*.js',
			options : {
				config : '.jscsrc',
				force  : true
			}
		},

		scsslint : {
			allFiles : [
				'<%= config.source.css.path %>/**/*.scss'
			],
			options  : {
				force          : true,
				config         : '.scss-lint.yml',
				colorizeOutput : true
			}
		},

		// Task configuration : Deploy SFTP
		'sftp-deploy' : {
			build : {
				auth     : {
					host    : '<%= config.deploy.host %>',
					port    : '<%= config.deploy.port %>',
					authKey : 'key1'
				},
				cache    : 'sftpCache.json',
				src      : '<%= config.dist.path %>',
				dest     : '<%= config.deploy.dest %>',
				progress : true,
				localSep : ftpLocalSep
			}
		}

	});

	// These plugins provide necessary tasks.
	require('load-grunt-tasks')(grunt);

	// Measures the time each task takes
	require('time-grunt')(grunt);

	// Default task
	grunt.registerTask('default', ['clean','merge-json:dev', 'bake:dev', 'sass:dev', 'scsslint', 'copy:dev', 'svgstore']);

	// LiveReload http://localhost:3000/
	grunt.registerTask('server', ['express', 'watch']);

	// Linting
	grunt.registerTask('lint', ['htmlhint', 'htmllint', 'scsslint', 'jshint', 'jscs']);

	// Deploy
	grunt.registerTask('deploy', ['default', 'lint', 'sftp-deploy']);
};
