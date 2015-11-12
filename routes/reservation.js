/**
 * Created by Liz on 11/9/15.
 */
var express = require('express');
var router = express.Router();
//var Sequelize = require('sequelize');
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
        console.log(response);
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

//UPDATE THE NO-SHOW FIELD
router.put('/checkin/:id?', function(req, res, next) {
    var resId = req.params.id;
    Reservation.find({
        where: {
            id: resId
        }
    }).then(function (response) {
        response.noshow = false;
        response.save()
    }).then(function (response) {
        res.send(200);
    });
});


//POPULATE THE CALENDAR
router.get('/getCalendar/:date?', function(req, res, next) {
    var date = moment(req.params.date).format('YYYY-MM-DD HH:mm:ss.SSSS');
    var nextDate = moment(date).hour(23).minute(59).format('YYYY-MM-DD HH:mm:ss.SSSS');
    var reservations = [];
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
        remainingSlots : 3,
        reservations: []
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
    });

    //SWITCH TO GET OPEN AND CLOSE HOURS
    Settings.findAll({}).then(function(response){
        switch(moment(date).day()){
            case 1:
                openHours = moment(response[0].mopen).get('hour');
                closeHours = moment(response[0].mclose).get('hour');
                break;
            case 2:
                openHours = moment(response[0].tuopen).get('hour');
                closeHours = moment(response[0].tuclose).get('hour');
                break;
            case 3:
                openHours = moment(response[0].wopen).get('hour');
                closeHours = moment(response[0].wclose).get('hour');
                break;
            case 4:
                openHours = moment(response[0].thopen).get('hour');
                closeHours = moment(response[0].thclose).get('hour');
                break;
            case 5:
                openHours = moment(response[0].fopen).get('hour');
                closeHours = moment(response[0].fclose).get('hour');
                break;
            case 6:
                openHours = moment(response[0].saopen).get('hour');
                closeHours = moment(response[0].saclose).get('hour');
                break;
            case 7:
                openHours = moment(response[0].suopen).get('hour');
                closeHours = moment(response[0].suclose).get('hour');
                break;
            default :
                console.log('failed to find day of week');
        }
        console.log(openHours);
        console.log(closeHours);
    }).then(function(){
//FIRST CHECK IF CLOSED, IF NOT
//GET ALL HOURS OF OPERATION IN AN ARRAY
        if((closeHours - openHours) == 0){
            res.send("Closed");
            next();
        }else {
            while (openHours <= closeHours) {
                operationHours.push(openHours);
                openHours++;
            }
        }
//BUILD MASTER OBJECT TO BE SENT TO CLIENT
        for(var i = 0; i< operationHours.length; i++){

            //SET CURRENT HOUR
            hourObject.hour = operationHours[i] + ":00";

            for(var it = 0; it < quarterHours.length; it++){

                //FIND THE CURRENT QUARTER HOUR TO MATCH WITH RESERVATIONS
                var currentTime = operationHours[i] + quarterHours[it];
                //SET CURRENT QUARTER HOUR
                quarterObject.quarter = currentTime;

                for(var iter = 0; iter < reservations.length; iter++){
                    //GET DATETIME FOR RESERVATION AND CONVERT TO BE COMPARED TO TIME
                    var resTime = moment(reservations[iter].datetime).format('HH:mm');
                    var currentReservation = reservations[iter];
                    //PUSH ALL MATCHING RESERVATION TIMES TO THE CURRENT QUARTER HOUR AND UPDATE SLOT TOTALS
                    if(resTime === currentTime){
                        reservations.splice(iter, 1);
                        hourObject.totalSlotsRemaining -= currentReservation.numslots;
                        quarterObject.remainingSlots -= currentReservation.numslots;
                        quarterObject.reservations.push(currentReservation);
                    }
                }
                //PUSH QUARTER HOUR OBJECT TO FULL HOUR OBJECT
                hourObject.quarters.push(quarterObject);
                //REINITIALIZE REMAINING SLOTS FOR QUARTER HOUR
                quarterObject.remainingSlots = 3;
            }
            //PUSH THE FULL HOUR OBJECT TO CURRENT DATE ARRAY
            currentDate.push(hourObject);
            //REINITIALIZE REMAINING SLOTS FOR WHOLE HOUR
            hourObject.totalSlotsRemaining = 20;
        }
    }).then(function(){
        res.send(currentDate);
    });
});
//CHANGE RESERVATION - STRETCH GOAL!




module.exports = router;