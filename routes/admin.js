/**
 * Created by Liz on 11/9/15.
 */

var express = require('express');
var router = express.Router();
//var Sequelize = require('sequelize');
var models = require('../models');
var Settings = models.Settings;

//LOGIN

//POPULATE CALENDAR

//CHANGE INFO (HOURS, PRICES, SPECIAL MESSAGE)

//router.put('/settings', function(req, res, next) {
//    var newSetting = req.body;
//
//    Settings.save({
//        adultprice:newSetting.adultprice,
//        childprice:newSetting.childprice,
//        walkuptimeslots:newSetting.walkuptimeslots,
//        onlinerestimeslots:newSetting.onlinerestimeslots,
//        minperslot:newSetting.minperslot,
//        maxperslot:newSetting.maxperslot,
//        mopen:newSetting.mopen
//
//    }).then(function () {})
//});

router.get('/settings', function(req, res, next){
    Settings.find({}).then(function(res)
    {console.log(res)})

});

//STATS

module.exports = router;