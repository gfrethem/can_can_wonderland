///**
// * Created by Liz on 11/5/15.
// */
//
//UserSchema.pre('save', function(next){
//    var user = this;
//
////only hash the password if it has been modified (or is new)
//    if (!user.isModified('password')) return next();
////generate a salt
//    bcrypt.genSalt(SALT_WORK_FACTORY, function(err,salt) {
//        if (err) return next(err);
////hash the password a long with our new salt
//        bcrypt.hash(user.password, salt, function (err, hash) {
//            if (err) return next(err);
////override the clear text password with the hashed one
//            user.password = hash;
//            next();
//        })
//    });
//});
//
//UserSchema.methods.comparePassword = function(candidatePassword, cb){
//    bcrypt.compare(candidatePassword, this.password, function(err, isMatch)
//    {
//        if(err) return cb(err);
//        cb(null, isMatch);
//    })
//};
//
//
//
//
////THIS ROUTE IS FOR THE FORM/////
//var express = require('express');
//var router = express.Router();
//var passport = require('passport');
//var path = require ('path');
//
///* GET page. */
//router.get('/', function(req, res, next) {
//    res.sendFile(path.resolve(__dirname, '../public/views/index.html'));
//});
//
//router.post('/', passport.authenticate('local', {
//    successRedirect: '/users/home',
//    failureRedirect: '/'
//}));
//
//module.exports = router;
//
//
////THIS ROUTE IS FOR THE REGISTRATION FORM/////
//var express = require('express');
//var router = express.Router();
//var passport = require('passport');
//var path = require('path');
//var Users = require('../../models/user');
//
//router.get('/registerLanding', function(req, res, next){
//    res.sendFile(path.join(__dirname, '../public/views/registerLanding.html'));
//});
//
//router.post('/', function(req, res, next){
//    Users.create(req.body, function(err, post){
//        if (err)
//            next(err);
//        else
//            res.redirect('register/registerLanding');
//    });
//});
//
//module.exports = router;
//
////DON'T FORGET TO ADD ROUTES AND CHANGE NAMES!!!!!!!
//
//var register = require('./routes/register');
//
//app.use('/register', register);
//
////Goes in users.js
//router.get('/', function(req, res, next) {
//    res.json(req.isAuthenticated());
//});
<<<<<<< HEAD

=======
//
>>>>>>> 4ecbc7826f5fa8f5fc987a567a7bdaa4c4f6bad4
