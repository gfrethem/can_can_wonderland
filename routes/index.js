var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next){
    res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.get('/admin', function(req, res, next){
    if (!req.user) {
        res.redirect('/login');
    } else if(req.user.email == 'admin') {
        res.sendFile(path.join(__dirname, '../public/views/adminView/adminIndex.html'));
    } else {
        res.send('Unauthorized');
    }
});

router.get('/frontdesk', function(req, res, next){
    if (!req.user) {
        res.redirect('/login');
    } else if(req.user.email == 'frontdesk') {
        res.sendFile(path.join(__dirname, '../public/views/registerView/calendar.html'));
    } else {
        res.send('Unauthorized');
    }
});

router.get('/userControl', function(req, res, next){
    res.sendFile(path.join(__dirname, '../public/views/customerView/usercontrol.html'));
});

module.exports = router;