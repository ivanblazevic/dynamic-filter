module.exports = function(grunt) {

    grunt.config.set("singleRun", false);

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            default: ['dest/*.js'],
            concat: ['dest/*.ts']
        },

        uglify: {
            default: {
                files: {
                    'dest/dynamicFilter.min.js': ['dest/dynamicFilter.js']
                }
            }
        },

        babel: {
            options: {
                sourceMap: true,
                presets: ['env']
            },
            dist: {
                files: {
                    'dest/dynamicFilter.js': 'dest/dynamicFilter.js'
                }
            }
        },

        browserify: {
            dist: {
                files: {
                    'dest/dynamicFilter.js': ['src/*.ts','!src/*.spec.ts']
                },
                options: {
                    plugin: ['tsify'],
                    browserifyOptions: {
                        insertGlobalVars: {
                            someData: function () { return JSON.stringify(someData); }
                        }
                    }
                }
            }
        },

        karma: {
            options: {
                configFile: 'karma.conf.js'
            },

            continuous: {
                logLevel:  'INFO',
                singleRun: grunt.option('travis') == true ? true : false,
            }
        },

        coveralls: {
            options: {
                debug: true,
                coverageDir: 'coverage/PhantomJS 2.1.1 (Mac OS X 0.0.0)',
                dryRun: true,
                force: true,
                recursive: true
            }
        }

    });

    grunt.loadNpmTasks('grunt-karma-coveralls');

    grunt.loadNpmTasks('grunt-karma');

    grunt.loadNpmTasks('grunt-babel');

    grunt.loadNpmTasks('grunt-browserify');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks("grunt-ts");

    // Default task(s)
    grunt.registerTask('default', ['clean', 'browserify', 'babel', 'uglify']);

    grunt.registerTask('test', ['karma', 'coveralls']);

};
