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

//Service to grab reservation information along the journey
app.factory('captureRes', function(){
    var newReservation = {
        email: "",
        phonenumber: "",
        adultnumber: 0,
        childnumber: 0,
        datetime: ""
    };

    return newReservation;
}).factory('currentUser', function(){
    var currentUser = {};

    return currentUser;
}).factory('numSlots', function(){
    var slots = 0;
    return slots;
});

app.controller("MainController", ["$scope", function($scope){
    var vm = this;
}]);

app.controller("LoginController", ["$scope", function($scope){
    var vm = this;
}]);

app.controller("CustomerInfoController", ["$scope", function($scope){
    var vm = this;
    vm.currentSettings = {};
    http.get('/settings/settings').then(function(response){
        console.log(response);
        vm.currentSettings = response;
    });
}]);

app.controller("NumberController", ["$scope", "captureRes", function($scope, captureRes){
    var vm = this;

    vm.numAdults = [0,1,2,3,4,5,6,7,8,9,10,11,12];
    vm.numChildren = [0,1,2,3,4,5,6,7,8,9,10,11,12];
    vm.totalAdults = 0;
    vm.totalChildren = 0;
    vm.price = 0;
    vm.totalPeople = 0;
    vm.slots = 0;

//Determine number of adults and children, as well as get total number of people and slots taken up
    vm.numberOfAdults = function(num){
        vm.totalAdults = num;
        captureRes.newReservation.adultnumber = num;
        updateTotals();
    };
    vm.numberOfChildren = function(num){
        vm.totalChildren = num;
        captureRes.newReservation.childnumber = num;
        updateTotals();
    };
    var updateTotals = function(){
        vm.price = ((vm.totalAdults * 12) + (vm.totalChildren * 8));
        vm.totalPeople = vm.totalAdults + vm.totalChildren;
        vm.slots = Math.ceil(vm.totalPeople / 4);
    };
//Alert customer if they have more than 12 people in their party
    vm.showNumAlert = function(){
        if(vm.totalPeople > 12){
            alert('You group is larger than 12 people, please call to schedule');
        }
    }

}]);

app.controller("RegisterController", ["$scope", function($scope){
    var vm = this;
}]);

app.controller("CustomerCalendarController", ["$scope", "captureRes", "numSlots", function($scope, captureRes, numSlots){

    var vm = this;

    vm.partySize = 0;
    vm.showPartySize = true;
    vm.partyList = [0,1,2,3,4,5,6,7,8,9,10,11,12];
    vm.slotsNeeded = 0;
    vm.date = '';
    vm.mainTime = true;

    vm.buttonTime = function(){
        vm.mainTime = ! vm.mainTime;
    };
//This is bad code, needs to be dynamic
    vm.hours = [{hour: 10, meridian: 'AM'}, {hour: 11, meridian: 'AM'}, {hour: 12, meridian: 'PM'}, {hour: 1, meridian: 'PM'}, {hour: 2, meridian: 'PM'}, {hour: 3, meridian: 'PM'}, {hour: 4, meridian: 'PM'}, {hour: 5, meridian: 'PM'}, {hour: 6, meridian: 'PM'}, {hour: 7, meridian: 'PM'}, {hour: 8, meridian: 'PM'}, {hour: 9, meridian: 'PM'}, {hour: 10, meridian: 'PM'}];
    vm.quarters = ['00', '15', '30', '45'];

    vm.getTime = function(hour, quarter, meridian){
        var newDateTime = makeDateTime(vm.date, hour, quarter, meridian);
        captureRes.newReservation.datetime = newDateTime;
        console.log(newDateTime._d);
    };

    var makeDateTime = function(date, hour, minutes, meridian){
        var time= hour + minutes + " " + meridian;
        var input = date;
        if(meridian === 'AM'){
            var newDate = moment(input).hour(hour).minute(minutes);
        }
        return newDate;
    };
//Toggles party size selector, choose party size, and determines number of slots needed
    vm.findPartySize = function(party){
        vm.partySize = party;
        vm.slots = Math.ceil(vm.partySize / 4);
        numSlots.slots = vm.slots;
    }
}]);

app.controller("ConfirmController", ["$scope", "captureRes", "numSlots", function($scope, captureRes, numSlots){
    var vm = this;
    var selectedDate = captureRes.newReservation.datetime;
    vm.resConfirm = captureRes.newReservation;
    vm.date = moment(selectedDate).format('MMMM Do YYYY, h:mm:ss a');
    vm.slots = numSlots.slots;


}]);

app.controller("UserControlController", ["$scope", function($scope){
    var vm = this;
}]);


