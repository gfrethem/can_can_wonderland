/**
 * Created by Liz on 11/9/15.
 */

var express = require('express');
var router = express.Router();
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
        attributes: ['email']
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
module.exports = router;

