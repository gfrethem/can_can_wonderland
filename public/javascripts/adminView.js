var app = angular.module('adminApp', ['ngRoute', 'xeditable', '720kb.datepicker', 'ui.mask']);

//Sets specific html view to load and sets an Angular controller to each page
app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/admin', {
            templateUrl: "../views/adminView/calendar.html"
        })
        .when('/adminInfo', {
            templateUrl: "../views/adminView/settings.html"
        })
        .when('/stats', {
            templateUrl: "../views/adminView/stats.html"
        });

    $locationProvider.html5Mode(true);
});

app.controller("AdminController", ["$scope", "$http", function($scope, $http){
    var vm = this;
    vm.logout = function(){
        $http.get("/login/logout");
    }
}]);

app.controller("AdminCalendarController", ["$scope", "$http",  function($scope, $http){
    var vm = this;
    vm.date = '';
    var thisDate = moment(vm.date).format('YYYY-MM-DD HH:mm');

    vm.quarterHour = false;
    vm.showReservationSlot = true;
    vm.mainTime = true;
    vm.currentDate = [];
    vm.quarterSlots = false;
    vm.info = false;
    vm.notes = "";
    vm.name = "";
    vm.email = "";
    vm.phonenumber = "";

//on submit, do a server call,
    //SHOW TIME SLOTS FOR A SPECIFIC DAY
    vm.submitTime = function(){
        var thisDate = moment(vm.date).format('YYYY-MM-DD HH:mm');
        $http.get('/reservation/getCalendar/' + thisDate).then(function(response){
            vm.currentDate = response.data;
            vm.mainTime = ! vm.mainTime;
        });
    };

    //SUBMIT A NEW RESERVATION
    vm.submitReservation = function(time, index){
        if(time.length == 7){
            var hour = parseInt(time.substring(0, 1));
            var minute = parseInt(time.substring(2, 4));
            var meridian = time.substring(5, 7);
        } else {
            var hour = parseInt(time.substring(0, 2));
            var minute = parseInt(time.substring(3, 5));
            var meridian = time.substring(6, 8);
        }

        if(meridian == "PM" && hour == 12){
            hour = 12;
        }
        else if(meridian == "PM"){
            hour += 12;
        }
        var newDate = moment(vm.date).hour(hour).minute(minute).format('YYYY-MM-DD HH:mm');
        console.log(newDate);
        var newReservation = {
            name: vm.name[time + index],
            email: vm.email[time + index],
            phonenumber: vm.phonenumber[time + index],
            adultnumber: vm.adultnumber[time + index],
            childnumber: vm.childnumber[time + index],
            datetime: newDate,
            numslots: vm.numslots[time + index],
            notes: vm.notes[time + index],
            reservation: false
        };

        if(vm.reservation[time + index]){
            newReservation.reservation = true;
            console.log(newReservation.reservation);
        }
        $http.post("/reservation/makeReservation", newReservation).then(function(){
            vm.currentDate = [];
            vm.submitTime();

            vm.name;
            vm.email;
            vm.phonenumber;
            vm.adultnumber;
            vm.childnumber;
            vm.numslots;
            vm.notes;
        });
    };

//CHECK IN A RESERVATION
    vm.checkedin = function(value){
        console.log(vm.checked);
        $http.put('/reservation/checkin/' + value);
    };

//CANCEL A RESERVATION
    vm.cancelReservation = function(id){
        $http.get("/reservation/cancelReservation/" + id).then(function(){
            vm.submitTime();
        });
    };
}]);

app.controller("AdminEditController", ["$scope", "$http", function($scope, $http) {
    var vm = this;
    vm.settings = {};
//GET CURRENT SETTINGS ON VIEW LOAD
    $http.get('/settings/getSettings').then(function(response){
        vm.settings = response.data[0];
    });
//SUBMIT ALL SETTINGS CHANGES ON SUBMIT
    vm.submitUpdates = function(){
      $http.put('/settings/updateSettings', vm.settings).then(function(){
          alert('Success!');
      });

    };
}]);



app.controller("AdminStatsController", ["$scope", "$http", function($scope, $http){
    var vm = this;
    vm.userEmail = "";

    vm.getList = function() {
        $http.get('/settings/list').then(function(response){
            vm.emailList = [];
            vm.showEmails = !vm.showEmails;
            for(var i = 0; i < response.data.length; i++){
                if(response.data[i].email != 'admin'){
                    if(response.data[i].email != 'frontdesk') {
                        vm.emailList.push(response.data[i].email);
                    }
                }
            }
        });
    };

    vm.deleteUser = function(){
        $http.get('/settings/delete/' + vm.userEmail).then(function(response){
            if(response){
                vm.userEmail = "";
                vex.dialog.alert("Success!");
            }
        })
    }
}]);

