/**
 * Created by gfrethem on 11/17/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

module.exports = router;