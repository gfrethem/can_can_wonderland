/**
 * Created by gfrethem on 11/12/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

router.get('/', function(req, res, next){
    res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/confirmReservation',
    failureRedirect: '/register'
    //failureFlash: true
}));

module.exports = router;