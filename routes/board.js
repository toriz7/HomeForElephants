var express = require('express');
var router = express.Router();


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/*
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mylab"); //데이터베이스이름이 mylab. collection은 student_board 이다.
    dbo.collection("student_board").find({}).toArray(function(err, result) {
    if (err) throw err;
    db.close();
  });
});
*/

router.get('/student_board', function(req, res,next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mylab");
      dbo.collection("student_board").find({}).sort({"date":1}).toArray(function(err, result) {
      if (err) throw err;
      res.render('../template/student_board', { email:req.session.user.email, name:req.session.user.name, bodard: result });
      db.close();
    });
  });
});



module.exports=router
