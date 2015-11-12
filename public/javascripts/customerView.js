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
            templateUrl: "../views/customerView/confirmation.html",
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

    return {
        newReservation : newReservation
    }
});
app.factory('currentUser', function(){
    var currentUser = {};

    return currentUser;
});
app.factory('numSlots', function(){
    return slots = 0;
});

//DEFINE CONTROLLERS
app.controller("MainController", ["$scope", function($scope){
    var vm = this;
}]);

app.controller("LoginController", ["$scope", function($scope){
    var vm = this;
}]);

app.controller("CustomerInfoController", ["$scope", "$http", function($scope, $http){
    var vm = this;
    vm.currentSettings = {};
    $http.get('/settings/getSettings').then(function(response){
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
        console.log(captureRes.newReservation.childnumber);
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

app.controller("CustomerCalendarController", ["$scope", "captureRes", "numSlots", "$http", function($scope, captureRes, numSlots, $http){
    $scope.Math = window.Math;
    var vm = this;

    vm.partySize = 0;
    vm.showPartySize = true;
    vm.partyList = [0,1,2,3,4,5,6,7,8,9,10,11,12];
    vm.slotsNeeded = 0;
    vm.date = '';
    vm.mainTime = true;
    vm.currentDate = [];

    vm.buttonTime = function(){
        vm.mainTime = ! vm.mainTime;
    };

    vm.getTime = function(hour, quarter){
        var newDateTime = makeDateTime(vm.date, hour, quarter);
        captureRes.newReservation.datetime = newDateTime;
        console.log(newDateTime);
    };

    var makeDateTime = function(date, hour, minutes){
        var time = hour + minutes;
        console.log(date);
        var newDate = moment(date).hour(hour).minute(minutes);
        newDate = moment(newDate).format("YYYY-MM-DD hh:mm A");
        return newDate;
    };

//Toggles party size selector, choose party size, and determines number of slots needed
    vm.findPartySize = function(party){
        vm.partySize = party;
        vm.slots = Math.ceil(vm.partySize / 4);
        numSlots.slots = vm.slots;
    };

//GET RESERVATION INFO TO POPULATE RESERVATION LIST
    $scope.setDatepickerDay = function(day){
        $http.get('/reservation/getCalendar/' + day).then(function(response){
            vm.currentDate = response;
            console.log(vm.currentDate);
        });
    };
}]);

app.controller("ConfirmController", ["$scope", "captureRes", "numSlots", "$http", function($scope, captureRes, numSlots, $http){
    var vm = this;
    var selectedDate = captureRes.newReservation.datetime;
    vm.resConfirm = captureRes.newReservation;
    vm.date = moment(selectedDate).format('MMMM Do YYYY, h:mm:ss a');
    vm.slots = numSlots.slots;

    vm.confirmReservation = function(){
        $http.post('/reservation/makeReservation', vm.resConfirm).then(function(response){
            console.log(response);
        });
    }
}]);

app.controller("UserControlController", ["$scope", function($scope){
    var vm = this;
}]);





//OBJECT BUILDING TEST DATA
//SAVE FOR NOW
//vm.currentDate = [
//    {hour: 10,
//        quarters: [
//            {quarter: 00,
//                remainingSlots: 3,
//                reservations: [
//                    {email: 'name@gmail.com',
//                        phonenumber: '5555555555',
//                        adultnumber: 2,
//                        childnumber: 2,
//                        noshow: true,
//                        walkup: false,
//                        datetime: "2015-11-12 10:00",
//                        numslots: 1
//                    },
//                    {email: 'thismail@gmail.com',
//                        phonenumber: '6666666666',
//                        adultnumber: 3,
//                        childnumber: 5,
//                        noshow: true,
//                        walkup: false,
//                        datetime: "2015-11-12 10:00",
//                        numslots: 2
//                    }
//                ]},
//            {quarter : 15,
//                remainingSlots: 3,
//                reservations: [
//                    {email: 'this@gmail.com',
//                        phonenumber: '5555555555',
//                        adultnumber: 3,
//                        childnumber: 5,
//                        noshow: true,
//                        walkup: false,
//                        datetime: "2015-11-12 10:15",
//                        numslots: 2
//                    },
//                    {email: 'alt@gmail.com',
//                        phonenumber: '9989898898',
//                        adultnumber: 1,
//                        childnumber: 3,
//                        noshow: true,
//                        walkup: false,
//                        datetime: "2015-11-12 10:15",
//                        numslots: 1}
//                ]},
//            {quarter: 30,
//                remainingSlots: 3,
//                reservations: [{email: 'alt@gmail.com',
//                    phonenumber: '9989898898',
//                    adultnumber: 1,
//                    childnumber: 3,
//                    noshow: true,
//                    walkup: false,
//                    datetime: "2015-11-12 10:30",
//                    numslots: 1}]},
//            {quarter: 45,
//                remainingSlots: 3,
//                reservations: []}
//        ]},
//    {hour: 11,
//        quarters: [
//            {quarter: 00,
//                remainingSlots: 3,
//                reservations: [
//                    {email: 'name@gmail.com',
//                        phonenumber: '5555555555',
//                        adultnumber: 2,
//                        childnumber: 2,
//                        noshow: true,
//                        walkup: false,
//                        datetime: "2015-11-12 10:00",
//                        numslots: 1
//                    }
//                ]},
//            {quarter : 15,
//                remainingSlots: 3,
//                reservations: [
//                    {email: 'this@gmail.com',
//                        phonenumber: '5555555555',
//                        adultnumber: 3,
//                        childnumber: 5,
//                        noshow: true,
//                        walkup: false,
//                        datetime: "2015-11-12 10:15",
//                        numslots: 2
//                    },
//                    {email: 'alt@gmail.com',
//                        phonenumber: '9989898898',
//                        adultnumber: 1,
//                        childnumber: 3,
//                        noshow: true,
//                        walkup: false,
//                        datetime: "2015-11-12 10:15",
//                        numslots: 1}
//                ]},
//            {quarter: 30,
//                remainingSlots: 3,
//                reservations: [{email: 'alt@gmail.com',
//                    phonenumber: '9989898898',
//                    adultnumber: 1,
//                    childnumber: 3,
//                    noshow: true,
//                    walkup: false,
//                    datetime: "2015-11-12 10:30",
//                    numslots: 1}]},
//            {quarter: 45,
//                remainingSlots: 3,
//                reservations: []}
//        ]}
//];
//
//for(var i = 0; i <vm.currentDate.length; i++){
//    for(var it = 0; it < vm.currentDate[i].quarters.length; it++){
//        for(var iter = 0; iter < vm.currentDate[i].quarters[it].reservations.length; iter++){
//            vm.currentDate[i].quarters[it].remainingSlots -= vm.currentDate[i].quarters[it].reservations[iter].numslots;
//        }
//    }
//}