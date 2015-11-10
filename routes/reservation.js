/**
 * Created by Liz on 11/9/15.
 */
var express = require('express');
var router = express.Router();
//var Sequelize = require('sequelize');
var moment = require('moment');
var models = require('../models');
var Reservation = models.Reservation;


//GET ALL RESERVATIONS FOR A CERTAIN DATE
router.get('/getDate/:date?', function(req, res, next) {
    var date = moment(req.params.date).format('YYYY-MM-DD HH:mm:ss.SSSS');
    var nextDate = moment(date).hour(23).minute(59).format('YYYY-MM-DD HH:mm:ss.SSSS');

    Reservation.findAll({
        where: {
            datetime: {
                $between: [date, nextDate]
            }
        }
    }).then(function(response) {
        console.log(response)
    });
});

//GET ALL RESERVATIONS TIED TO A USER
router.get('/getReservations/:email?', function(req, res, next){
   var userEmail = req.params.email;

    Reservation.findAll({
        where:{
            email: userEmail
        }
    }).then(function(response){
        res.send(response);
    })
});

//CREATE A NEW RESERVATION
router.post('/makeReservation', function(req, res, next){
    var newReservation = req.body;

    Reservation.build({
            email: newReservation.email,
            phonenumber: newReservation.phonenumber,
            adultnumber: newReservation.adultnumber,
            childnumber: newReservation.childnumber,
            noshow: newReservation.noshow,
            walkup: newReservation.walkup,
            datetime: newReservation.datetime,
            notes: newReservation.notes
        })
        .save()
        .then(function(anotherTask) {
            // you can now access the currently saved task with the variable anotherTask... nice!
            console.log(anotherTask);
            res.send(200);
        }).catch(function(error) {
            // Ooops, do some error-handling
        });
    });

//CANCEL RESERVATION
router.get('/cancelReservation/:id?', function(req, res, next) {
    var resId = req.params.id;
    Reservation.destroy({
        where: {
            id: resId
        }
    }).then(function (response) {
        res.send(200);
    });
});

//CHANGE RESERVATION - STRETCH GOAL!




module.exports = router;