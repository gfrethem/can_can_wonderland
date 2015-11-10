//REQUIRED LIBRARIES
var express = require('express');
var path = require('path');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('mysql://gfrethem_cancan:P!nk69@jackswastedlife.org:3306/gfrethem_cancan', {
    define: {
        timestamps: false // true by default
    },
    engine: 'MYISAM'
});


//REQUIRE PASSPORT, etc --Liz
//var passport = require('passport');
//var session = require('express-session');
//var localStrategy = require('localStrategy');
//WE DON"T KNOW HOW TO HANDLE THIS YET // MONGOOSE STUFF
//var User = require('../models/user');

//REQUIRED ROUTES
var index = require('./routes/index');

var app = express();

app.use(express.static(path.join(__dirname, '/public')));

var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('Listening on port: ', port);
});

////USE PASSPORT --Liz
//app.use(passport.initialize());
//app.use(passport.session());
//
////USE SESSION --Liz
//app.use(session({
//    secret:'secret',
//    key:'user',
//    resave:'true',
//    saveUninitialized: false,
//    cookie: {maxAge: null, secure:false}
//}));
//
////PASSPORT USE --Liz
//passport.use('local', new localStrategy({
//        passReqToCallback:true,
//        usernameField:'username',
//        passwordField:'password'},
//    function(req, username, password, done) {
//
//        User.findOne({ username: username}, function(err, user){
//            if (err) throw err;
//            if (!user)
//                return done (null, false, {message: 'This message is crazy.'});
//            //test matching passwords
//            user.comparePassword(password, function(err, isMatch){
//                if (err) throw err;
//                if(isMatch)
//                    return done(null, user);
//                else
//                    done(null, false, { message:'This message is cray cray.'
//                    });
//            });
//        });
//    }));
//
//passport.serializeUser(function(user, done){
//    done(null, user.id);
//});
//
//passport.deserializeUser(function(id, callback){
//    User.findById(id, function(err, user){
//        if(err) callback(err);
//        callback(null, user)
//    })
//});

/////////////////

app.use('/', index);


module.exports = app;