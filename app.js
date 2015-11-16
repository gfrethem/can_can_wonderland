//REQUIRED LIBRARIES
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
//var Sequelize = require('sequelize');

// SEQUELIZE
var models = require("./models");
var User = models.User;

//REQUIRE PASSPORT, etc --Liz
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

//REQUIRED ROUTES
var index = require('./routes/index');
var user = require('./routes/user');
var reservation = require('./routes/reservation');
var register = require('./routes/register');
var admin = require('./routes/admin');
var login = require('./routes/login');
var confirmReservation = require('./routes/confirmReservation');
var userControl = require('./routes/userControl');

var app = express();

app.use(express.static(path.join(__dirname, '/public')));

var server = app.listen(3000, function () {
    var port = server.address().port;

    console.log('Listening on port: ', port);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



//USE SESSION --Liz
app.use(session({
    secret: 'secret',
    key: 'user',
    resave: 'true',
    saveUninitialized: false,
    cookie: {maxAge: null, secure: false}
}));

//USE PASSPORT --Liz
app.use(passport.initialize());
app.use(passport.session());

//PASSPORT USE --Liz
passport.use('local', new localStrategy({passReqToCallback: true, usernameField: 'email'},
    function (req, email, password, done) {
        console.log('Passport Start');
        console.log(email, password);
        User.find({
            where: {
                'email': email
            }
        }).then(function (user) {
            if (user == null) {
                return done(null, false, {message: 'Incorrect credentials.'})
            }

            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (err) return console.log(err);
                if (isMatch) {
                    return done(null, user);
                } else {
                    done(null, false, {message: 'Incorrect username or password'})

                }
            })
        })
    }));



passport.serializeUser(function (user, done) {
    done(null, user.id)
});

passport.deserializeUser(function (id, done) {
    User.find({
        where: {
            'id': id
        }
    }).then(function (user) {
        if (user == null) {
            done(new Error('Wrong user id.'))
        }

        done(null, user)
    })
});


//ROUTES

app.use('/', index);
app.use('/user', user);
app.use('/reservation', reservation);
app.use('/register', register);
app.use('/settings', admin);
app.use('/login', login);
app.use('/confirmReservation', confirmReservation);
app.use('/userControl', userControl);

module.exports = app;