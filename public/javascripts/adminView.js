var app = angular.module('adminApp', ['ngRoute', 'xeditable']);

//Sets specific html view to load and sets an Angular controller to each page
app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/admin', {
            templateUrl: "../views/adminView/calendar.html",
            controller: "AdminCalendarController"
        })
        .when('/adminInfo', {
            templateUrl: "../views/adminView/settings.html",
            controller: 'AdminEditController'
        })
        .when('/stats', {
            templateUrl: "../views/adminView/stats.html",
            controller: "AdminStatsController"
        });

    $locationProvider.html5Mode(true);
});

app.controller("AdminController", ["$scope", function($scope){
    var vm = this;
}]);

app.controller("AdminCalendarController", ["$scope", function($scope){
    var vm = this;
}]);

app.controller("AdminEditController", ["$scope", "$http", function($scope, $http) {
    var vm = this;
    vm.settings = {};
//GET CURRENT SETTINGS ON VIEW LOAD
    $http.get('/settings/settings').then(function(response){
        vm.settings = response.data[0];
    });
//SUBMIT ALL SETTINGS CHANGES ON SUBMIT
    vm.submitChanges = function(){
      $http.put('/settings/update', vm.settings);
    };


}]);



app.controller("AdminStatsController", ["$scope", function($scope){
    var vm = this;
}]);