var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var document=require('document');
var MongoClient = require('mongodb').MongoClient;
//var el = document.querySelector('#country option:selected');
/* GET home page. */
var c,s,ci;
router.get('/', function(req, res, next) {
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://192.168.1.195:27017/dharmesh ";
        MongoClient.connect(url,{useNewUrlParser:true} ,function(err,db) {
          if (err) throw err;
          var dbo = db.db("dharmesh");
          //Find the  country:
          var country=[];
          dbo.collection("country").find({}).toArray(function(err, result) {
            if (err) throw err;
            country=result;
            console.log('your result country:',country);
            db.close();
            res.render('index', {country});
            }) 
              
          });
});


router.get('/getstate', function(req, res, next) {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://192.168.1.195:27017/dharmesh ";
  console.log(req);
  MongoClient.connect(url,{useNewUrlParser:true} ,function(err,db) {
    if (err) throw err;
    var dbo = db.db("dharmesh");
     c=req.query.q;
      var state=[];
      console.log("123"); 
      dbo.collection("state").find({address:c}).toArray(function(err, result1) {
        if (err) throw err;
        state=result1;
        console.log('your result state:',state);
        db.close();
        res.send({state});
      })
    })
});

router.get('/getcity', function(req, res, next) {
  console.log(111);
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://192.168.1.195:27017/dharmesh ";
  console.log(url);
  MongoClient.connect(url,{useNewUrlParser:true} ,function(err,db) {
    if (err) throw err;
    var dbo = db.db("dharmesh");
     s=req.query.q;
      var city=[]; 
      dbo.collection("city").find({address:s}).toArray(function(err, result1) {
        if (err) throw err;
        city=result1;
        console.log('your result state:',city);
        db.close();
        res.send({city});
      })
    })
});

router.get('/data', function(req, res, next) {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://192.168.1.195:27017/dharmesh ";
  console.log(url);
  MongoClient.connect(url,{useNewUrlParser:true} ,function(err,db) {
    if (err) throw err;
    var dbo = db.db("dharmesh");
     ci=req.query.q;
    console.log(ci);
    var myobj = { country: c, state: s,city:ci };
  dbo.collection("data").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log(" document inserted");
    db.close();
  });
  })
});
module.exports = router;
