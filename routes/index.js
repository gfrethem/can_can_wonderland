var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next){
    res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.get('/admin', function(req, res, next){
    res.sendFile(path.join(__dirname, '../public/views/adminView/adminIndex.html'));
});

router.get('/frontdesk', function(req, res, next){
    res.sendFile(path.join(__dirname, '../public/views/registerView/calendar.html'));
});

module.exports = router;