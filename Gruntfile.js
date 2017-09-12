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
                    target: 'es5',
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
                    'dest/ngDynamicFilter.min.js': ['dest/ngDynamicFilter.js']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-rename');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks("grunt-ts");

    grunt.loadNpmTasks('grunt-ts-concat');

    // Default task(s)
    grunt.registerTask('default', ['clean', 'ts_concat', 'ts', 'clean:concat', 'rename', 'uglify']);

};
