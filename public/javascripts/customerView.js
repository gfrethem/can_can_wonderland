var app = angular.module('customerApp', ['ngRoute', 'xeditable', 'slickCarousel', '720kb.datepicker', 'slickCarousel', 'ngCookies', 'ui.mask']);

//Sets specific html view to load and sets an Angular controller to each page
app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: "../views/home.html"
        })
        .when('/login', {
            templateUrl: "../views/login.html"
        })
        .when('/info', {
            templateUrl: "../views/customerView/info.html"
        })
        .when('/guests', {
            templateUrl: "../views/customerView/numbercheck.html"
        })
        .when('/register', {
            templateUrl: "../views/customerView/register.html"
        })
        .when('/customerCalendar', {
            templateUrl: "../views/customerView/calendar.html"
        })
        .when('/confirmReservation', {
            templateUrl: "../views/customerView/confirmation.html"
        })
        .when('/userControl', {
            templateUrl: "../views/customerView/usercontrol.html"
        });

    $locationProvider.html5Mode(true);
});

//Service to grab reservation information along the journey
app.factory('captureRes', function(){

    var newReservation = {
        name: "",
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
//ANGULAR SERVICE TO STORE A LOGGED IN USER
app.factory('currentUser', ['$http', function($http){
    var user = {};

    return {
        user : user
    }
}]);

//DEFINE CONTROLLERS
app.controller("MainController", ["$scope", "$http", "currentUser", "$cookies", "captureRes", function($scope, $http, currentUser, $cookies, captureRes){
    var vm = this;
//ON LOGOUT, REMOVE COOKIES
    vm.logout = function(){
        $cookies.remove('resAdults');
        $cookies.remove('resChildren');
        $cookies.remove('resDatetime');
        $cookies.remove('resNumslots');
        $cookies.remove('resHumanDate');
        captureRes.newReservation = {};
        currentUser.user = null;
        vm.user = null;
        $http.get("/login/logout");
    };
//CHECK TO SEE IF USER IS LOGGED IN, IF TRUE, GET THAT USER
    $http.get('/user/getUser').then(function(response){
        vm.user = response.data;
        currentUser.user = response.data;
    });

}]);

app.controller("LoginController", ["$scope", "$http", 'captureRes', '$cookies', 'currentUser', '$location', function($scope, $http, captureRes, $cookies, currentUser, $location){
//SKIP LOGIN VIEW IF ALREADY LOGGED IN
    if(currentUser.user){
        $location.path('/confirmReservation')
    }
    var vm = this;
//IF CAPTURERES FACTORY IS EMPTY AFTER NEW USER, REINITIALIZE
    if(captureRes.newReservation.datetime == ""){
        captureRes.newReservation.adultnumber = $cookies.get('resAdults');
        captureRes.newReservation.childnumber = $cookies.get('resChildren');
        captureRes.newReservation.datetime = $cookies.get('resDatetime');
        captureRes.newReservation.numslots = $cookies.get('resNumslots');
        captureRes.newReservation.humandate = $cookies.get('resHumanDate');
    }
//SET CATURERES FACTORY INFO. TO COOKIES TO CARRY THROUGH LOGIN PROCESS
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
//INITIALIZE VARIABLES FOR ANGULAR
    vm.numAdults = [0,1,2,3,4,5,6,7,8,9,10,11,12];
    vm.numChildren = [0,1,2,3,4,5,6,7,8,9,10,11,12];
    vm.totalAdults =  0;
    vm.totalChildren = 0;
    vm.price = 0;
    vm.totalPeople = 0;
    vm.slots = 0;
    vm.numCheck = 'login';
    vm.showChildSelect = true;
//CHECK SELECTED TIME, HIDE CHILD SELECTOR IF PAST 20
    var resTime = moment(captureRes.newReservation.datetime).format('HH');
    console.log(resTime);
    if(resTime >= 20){
        vm.showChildSelect = false;
    }
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

// UPDATE TOTAL PARTY SIZE AND DETERMINE THE NUMBER OF TEE TIMES NEED FOR THE PARTY
    var updateTotals = function(){
        vm.price = ((vm.totalAdults * 12) + (vm.totalChildren * 8));
        vm.totalPeople = vm.totalAdults + vm.totalChildren;
        vm.slots = Math.ceil(vm.totalPeople / 4);
        captureRes.newReservation.numslots = vm.slots;
    };
//Alert customer if they have more than 12 people in their party
    vm.showNumAlert = function(){
        if(vm.totalAdults == 0 && vm.totalChildren == 0){
            event.preventDefault();
            return vex.dialog.alert("Please select number of adults and/or children.");
        } else if(vm.totalPeople > 12){
            vm.numCheck = 'info';
            return vex.dialog.alert('You group is larger than 12 people, please call to reserve a tee time!');
        } else if(captureRes.newReservation.slotcheck < captureRes.newReservation.numslots){
            vm.numCheck = 'customerCalendar';
            vex.dialog.alert('Selected more people and need more tee times, please reconfirm date selection.');
        } else if(captureRes.newReservation.slotcheck > captureRes.newReservation.numslots){
            vm.numCheck = 'customerCalendar';
            vex.dialog.alert('Selected fewer people, please reconfirm date selection.');
        } else if (vm.totalPeople < 2){
            event.preventDefault();
            vex.dialog.alert('Party size must be 2 or greater.');
        }
    };

//SLICK CAROUSEL CONFIG FOR NUMBER SELECTORS
    vm.slickConfig = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        method: {}
    };
    }]);

app.controller("RegisterController", ["$scope", '$cookies', "captureRes", function($scope, $cookies, captureRes){
    var vm = this;
    vm.passFail = false;
//RESET COOKIES WHEN NEW USERS ARE CREATED
    $cookies.put('resAdults', captureRes.newReservation.adultnumber);
    $cookies.put('resChildren', captureRes.newReservation.childnumber);
    $cookies.put('resDatetime', captureRes.newReservation.datetime);
    $cookies.put('resNumslots', captureRes.newReservation.numslots);
    $cookies.put('resHumanDate', captureRes.newReservation.humandate);

//CHECK TO SEE IF PASSWORDS MATCH
    vm.passwordCheck = function(){
        if(vm.password1 != vm.password2){
            event.preventDefault();
            vex.dialog.alert("Passwords didn't match, please try again!");
            vm.password1 = "";
            vm.password2 = "";
        }
    }
}]);

app.controller("CustomerCalendarController", ["$scope", "captureRes",  "$http", function($scope, captureRes, $http){
    $scope.Math = window.Math;
    var vm = this;
//INITIALIZE VARIABLES FOR ANGULAR
    vm.partySize = 0;
    vm.showPartySize = true;
    vm.partyList = [2,3,4,5,6,7,8,9,10,11,12];
    vm.slotsNeeded = 0;
    var date = '';
    vm.mainTime = false;
    vm.currentDate = [];
    vm.quarterSlots = false;
    vm.monthList = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
    var monthChoice = "";
    var dayChoice = "";
    var yearChoice = "";
    vm.daysMonth = false;
    vm.daysInMonthList = [];

//SHOW DATE SELECTOR
    vm.showDateSelector = function(){
        vm.dateSelector = !vm.dateSelector;
    };

//DETERMINE NUMBER OF DAYS IN MONTH
    vm.selectMonth = function(month){
        var numDays = daysInMonth(month);
        for(var i = 1; i <= numDays; i++){
            vm.daysInMonthList.push(i);
        }
        vm.daysMonth = true;
    };

    function daysInMonth(month) {
        var currentDate = moment();
        var year = currentDate.year();

        var selectedDate = moment().set('year', year).set('month', month);

        if(selectedDate < currentDate){
            year = year + 1;
        }
        yearChoice = year;
        monthChoice = selectedDate.month();
        return new Date(year, monthChoice, 0).getDate();
    }

//SELECT A DAY OF THE MONTH
    vm.selectDay = function(day){
        dayChoice = day;
        vm.daysMonth = false;
    };

//SHOW TIME SLOTS FOR A SPECIFIC DAY
    vm.buttonTime = function() {
        if(vm.slotsNeeded == 0) {
            vm.mainTime = false;
            vex.dialog.alert('Please select a party size!');
        } else {
            vm.mainTime = true;
            var thisDate = moment().set('date', dayChoice).set('month', monthChoice).set('year', yearChoice).set('hour', 0).set('minute', 0).format('YYYY-MM-DD HH:mm');
            date = thisDate;
            $http.get('/reservation/getCalendar/' + thisDate).then(function (response) {
                if(response.data == "Closed"){
                    vm.yourDate = "";
                    vm.closed = response.data;
                } else {
                    vm.closed = "";
                    vm.currentDate = response.data;
                }
            });
        }
    };

//PICK A TIME AND SAVE TO RES FACTORY
    vm.selectTime = function(time){
        vm.mainTime = false;
        vm.quarterSlots = false;
        var newDateTime = makeDateTime(date , time);
        if(time.length == 7){
            var meridian = time.substring(5, 7);
            var hour = parseInt(time.substring(0,1));
        } else {
            meridian = time.substring(6, 8);
            hour = parseInt(time.substring(0,2));
        }
        if(meridian == "PM" && hour == 12){
            hour = 12;
        }
        else if(meridian == "PM"){
            hour += 12;
        }

        var sloppyDate = moment(newDateTime, 'YYYY-MM-DD HH:mm');
        sloppyDate.hour(hour);
        var databaseDate = sloppyDate.format('YYYY-MM-DD HH:mm');
        vm.yourDate = sloppyDate.format('dddd, MMM DD, YYYY h:mm A');
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
        vm.mainTime = false;
        vm.partySize = party;
        vm.slotsNeeded = Math.ceil(vm.partySize / 4);
        captureRes.newReservation.slotcheck = vm.slotsNeeded;
    };

//SLICK CAROUSEL CONFIG
    vm.slickConfig = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        method: {}
    };
    vm.confirmDateSelection = function(){
        if(!vm.yourDate){
            event.preventDefault();
            vex.dialog.alert('Please choose a tee time.');
        }
    }
}]);



app.controller("ConfirmController", ["$scope", "captureRes", "$http", "currentUser", "$cookies", '$location', function($scope, captureRes, $http, currentUser, $cookies, $location){
//IF NO RESERVATION IN PROGRESS, SKIP TO USER ACCOUNT PAGE
    if(!$cookies.get('resDatetime')){
        $location.path('/userControl')
    }
     var vm = this;
//GET USER INFORMATION FOR RESERVATION
    $http.get('/user/getUser').then(function(response){
        vm.myUser = response.data;
        currentUser.user = response.data;
        captureRes.newReservation.email = vm.myUser.email;
        captureRes.newReservation.phonenumber = vm.myUser.phonenumber;
        captureRes.newReservation.name = vm.myUser.name;
    });
//GET RESERVATION INFORMATION OFF THE COOKIES
     captureRes.newReservation.adultnumber = $cookies.get('resAdults');
     captureRes.newReservation.childnumber = $cookies.get('resChildren');
     captureRes.newReservation.datetime = $cookies.get('resDatetime');
     captureRes.newReservation.numslots = $cookies.get('resNumslots');
     captureRes.newReservation.humandate = $cookies.get('resHumanDate');

    vm.resConfirm = captureRes.newReservation;
    vm.resConfirm.reservation = true;
//SAVE A NEW RESERVATION TO THE DATABASE
    vm.confirmReservation = function(){
        $http.post('/reservation/makeReservation', vm.resConfirm).then(function(){
            $cookies.remove('resAdults');
            $cookies.remove('resChildren');
            $cookies.remove('resDatetime');
            $cookies.remove('resNumslots');
            $cookies.remove('resHumanDate');
            captureRes.newReservation = {};
        });
    };

}]);

app.controller("UserControlController", ["$scope", "currentUser", "$http", "$location", function($scope, currentUser, $http, $location){
    var vm = this;
    vm.currentReservations = [];
    vm.pastReservations = [];
    vm.myUser = {};

//GET USER INFO.
    $http.get('/user/getUser').then(function(response){
        vm.myUser = response.data;
        currentUser.user = response.data;
        getReservations();
    });

    var getReservations = function() {
        $http.get('/reservation/getReservations/' + vm.myUser.email).then(function (response) {
            vm.currentReservations = [];
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

    vm.cancelReservation = function(id){
        $http.get("/reservation/cancelReservation/" + id).then(function(){
            for(var i = 0; i < vm.currentReservations.length; i++){
                if(vm.currentReservations[i].id == id){
                    vm.currentReservations.splice(i, 1);
                }
            }
            vex.dialog.alert('Success!');

            getReservations();
        })
    };

    vm.deleteAccount = function(){
        var deleteConfirm;
            vex.dialog.confirm({
                message: 'Are you sure you want to delete your account and reservations?',
                callback: function(value) {
                    if(value){
                        $http.get("/user/deleteUser/" + vm.myUser.id).then(function(response){
                            if(response){
                                currentUser.user = null;
                                vex.dialog.alert('Your account has been deleted!');
                            }
                            $location.path('/')
                        });
                    } else {
                        event.preventDefault();
                    }
                }
            });
    };

    vm.updateAccount = function(){
        $http.put('/user/updateUser', vm.myUser).then(function(response){
            if(response){
                vex.dialog.alert("Successfully updated your account!");
                vm.showCustomerInfo = false;
            }
        })
    };
}]);
