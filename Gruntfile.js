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
                    module: 'commonjs',
                    target: 'es6',
                    types: [
                        "angular"
                    ],
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks("grunt-ts");

    grunt.loadNpmTasks('grunt-ts-concat');

    // Default task(s)
    grunt.registerTask('default', ['clean', 'ts_concat', 'ts', 'clean:concat']);

};
