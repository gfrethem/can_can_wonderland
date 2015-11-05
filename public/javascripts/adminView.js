var app = angular.module('adminApp', ['ngRoute', 'xeditable']);

//Sets specific html view to load and sets an Angular controller to each page
app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/admin', {
            templateUrl: "../views/adminView/calendar.html",
            controller: "CalendarController"
        })
        .when('/login', {
            templateUrl: "../views/adminView/settings.html",
            controller: 'LoginController'
        })
        .when('/info', {
            templateUrl: "../views/adminView/stats.html",
            controller: "CustomerInfoController"
        });

    $locationProvider.html5Mode(true);
});