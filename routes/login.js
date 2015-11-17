/**
 * Created by gfrethem on 11/12/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

router.get('/', function(req, res, next){
    res.sendFile(path.join(__dirname, '../publiac/views/index.html'));
});

router.post('/', passport.authenticate('local',
    { failureRedirect: '/login' }),
    function(req, res){
        if (req.user.email == "admin") {
            res.redirect('/admin')
        } else if (req.user.email == "frontdesk") {
            res.redirect('/frontdesk')
        } else {
            res.redirect('/confirmReservation')
        }
});


router.post('/', passport.authenticate('local', function(req, res){
    console.log(req.user);
}));


//LOGOUT
router.get('/logout', function(req, res, next){
    req.logOut();
    req.session.destroy();
});

module.exports = router;