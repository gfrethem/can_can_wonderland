/**
 * Created by Liz on 11/9/15.
 */
var express = require('express');
var router = express.Router();
var moment = require('moment');
var models = require('../models');
var Reservation = models.Reservation;
var Settings = models.Setting;


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
        res.send(200);
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
            name: newReservation.name,
            email: newReservation.email,
            phonenumber: newReservation.phonenumber,
            adultnumber: newReservation.adultnumber,
            childnumber: newReservation.childnumber,
            datetime: newReservation.datetime,
            notes: newReservation.notes,
            numslots: newReservation.numslots,
            reservation: newReservation.reservation
        })
        .save()
        .then(function(response) {
            res.redirect('/userControl');
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

//UPDATE THE NO-SHOW FIELD
router.put('/checkin/:id?', function(req, res, next) {
    var resId = req.params.id;
    Reservation.find({
        where: {
            id: resId
        }
    }).then(function (response) {
        response.checkedin = !response.checkedin;
        response.save()
    }).then(function (response) {
        res.send(200);
    });
});

//POPULATE THE CALENDAR
router.get('/getCalendar/:date?', function(req, res, next) {
    var date = moment(req.params.date).hour(6).format('YYYY-MM-DD HH:mm');
    var nextDate = moment(date).hour(29).minute(59).format('YYYY-MM-DD HH:mm');
    var reservations =[];
    var currentDate = [];
    var openHours;
    var closeHours;
    var operationHours =[];
    var quarterHours = ['00', '15', '30', '45'];
    var hourObject = {
        hour: 0,
        quarters: [],
        totalSlotsRemaining: 20
    };
    var quarterObject = {
        quarter: "",
        remainingSlots : 5,
        reservations: []
    };
    var emptyReservation = {
        email: "",
        phonenumber: "",
        name: "",
        adultnumber: 0,
        childnumber: 0,
        noshow: true,
        walkup: false,
        notes: "",
        numslots: 0,
    };
    //GETS ALL RESERVATIONS FOR CERTAIN DAY
    Reservation.findAll({
        where: {
            datetime: {
                $between: [date, nextDate]
            }
        }
    }).then(function(response) {
        reservations = response;
    }).then(function() {

        //SWITCH TO GET OPEN AND CLOSE HOURS
        Settings.findAll({}).then(function (response) {
            switch (moment(date).day()) {
                case 1:
                    openHours = response[0].mopen.substring(0, 2);
                    closeHours = response[0].mclose.substring(0, 2);
                    break;
                case 2:
                    openHours = response[0].tuopen.substring(0, 2);
                    closeHours = response[0].tuclose.substring(0, 2);
                    break;
                case 3:
                    openHours = response[0].wopen.substring(0, 2);
                    closeHours = response[0].wclose.substring(0, 2);
                    break;
                case 4:
                    openHours = response[0].thopen.substring(0, 2);
                    closeHours = response[0].thclose.substring(0, 2);
                    break;
                case 5:
                    openHours = response[0].fopen.substring(0, 2);
                    closeHours = response[0].fclose.substring(0, 2);
                    break;
                case 6:
                    openHours = response[0].saopen.substring(0, 2);
                    closeHours = response[0].saclose.substring(0, 2);
                    break;
                case 0:
                    openHours = response[0].suopen.substring(0, 2);
                    closeHours = response[0].suclose.substring(0, 2);
                    break;
                default :
                    console.log('failed to find day of week');
            }
        }).then(function () {
//FIRST CHECK IF CLOSED, IF NOT
//GET ALL HOURS OF OPERATION IN AN ARRAY
            if ((closeHours - openHours) == 0) {
                res.send("Closed");
                next();
            } else {
                while (openHours < closeHours) {
                    operationHours.push(parseInt(openHours));
                    openHours++;
                }
            }
//BUILD MASTER OBJECT TO BE SENT TO CLIENT
            for (var i = 0; i < operationHours.length; i++) {

                //SET CURRENT HOUR
                hourObject.hour = moment().set('hour', operationHours[i]).set('minute', 0).format('h:mm A');

                for (var it = 0; it < quarterHours.length; it++) {

                    //FIND THE CURRENT QUARTER HOUR
                    var currentTime = operationHours[i] + ":" + quarterHours[it];
                    var hour = currentTime.substring(0,2);
                    var minute = currentTime.substring(3,5);
                    var formatTime = moment().set('hour', hour).set('minute', minute).format('h:mm A');
                    //SET CURRENT QUARTER HOUR
                    quarterObject.quarter = formatTime;

                    //FILL RESERVATIONS FOR QUARTER HOUR WITH EMPTY RESERVATIONS
                    var iterator = 0;
                    while(iterator < 5){
                        quarterObject.reservations.push(emptyReservation);
                        iterator++;
                    }
                    hourObject.quarters.push(quarterObject);
                    //REINITIALIZE QUARTER HOUR OBJECT
                    quarterObject = {
                        quarter: "",
                        remainingSlots : 5,
                        reservations: []
                    };
                }
                //PUSH THE FULL HOUR OBJECT TO CURRENT DATE ARRAY
                currentDate.push(hourObject);
                hourObject = {
                    hour: 0,
                    quarters: [],
                    totalSlotsRemaining: 20
                };
            }

            for (var iter = 0; iter < reservations.length; iter++) {
                //GET DATETIME FOR RESERVATION AND CONVERT TO BE COMPARED TO TIME
                var resTime = moment(reservations[iter].datetime).format('h:mm A');
                if(resTime.length === 7){
                    var resTimeHour = resTime.substring(0,1) + ":00 " + resTime.substring(5,7);
                } else {
                    resTimeHour = resTime.substring(0,2) + ":00 " + resTime.substring(6,8);
                }
                var currentReservation = reservations[iter].dataValues;
                //FIND MATCHING TIME FOR RESERVATION AND PUSH IT TO THE CURRENT QUARTER HOUR AND UPDATE SLOT TOTALS
                for(var i = 0; i < currentDate.length; i++){
                    if(currentDate[i].hour === resTimeHour){
                        for(var it = 0; it < currentDate[i].quarters.length; it++){
                            if(currentDate[i].quarters[it].quarter === resTime){
                                currentDate[i].totalSlotsRemaining -= currentReservation.numslots;
                                currentDate[i].quarters[it].remainingSlots -= currentReservation.numslots;
                                currentDate[i].quarters[it].reservations.push(currentReservation);

                                //REMOVE EMPTY RESERVATIONS FROM THE LIST EQUAL TO SLOTS TAKEN UP BY THE RESERVATION
                                currentDate[i].quarters[it].reservations.splice(0, currentReservation.numslots);
                            }
                        }
                    }
                }
            }
        }).then(function () {
            res.send(currentDate);
        });
    });
});

module.exports = router;