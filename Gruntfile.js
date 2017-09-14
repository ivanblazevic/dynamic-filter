module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            default: ['dest/*.js'],
            concat: ['dest/*.ts']
        },

        ts_concat: {
            default: {
                dest: 'dest/concat.ts',
                src: 'src/*.ts'
            }
        },

        ts: {
            default : {
                src: "dest/concat.ts",
                options: {
                    sourceMap: true,
                    declaration: false,
                    module: 'commonjs',
                    target: 'es6',
                    types: [
                        "angular"
                    ],
                }
            }
        },

        rename: {
            main: {
                files: [
                    { src: ['dest/concat.js'], dest: 'dest/ngDynamicFilter.js' },
                    { src: ['dest/concat.js.map'], dest: 'dest/ngDynamicFilter.js.map' }
                ]
            }
        },

        uglify: {
            default: {
                files: {
                    'dest/dynamicFilter.min.js': ['dest/dynamicFilter.js']
                }
            }
        },

        browserify: {
            dist: {
                files: {
                    'dest/dynamicFilter.js': ['src/*.ts']
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
        }

    });

    grunt.loadNpmTasks('grunt-browserify');

    grunt.loadNpmTasks('grunt-contrib-rename');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks("grunt-ts");

    grunt.loadNpmTasks('grunt-ts-concat');

    // Default task(s)
    grunt.registerTask('default', ['clean', 'browserify'/*, 'uglify'*/]);

};
