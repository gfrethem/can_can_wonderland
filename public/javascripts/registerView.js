var app = angular.module('frontDeskApp', ['720kb.datepicker']);

app.controller('FrontDeskController', ["$scope", "$http", function($scope, $http){
    var vm = this;
    vm.date = '';
    var thisDate = moment(vm.date).format('YYYY-MM-DD HH:mm');

    vm.message = 'Front Desk View';
    vm.quarterHour = true;
    vm.showReservationSlot = true;
    vm.totalAvailableSlots = 20;
    vm.partySize = 0;
    vm.fullname = 'Walk Up';
    vm.fullhour = vm.hours + vm.quarters;
    vm.fullhourSlotNumber =  vm.totalAvailableSlots - vm.peopleSignedUp;
    vm.walkup = false;
    vm.checkin = false;
    vm.mainTime = true;
    vm.currentDate = [];
    vm.quarterSlots = false;
    vm.reservations= {
        fullname: "Just Stop!!",
        fullhourSlotNumber: "5",
        partySize: 6,
        message: "what!!!",
        quarterHour: 10
    };

//on submit, do a server call,

    //SHOW TIME SLOTS FOR A SPECIFIC DAY
    vm.submitTime = function(){
        var thisDate = moment(vm.date).format('YYYY-MM-DD HH:mm');
        $http.get('/reservation/getCalendar/' + thisDate).then(function(response){
            vm.currentDate = response.data;
            vm.mainTime = ! vm.mainTime;
            console.log(vm.currentDate);
        });
    };


    //SHOW QUARTER HOURS
    vm.showSlots = function(index){
        vm.quarterSlots[index] = !vm.quarterSlots[index];
    };


    //save the call to a vm

    // work it in Angular

    //database call;


    //vm.showQuarterHour = function(){
    //    vm.quarterHour = !vm.quarterHour;
    //    console.log('button clicked');
    //};

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
