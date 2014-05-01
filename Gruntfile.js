module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            files: {
              src: ['src/*.js']
            }
        },
        validation: {
            options: {
                reset: true
            },
            files: {
                src: ['*.html']
            }
        },
        watch: {
            requirejs_weather: {
                files: ['js/src/**/*.js', 'js/src/*.js'],
                tasks: ['requirejs:weather']
            },
        },
        requirejs: {
            weather:{
                options: {
                    baseUrl: "js/src",
                    mainConfigFile: "js/src/config.js",
                    name: "main",
                    out: "js/main.js",
                    optimize: "none"
                }
            }   
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-html-validation');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('weatherApp', ['requirejs:weather']);
};
