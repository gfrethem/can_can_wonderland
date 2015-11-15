/**
 * Created by Dave on 11/9/15.
 */
var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;

//GET A LOGGED IN USER
router.get('/getUser', function(req, res , next){
        var currentUser = req.user;
         res.send(currentUser);
});

//GET A USER
router.get('/user/:email?', function(req, res, next){
    var userEmail = req.params.email;
    User.findOne({
        where: {
            email: userEmail
        }
    }).then(function(response){
        res.send(response);
    });
});

//DELETE ACCOUNT
router.get('/deleteUser/:email?', function(req, res, next) {
    var userEmail = req.params.email;
    User.destroy({
        where: {
            email: userEmail
        }
    }).then(function (response) {
        res.send(200);
    });
});


//CONFIRM LOGIN INFO / REGISTRATION INFO / FACEBOOK INFO

//LOGIN / REGISTER / FACEBOOK LOGIN


module.exports = router;