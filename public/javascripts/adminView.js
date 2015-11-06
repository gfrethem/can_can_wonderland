var app = angular.module('adminApp', ['ngRoute', 'xeditable']);

//Sets specific html view to load and sets an Angular controller to each page
app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/admin', {
            templateUrl: "../views/adminView/calendar.html",
            controller: "AdminCalendarController"
        })
        .when('/settings', {
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

app.controller("AdminEditController", ["$scope", function($scope) {
    var vm = this;

    vm.time = {
    hoursMonday: 'Closed',
    hoursTuesday: 'Closed',
    hoursWednesday: 'Closed',
    hoursThursday: '10am - Midnight',
    hoursFriday: '10am - Midnight',
    hoursSaturday: '10am - Midnight',
    hoursSunday: '10am - Midnight'
};

    vm.price = {
        adult: '$13',
        adolescent: '$8'
    }


}]);



app.controller("AdminStatsController", ["$scope", function($scope){
    var vm = this;
}]);