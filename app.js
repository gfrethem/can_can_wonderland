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

var app = express();

app.use(express.static(path.join(__dirname, '/public')));

var server = app.listen(3000, function () {
    var port = server.address().port;

    console.log('Listening on port: ', port);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//USE PASSPORT --Liz
app.use(passport.initialize());
app.use(passport.session());

//USE SESSION --Liz
app.use(session({
    secret: 'secret',
    key: 'user',
    resave: 'true',
    saveUninitialized: false,
    cookie: {maxAge: null, secure: false}
}));

//PASSPORT USE --Liz
passport.use(new localStrategy(
    function (username, password, done) {
        Model.User.findOne({
            where: {
                'username': username
            }
        }).then(function (user) {
            if (user == null) {
                return done(null, false, {message: 'Incorrect credentials.'})
            }

            var hashedPassword = bcrypt.hashSync(password, user.salt);

            if (user.password === hashedPassword) {
                return done(null, user)
            }

            return done(null, false, {message: 'Incorrect credentials.'})
        })
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id)
});

passport.deserializeUser(function (id, done) {
    Model.User.findOne({
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

module.exports = app;