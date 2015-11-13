var app = angular.module('customerApp', ['ngRoute', 'xeditable', 'slickCarousel', '720kb.datepicker', 'slickCarousel']);

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

        vm.adultprice = "$12";
        vm.childprice = "$8";
        vm.walkuptimeslots = "20";
        vm.onelinerestimeslots = "20";
        vm.minperslot = "2";
        vm.maxperslot = "3";
        vm.mopen = "Closed";
        vm.mclose = ;
        vm.topen = "Closed";
        vm.tuclose = ;
        vm.wopen = "Closed";
        vm.wclose = ;
        vm.thopen = ;
        vm.fopen = ;
        vm.fclose = ;
        vm.saopen = ;
        vm.saclose = ;
        vm.sunopen = ;
        vm.suclose = ;
        vm.specialmessage = "Have a great day!" ;

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
        captureRes.newReservation.numslots = vm.slots;
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
    vm.quarterSlots = false;

    vm.buttonTime = function(){
        var thisDate = moment(vm.date).format('YYYY-MM-DD HH:mm');
        $http.get('/reservation/getCalendar/' + thisDate).then(function(response){
            vm.currentDate = response.data;
            vm.mainTime = ! vm.mainTime;
        });
    };

//PICK A TIME
    vm.selectTime = function(time){
        var newDateTime = makeDateTime(vm.date, time);
        vm.yourDate = moment(newDateTime).format('dddd, MMM DD, YYYY hh:mm A');
        captureRes.newReservation.datetime = newDateTime;
    };

//COMBINE DATE AND TIME
    var makeDateTime = function(date, time){
        var hour = time.substring(0,2);
        var minute = time.substring(3,5);
        var newDate = moment(date).hour(hour).minute(minute);
        newDate = moment(newDate).format("YYYY-MM-DD HH:mm");
        return newDate;
    };

//Toggles party size selector, choose party size, and determines number of slots needed
    vm.findPartySize = function(party){
        vm.partySize = party;
        vm.slots = Math.ceil(vm.partySize / 4);
        numSlots.slots = vm.slots;
    };

//SHOW QUARTER HOURS
    vm.showSlots = function(index){
        vm.quarterSlots[index] = !vm.quarterSlots[index];
    };

    vm.slickConfig = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<button type="button" class="slick-prev">Previous</button>',
        method: {}
    };
}]);

//////

//$('.center').slick({
//    centerMode: true,
//    centerPadding: '60px',
//    slidesToShow: 3,
//    responsive: [
//        {
//            breakpoint: 768,
//            settings: {
//                arrows: false,
//                centerMode: true,
//                centerPadding: '40px',
//                slidesToShow: 3
//            }
//        },
//        {
//            breakpoint: 480,
//            settings: {
//                arrows: false,
//                centerMode: true,
//                centerPadding: '40px',
//                slidesToShow: 1
//            }
//        }
//    ]
//});


//////




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