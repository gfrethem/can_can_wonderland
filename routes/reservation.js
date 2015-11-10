/**
 * Created by Liz on 11/9/15.
 */
var express = require('express');
var router = express.Router();
//var Sequelize = require('sequelize');
var models = require('../models');
var Reservation = models.Reservation;

//GET A DATE
router.get('/getDate/:date?', function(req, res, next) {
    var date = req.params.date;
    var nextDate = date.setHours(23).setMinutes(59);

    Reservation.findAll({
        where: {
            datetime: {
                $between: [date, nextDate]
            }
        }
    }).success(function(response) {
        res.send(response)
    });
});

//CREATE A NEW RESERVATION
router.post('/makeReservation', function(req, res, next){
    var newReservation = req.body;

    Reservation.sync().then(function () {

        return Reservation.create({
            email: newReservation.email,
            phonenumber: newReservation.phonenumber,
            adultnumber: newReservation.adultnumber,
            childnumber: newReservation.childnumber,
            noshow: newReservation.noshow,
            walkup: newReservation.walkup,
            datetime: newReservation.datetime,
            notes: newReservation.notes
        });
    });
});


//CANCEL OR CHANGE RESERVATION




module.exports = router;