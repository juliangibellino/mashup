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
            jst_weather:{
                files: ['js/src/templates/*.jst'],
                tasks: ['jst:weather']
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
        },
        jst: {
            weather: {
                options: {
              namespace: 'templates',
              amd: true,
              prettify: true,
              uglify: true,
              processName: function(filepath) {
                var filepath = filepath.split("/"),
                    filepath = filepath[filepath.length - 1].replace('.jst', '');
                return filepath;
              }
                },
                files: {
                    "js/src/templates.js": ["js/src/templates/*.jst"]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-html-validation');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('weatherApp', ['requirejs:weather', 'jst:weather']);
};
