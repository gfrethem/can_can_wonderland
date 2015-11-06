var app = angular.module('customerApp', ['ngRoute', 'xeditable', '720kb.datepicker']);

//Sets specific html view to load and sets an Angular controller to each page
app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: "../views/home.html",
            controller: "MainController"
        })
        .when('/login', {
            templateUrl: "../views/login.html",
            controller: 'LoginController'
        })
        .when('/info', {
            templateUrl: "../views/customerView/info.html",
            controller: "CustomerInfoController"
        })
        .when('/guests', {
            templateUrl: "../views/customerView/numbercheck.html",
            controller: "NumberController"
        })
        .when('/register', {
            templateUrl: "../views/customerView/register.html",
            controller: "RegisterController"
        })
        .when('/customerCalendar', {
            templateUrl: "../views/customerView/calendar.html",
            controller: "CustomerCalendarController"
        })
        .when('/confirmReservation', {
            templateUrl: "../views/customerView/confirm.html",
            controller: "ConfirmController"
        })
        .when('/userControl', {
            templateUrl: "../views/customerView/usercontrol.html",
            controller: "UserControlController"
        });

    $locationProvider.html5Mode(true);
});

app.controller("MainController", ["$scope", function($scope){
    var vm = this;
}]);

app.controller("LoginController", ["$scope", function($scope){
    var vm = this;
}]);

app.controller("CustomerInfoController", ["$scope", function($scope){
    var vm = this;
}]);

app.controller("NumberController", ["$scope", function($scope){
    var vm = this;
}]);

app.controller("RegisterController", ["$scope", function($scope){
    var vm = this;
}]);

app.controller("CustomerCalendarController", ["$scope", function($scope){
    var vm = this;

    ng-model="date"


}]);

app.controller("ConfirmController", ["$scope", function($scope){
    var vm = this;
}]);

app.controller("UserControlController", ["$scope", function($scope){
    var vm = this;
}]);


