var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var models = require('../models');
var User = models.User;

router.get('/', function(req, res, next){
    res.sendFile(path.join(__dirname, '../views/register.html'));
});

router.get('/registerLanding', function(req, res, next){
    res.sendFile(path.join(__dirname, '../views/registerLanding.html'));
});

router.post('/', function(req, res, next){
    console.log(req.body);

 //   User.create(req.body, function(err, post){
 //       if(err){
 //           next(err);
 //       } else {
 //           res.redirect('/register/registerLanding');
 //       }
 //});
});

module.exports = router;