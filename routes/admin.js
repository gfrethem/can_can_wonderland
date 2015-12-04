/**
 * Created by Liz on 11/9/15.
 */

var express = require('express');
var router = express.Router();
var moment = require('moment');
//var Sequelize = require('sequelize');
var models = require('../models');
var Settings = models.Setting;
var Users = models.User;
var Reservations = models.Reservation;

//CHANGE INFO (HOURS, PRICES, SPECIAL MESSAGE)
router.put('/updateSettings', function(req, res, next) {
    var newSetting = req.body;
    var settingId = req.body.id;

    Settings.destroy({
        where: {
            id: settingId
        }
    }).then(function () {
        Settings.build(newSetting)
            .save()
            .then(function (anotherTask) {
                // you can now access the currently saved task with the variable anotherTask... nice!
                res.send(200);
            }).catch(function (error) {
                // Ooops, do some error-handling
                console.log(error);
            });
        });
    });

//GET ALL CURRENT SETTINGS
router.get('/getSettings', function(req, res, next){
        Settings.findAll({}).then(function(response) {
            res.send(response);
        })
});

//GRAB ALL EMAILS
router.get('/list', function(req, res, next){
    Users.findAll({
        attributes: ['name', 'email', 'phonenumber']
    }).then(function(response){
        res.send(response);
    })
});

//GRAB ALL RESERVATIONS
router.get('/listReservations', function(req, res, next){
    Reservations.findAll({
    }).then(function(response){
        res.send(response);
    })
});

//DELETE ACCOUNT
router.get('/delete/:email?', function(req, res, next) {
    var userEmail = req.params.email;
    Reservations.destroy({
        where: {
            email: userEmail
        }
    });

    Users.destroy({
        where: {
            email: userEmail
        }
    }).then(function (response) {
        res.send(200);
    });
});

//BOOK A FULL HOUR
router.post('/fullHour', function(req, res, next){
    console.log(req.body);
    var newReservation = req.body;
    var quarterList = [0, 15, 30, 45];

    for(var i = 0; i < quarterList.length; i++) {
        var newDatetime = moment(req.body.datetime).set('minute', quarterList[i]);
        console.log(newDatetime);
        Reservations.build({
            name: newReservation.name,
            email: newReservation.email,
            phonenumber: newReservation.phonenumber,
            adultnumber: 0,
            childnumber: 0,
            datetime: newDatetime,
            notes: newReservation.notes,
            numslots: 5,
            reservation: true
        }).save().then(function(){
            res.send(200);
        });
    }
});

module.exports = router;

