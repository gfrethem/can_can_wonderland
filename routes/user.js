/**
 * Created by Dave on 11/9/15.
 */
var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;

//GET A USER
router.get('/user', function(req, res, next){
    User.findOne({
        where: {
            fname: 'Liz'
        }
    }).then(function(response){
        console.log(response);
        res.send(200);
    });
});
//DELETE ACCOUNT

//CONFIRM LOGIN INFO / REGISTRATION INFO / FACEBOOK INFO

//LOGIN / REGISTER / FACEBOOK LOGIN


module.exports = router;