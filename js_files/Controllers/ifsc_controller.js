/**
 * Created by Sanjeevani on 9/16/15.
 * There are 2 controllers used by bankIndex.html and bankDetail.html respectively
 */
var ctrlModule = angular.module("controllerModule", ['serviceModule']);

ctrlModule.controller("ifsc_controller", function($scope, ifscService) {
    ifscService.getData().then(function (data) {
        $scope.ifsc_model = data;
    });
});
    ctrlModule.controller("ifscDetailCtrl", function($scope, $location, ifscService, $routeParams) {
       //service to give details of a bank
        ifscService.getDetails($routeParams.ifsc_code).then(function(detailedData){
            $scope.bankDetail = detailedData;
        });
        //Event for Back button in detail page
        $scope.goHome = function(urlpath) {
            $location.path(urlpath);
        }
    });