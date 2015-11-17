var app = angular.module('customerApp', ['ngRoute', 'xeditable', 'slickCarousel', '720kb.datepicker', 'slickCarousel', 'ngCookies', 'ui.mask']);

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
        datetime: "",
        humandate: "",
        numslots: 0,
        slotcheck: 0
    };

    return {
        newReservation : newReservation
    }
});
app.factory('currentUser', ['$http', function($http){
    var user = {};

    var fetchUserDetails = function(){
      $http.get('/user/getUser').then(function(response){
          user.details = response.data;
          console.log('User', user);
      })
    };

    fetchUserDetails();

    return {
        user : user,
        fetchUserDetails: fetchUserDetails
    }
}]);

//DEFINE CONTROLLERS
app.controller("MainController", ["$scope", "$http", "currentUser", function($scope, $http, currentUser){
    var vm = this;
    vm.logout = function(){
        $http.get("/login/logout");
    };
    // Not sure I like this yet - G
    //currentUser.fetchUserDetails();
    //vm.user = currentUser.user;
}]);

app.controller("LoginController", ["$scope", "$http", 'captureRes', '$cookies', function($scope, $http, captureRes, $cookies){
    var vm = this;
    $cookies.put('resAdults', captureRes.newReservation.adultnumber);
    $cookies.put('resChildren', captureRes.newReservation.childnumber);
    $cookies.put('resDatetime', captureRes.newReservation.datetime);
    $cookies.put('resNumslots', captureRes.newReservation.numslots);
    $cookies.put('resHumanDate', captureRes.newReservation.humandate);

}]);

app.controller("CustomerInfoController", ["$scope", "$http", function($scope, $http){
    var vm = this;
    vm.currentSettings = {};
    $http.get('/settings/getSettings').then(function(response){
        vm.currentSettings = response.data[0];
//CHECK IF OPEN OR CLOSED
        vm.monday = vm.currentSettings.mclose.substring(0,2) - vm.currentSettings.mopen.substring(0,2);
        vm.tuesday = vm.currentSettings.tuclose.substring(0,2) - vm.currentSettings.tuopen.substring(0,2);
        vm.wednesday = vm.currentSettings.wclose.substring(0,2) - vm.currentSettings.wopen.substring(0,2);
        vm.thursday = vm.currentSettings.thclose.substring(0,2) - vm.currentSettings.thopen.substring(0,2);
        vm.friday = vm.currentSettings.fclose.substring(0,2) - vm.currentSettings.fopen.substring(0,2);
        vm.saturday = vm.currentSettings.saclose.substring(0,2) - vm.currentSettings.saopen.substring(0,2);
        vm.sunday = vm.currentSettings.suclose.substring(0,2) - vm.currentSettings.suopen.substring(0,2);
//FORMAT DATETIMES
        vm.currentSettings.mclose = moment().hour(vm.currentSettings.mclose.substring(0,2)).format("hh A");
        vm.currentSettings.mopen = moment().hour(vm.currentSettings.mopen.substring(0,2)).format('hh A');
        vm.currentSettings.tuopen = moment().hour(vm.currentSettings.tuopen.substring(0,2)).format("hh A");
        vm.currentSettings.tuclose = moment().hour(vm.currentSettings.tuclose.substring(0,2)).format("hh A");
        vm.currentSettings.wopen = moment().hour(vm.currentSettings.wopen.substring(0,2)).format("hh A");
        vm.currentSettings.wclose = moment().hour(vm.currentSettings.wclose.substring(0,2)).format("hh A");
        vm.currentSettings.thopen = moment().hour(vm.currentSettings.thopen.substring(0,2)).format("hh A");
        vm.currentSettings.thclose = moment().hour(vm.currentSettings.thclose.substring(0,2)).format("hh A");
        vm.currentSettings.fopen = moment().hour(vm.currentSettings.fopen.substring(0,2)).format("hh A");
        vm.currentSettings.fclose = moment().hour(vm.currentSettings.fclose.substring(0,2)).format("hh A");
        vm.currentSettings.saopen = moment().hour(vm.currentSettings.saopen.substring(0,2)).format("hh A");
        vm.currentSettings.saclose = moment().hour(vm.currentSettings.saclose.substring(0,2)).format("hh A");
        vm.currentSettings.suopen = moment().hour(vm.currentSettings.suopen.substring(0,2)).format("hh A");
        vm.currentSettings.suclose = moment().hour(vm.currentSettings.suclose.substring(0,2)).format("hh A");
    });
}]);

app.controller("NumberController", ["$scope", "captureRes", function($scope, captureRes){
    var vm = this;

    vm.numAdults = [0,1,2,3,4,5,6,7,8,9,10,11,12];
    vm.numChildren = [0,1,2,3,4,5,6,7,8,9,10,11,12];
    vm.totalAdults =  captureRes.newReservation.adultnumber;
    vm.totalChildren = captureRes.newReservation.childnumber;
    vm.price = 0;
    vm.totalPeople = 0;
    vm.slots = 0;
    vm.numCheck = 'login';

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

    // THIS SHOULD BE DYNAMIC // LIZ 4 LIFE
    var updateTotals = function(){
        vm.price = ((vm.totalAdults * 12) + (vm.totalChildren * 8));
        vm.totalPeople = vm.totalAdults + vm.totalChildren;
        vm.slots = Math.ceil(vm.totalPeople / 4);
        captureRes.newReservation.numslots = vm.slots;
    };
//Alert customer if they have more than 12 people in their party
    vm.showNumAlert = function(){
        if(vm.totalPeople > 12){
            vm.numCheck = 'info';
            return alert('You group is larger than 12 people, please call to schedule');
        }
        if(captureRes.newReservation.slotcheck < captureRes.newReservation.numslots){
            vm.numCheck = 'customerCalendar';
            alert('You selected more people and need more slots, please reconfirm date selection.');
        } else if(captureRes.newReservation.slotcheck > captureRes.newReservation.numslots){
            vm.numCheck = 'customerCalendar';
            alert('You selected fewer people, please reconfirm date selection.');
        }
    }

}]);

app.controller("RegisterController", ["$scope", "$timeout", function($scope, $timeout){
    var vm = this;
    vm.passFail = false;
    vm.passwordCheck = function(){
        if(vm.password1 != vm.password2){
            event.preventDefault();
            vm.passFail = true;
            $timeout(function () {
                vm.passFail = false;
            }, 10000);
        }
    }
}]);

app.controller("CustomerCalendarController", ["$scope", "captureRes",  "$http", function($scope, captureRes, $http){
    $scope.Math = window.Math;
    var vm = this;

    vm.partySize = 0;
    vm.showPartySize = true;
    vm.partyList = [0,1,2,3,4,5,6,7,8,9,10,11,12];
    vm.slotsNeeded = 0;
    vm.date = '';
    vm.mainTime = false;
    vm.currentDate = [];
    vm.quarterSlots = false;

//SHOW TIME SLOTS FOR A SPECIFIC DAY
    vm.buttonTime = function(){
        var thisDate = moment(vm.date).format('YYYY-MM-DD HH:mm');
        $http.get('/reservation/getCalendar/' + thisDate).then(function(response){
            vm.currentDate = response.data;
            vm.mainTime = true;
            console.log(vm.currentDate);
        });
    };

//PICK A TIME AND SAVE TO RES FACTORY
    vm.selectTime = function(time){
        vm.mainTime = false;
        vm.quarterSlots = false;
        var newDateTime = makeDateTime(vm.date, time);
        var databaseDate = moment(newDateTime).format('YYYY-MM-DD HH:mm');
        vm.yourDate = moment(newDateTime).format('dddd, MMM DD, YYYY h:mm A');
        captureRes.newReservation.datetime = databaseDate;
        captureRes.newReservation.humandate = vm.yourDate;
    };

//COMBINE DATE AND TIME
    var makeDateTime = function(date, time){
        date = moment(date).format('YYYY-MM-DD');
        newDate = date + " " + time;
        return newDate;
    };

//Toggles party size selector, choose party size, and determines number of slots needed
    vm.findPartySize = function(party){
        vm.partySize = party;
        vm.slotsNeeded = Math.ceil(vm.partySize / 4);
        console.log(vm.slotsNeeded);
        captureRes.newReservation.slotcheck = vm.slotsNeeded;
    };

//SHOW QUARTER HOURS
    vm.showSlots = function(index){
        vm.quarterSlots[index] = !vm.quarterSlots[index];
    };


//SLICK CAROUSEL CONFIG
    vm.slickConfig = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        method: {}
    };
}]);

app.controller("ConfirmController", ["$scope", "captureRes", "$http", "currentUser", "$cookies", '$location', function($scope, captureRes, $http, currentUser, $cookies, $location){

    if($cookies.get('resDatetime') == ""){
        $location.path('/userControl')
    }
     var vm = this;

    $http.get('/user/getUser').then(function(response){
        vm.myUser = response.data;
        captureRes.newReservation.email = vm.myUser.email;
        captureRes.newReservation.phonenumber = vm.myUser.phonenumber;
    })

     captureRes.newReservation.adultnumber = $cookies.get('resAdults');
     captureRes.newReservation.childnumber = $cookies.get('resChildren');
     captureRes.newReservation.datetime = $cookies.get('resDatetime');
     captureRes.newReservation.numslots = $cookies.get('resNumslots');
     captureRes.newReservation.humandate = $cookies.get('resHumanDate');

    vm.resConfirm = captureRes.newReservation;
    vm.confirmReservation = function(){
        $http.post('/reservation/makeReservation', vm.resConfirm).then(function(){
            $cookies.remove('resAdults');
            $cookies.remove('resChildren');
            $cookies.remove('resDatetime');
            $cookies.remove('resNumslots');
            $cookies.remove('resHumanDate');
        });
    };

}]);

app.controller("UserControlController", ["$scope", "currentUser", "$http", function($scope, currentUser, $http){
    var vm = this;
    vm.currentReservations = [];
    vm.pastReservations = [];
    vm.myUser = currentUser.user.details;

    var getReservations = function() {
        $http.get('/reservation/getReservations/' + vm.myUser.email).then(function (response) {
            for (i = 0; i < response.data.length; i++) {
                if (moment().format('YYYY-MM-DD HH:mm') < response.data[i].datetime) {
                    response.data[i].humantime = moment(response.data[i].datetime).format('dddd, MMM DD, YYYY h:mm A');
                    vm.currentReservations.push(response.data[i]);
                } else {
                    response.data[i].humantime = moment(response.data[i].datetime).format('dddd, MMM DD, YYYY h:mm A');
                    vm.pastReservations.push(response.data[i]);
                }
            }
        });
    };

    vm.cancelReservation = function(id, index){
        $http.get("/reservation/cancelReservation/" + id).then(function(){
            vm.currentReservations.splice(index, 1);
            alert('Success!');
            getReservations();
        })
    };

    getReservations();
}]);