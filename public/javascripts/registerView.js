var app = angular.module('frontDeskApp', ['xeditable']);

app.controller('FrontDeskController', ["$scope", function($scope){
    var vm = this;
    vm.message = 'Front Desk View';
}]);
