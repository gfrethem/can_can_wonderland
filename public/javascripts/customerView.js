var app = angular.module('customerApp', ['ngRoute', 'xeditable', 'slickCarousel', '720kb.datepicker']);

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

app.controller("NumberController", ["$scope", 'slickController', function($scope, slickController){
    var vm = this;

    vm.numAdults = [0,1,2,3,4,5,6,7,8,9,10,11,12];
    vm.numChildren = [0,1,2,3,4,5,6,7,8,9,10,11,12];

    vm.slickConfig = {
        method: {}
    }
}]);

app.controller("RegisterController", ["$scope", function($scope){
    var vm = this;
}]);

app.controller("CustomerCalendarController", ["$scope", function($scope){

    var vm = this;


    //ng-model="date"



    vm.hours = ['10','11','12','1','2','3','4','5','6','7','8','9'];

    vm.quarters = [':00', ':15', ':30', ':45'];

    vm.hourTime = function(index) {
        console.log(index);

    vm.fullTime[index] = true;


    };
}]);

app.controller("ConfirmController", ["$scope", function($scope){
    var vm = this;
}]);

app.controller("UserControlController", ["$scope", function($scope){
    var vm = this;
}]);


