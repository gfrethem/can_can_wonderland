/**
 * Created by Liz on 11/9/15.
 */

var express = require('express');
var router = express.Router();
//var Sequelize = require('sequelize');
var models = require('../models');
var Settings = models.Setting;

//CHANGE INFO (HOURS, PRICES, SPECIAL MESSAGE)
router.put('/updateSettings', function(req, res, next) {
    var newSetting = req.body;
    var settingId = req.body.id;

    Settings.destroy({
        where: {
            id: settingId
        }
    }).then(function () {
        Settings.build(newSetting)
            .save()
            .then(function (anotherTask) {
                // you can now access the currently saved task with the variable anotherTask... nice!
                res.send(200);
            }).catch(function (error) {
                // Ooops, do some error-handling
                console.log(error);
            });
        });
    });

//GET ALL CURRENT SETTINGS
router.get('/getSettings', function(req, res, next){
        Settings.findAll({}).then(function(response) {
            res.send(response);
        })
});

//PULL IN PREDEFINED STATS
router.get('/stats', function(req, res, next){
    var statsObject = {};

});
//BLOCK OUT LARGE TIME SLOTS
module.exports = router;

