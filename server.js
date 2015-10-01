/**
 * Created by sanjeevani on 9/14/15.
 */
var express = require('express');
var fs = require ('fs');
var serveStatic= require('serve-static');
var mongoose = require('mongoose');

var app = express();
app.use(express.static(__dirname + '/public'))
        .listen(5050);

var ifsc_codes;
/*
This chunk of code fetch details from a database in Mongo DB.
 */

////Mongo DB code to connect to Database
//mongoose.connect("mongodb://localhost:27017/ifsc_db");
//var db = mongoose.connection;
//
////If error while connecting
//db.on('error', function(err){
//    if(err){
//        console.log(err.message);
//    }
//});
//
////Once connected to database, fetch data w.r.to given query in find function
//db.once('open',function(err){
//    if(err){
//        console.log(err.message);
//        return;
//    }
//    var ifsc_db = db.collection("ifsc_collection");
//    ifsc_db.find({'BANK': 'DEUSTCHE BANK'}).toArray(function (err, doc){
//        if(err){
//            console.log(err);
//        }
//        else {
//            //$scope.ifsc_data = doc;
//            console.log( doc.length);
//            ifsc_codes = doc;
//        }
//    });
//
//});
//
////Create routes to server where client can query
////Below route gives details for all the banks for given query
//app.get("/banks",function(req, res){
//    res.setHeader("Access-Control-Allow-Origin", "*");
//    res.status(200).send(ifsc_codes);
//});
//
////This route gives detail about specific code given in the URL
//app.get("/banks/:ifsc_code", function(req,res){
//    res.setHeader("Access-Control-Allow-Origin", "*");
//        var ifsc_db = db.collection("ifsc_collection");
//        ifsc_db.find({'IFSC' : req.params['ifsc_code']}).toArray(function (err, detail){
//            if(err){
//                //console.log(err);
//                res.send(err);
//            }
//            else {
//                //console.log(req.params['ifsc_code']);
//                res.status(200).send(detail);
//            }
//        });
//});
/*
End of Code - Server fetching details from MOngo DB
 */

/*
 Start code to fetch data from JSON file
 */
fs.readFile('data.json', 'utf8', function (err, data) {
    if(err){
        ifsc_codes = err.message;
    }
    else {
        ifsc_codes = JSON.parse(data);
    }
});

//Below route gives details for all the banks in data.json file
app.get("/banks",function(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(ifsc_codes);
});

//This route gives detail about specific code given in the URL
app.get("/banks/:ifsc_code", function(req,res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var detail;
    //Using IIFE to keep the operation asynchronous
    (function iterator(index){
        if(index >= ifsc_codes.length){

            return;
        }
        else {
            if(ifsc_codes[index]["IFSC"] == req.params['ifsc_code']) {
                detail = ifsc_codes[index];
            }
            iterator(index + 1);
        }
    })(0);

    res.status(200).send(detail);
});

/*
End code to fetch data from JSON
 */