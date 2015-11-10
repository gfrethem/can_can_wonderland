/**
 * Created by Liz on 11/9/15.
 */
var express = require('express');
var router = express.Router();
var models = require('../')

//GET A DATE
router.get('/getDate/:date?', function(req, res, next) {
    var date = req.params.date;
    var nextDate = date.setHours(23).setMinutes(59);

    Reservations.findAll({
        where: {
            datetime: {
                $between: [date, nextDate]
            }
        }
    }).success(function(date) {
        res.send(date)
    });
});

//CREATE A NEW RESERVATION
router.post('/makeReservation', function(req, res, next){
    var newReservation = req.body;

    Reservations.sync().then(function () {

        return User.create({
            firstName: 'John',
            lastName: 'Hancock'
        });
    });
});


//CANCEL OR CHANGE RESERVATION




module.exports = router;