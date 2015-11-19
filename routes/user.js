/**
 * Created by Dave on 11/9/15.
 */
var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;
var Reservation = models.Reservation;

//GET A LOGGED IN USER
router.get('/getUser', function(req, res , next){
    console.log("THIS ONE!");
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
router.get('/deleteUser/:id?', function(req, res, next) {
    var userId = req.params.id;
    User.findOne({
        where : {
            id: userId
        }
    }).then(function(response){
        var userEmail = response.email;
        Reservation.destroy({
            where: {
                email: userEmail
            }
        });

        User.destroy({
            where: {
                id: userId
            }
        }).then(function (response) {
            req.logOut();
            req.session.destroy();
            res.send(200);
        });
    })
});

//UPDATE A USER
router.put('/updateUser', function(req, res, next){
    var user = req.body;
    User.findOne({
        where: {
            id: user.id
        }
    }).then(function(response){
        response.name = user.name;
        response.email = user.email;
        response.phonenumber = user.phonenumber;
        response.save();
    }).then(function(response){
        res.send(response);
    })
});


module.exports = router;