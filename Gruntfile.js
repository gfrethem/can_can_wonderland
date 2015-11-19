/**
 * Created by Dave on 9/22/15.
 */
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'client/app.js',
                dest: 'server/public/assets/scripts/app.min.js'
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "angular/angular.min.js",
                    "angular/angular.min.js.map",
                    "angular/angular-csp.css",
                    "font-awesome/css/*",
                    "font-awesome/fonts/*",
                    "angular-xeditable/xeditable.min.js",
                    "angular-route/angular-route.min.js",
                    "angularjs-datepicker/dist/angular-datepicker.min.css",
                    "angularjs-datepicker/dist/angular-datepicker.min.js",
                    "angular-slick-carousel/dist/angular-slick.min.js",
                    "jquery/dist/jquery.min.js",
                    "slick-carousel/slick/*",
                    "moment/min/moment.min.js",
                    "angular-cookies/angular-cookies.min.js",
                    "angular-ui-mask/dist/mask.min.js",
                    "vex-js/js/vex.combined.min.js",
                    "vex-js/css/vex.css",
                    "vex-js/css/vex-theme-default.css"

                ],
                "dest": "public/vendor/"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'uglify']);

};
