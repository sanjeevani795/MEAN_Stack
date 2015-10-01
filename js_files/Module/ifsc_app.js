/**
 * Created by Sanjeevani on 9/16/15.
 */

var ifsc_app = angular.module("ifsc_app", ['controllerModule', 'ngRoute']);

ifsc_app.config(function($routeProvider){
    $routeProvider
        .when("/banks", {
            "templateUrl": "../public/bankIndex.html",
            "controller": "ifsc_controller"
        })
        .when("/banks/:ifsc_code", {
            "templateUrl": "../public/bankDetail.html",
            "controller": "ifscDetailCtrl"
        })
        .otherwise({
            "redirectTo": "/public/index.html"
        })
});