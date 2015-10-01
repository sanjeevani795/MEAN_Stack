/**
 * Created by Sanjeevani on 9/16/15.
 */

/*
Service which gets data in JSON format from the node server that we spin up on 5050
First promise pulls up all bank IFSC and second promise is to get data for a specific IFSC.
 */
angular.module("serviceModule", [])
    .factory("ifscService", function($http) {
        return {
            getData: function () {
                var promise = $http.get('http://localhost:5050/banks').then(function(res){
                    //console.log(res);
                    return res.data;
                }, function(res){
                    return res.status;
                });
                return promise;
            },

            getDetails: function(ifscCode) {
                var detPromise = $http.get('http://localhost:5050/banks/' + ifscCode).then(function(res){
                    //console.log(res);
                    return res.data;
                }, function(res){
                    return res.status;
                });
                return detPromise;
            }
        }
});