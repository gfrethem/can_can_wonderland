var app = angular.module('frontDeskApp', []);

app.controller('FrontDeskController', ["$scope", "$http", function($scope, $http){
    var vm = this;
    vm.date = '';
    var thisDate = moment(vm.date).format('YYYY-MM-DD HH:mm');

    vm.message = 'Front Desk View';
    vm.quarterHour = true;
    vm.showReservationSlot = true;
    vm.totalAvailableSlots = 20;
    vm.partySize = 0;
    vm.fullname = 'fullName';
    vm.fullhour = vm.hours + vm.quarters;
    vm.fullhourSlotNumber = - vm.totalAvailableSlots - vm.peopleSignedUp;
    vm.walkup = false;
    vm.checkin = false;
    vm.reservations= {
        fullname: "Just Stop!!",
        fullhourSlotNumber: "5",
        partySize: 6,
        message: "what!!!",
        quarterHour: 10
    };

    //database call;

    vm.showQuarterHour = function(){
        vm.quarterHour = !vm.quarterHour;
    };

    vm.showReservation = function(){
        vm.showReservationSlot = !vm.showReservationSlot;
    };

//PULL IN ALL RESERVATIONS FOR A CERTAIN DAY
    $http.get('/reservation/getCalendar/' + thisDate).then(function(response){
        vm.currentDate = response.data;
        vm.mainTime = ! vm.mainTime;
    });
//CHECK IN A RESERVATION
//    vm.walkUpChange = function(value){
//        console.log(value);
//    }
}]);
