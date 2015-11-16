/**
 * Created by gfrethem on 11/12/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next){
    if (!req.user) {
        res.redirect('/login');
    } else
        res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

module.exports = router;