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
var FacebookStrategy = require('passport-facebook').Strategy;
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
var info = require('./routes/info');
var customerCalendar = require('./routes/customerCalendar');
var guests = require('./routes/guests');

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


// =========================================================================
// FACEBOOK ================================================================
// =========================================================================
var configAuth = require('./auth');

passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        enableProof:true,
        profileFields: ["emails", "displayName"]

    },

    // facebook will send back the token and profile
    function (token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function () {

            // find the user in the database based on their facebook id
            User.findOne({'faceid': profile.id}, function (err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser = new User();

                    // set all of the facebook information in our user model
                    newUser.faceid = profile.id; // set the users facebook id
                    newUser.facetoken = token; // we will save the token that facebook provides to the user
                    newUser.name = profile.displayName; // look at the passport user profile to see how names are returned
                    newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                    // save our user to the database
                    newUser.save(function (err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });

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


// =====================================
// FACEBOOK ROUTES =====================
// =====================================
// route for facebook authentication and login
app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/confirmReservation',
        failureRedirect : '/login'
    })
);


//ROUTES

app.use('/', index);
app.use('/user', user);
app.use('/reservation', reservation);
app.use('/register', register);
app.use('/settings', admin);
app.use('/login', login);
app.use('/confirmReservation', confirmReservation);
app.use('/userControl', userControl);
app.use('/info', info);
app.use('/customerCalendar', customerCalendar);
app.use('/guests', guests);

//require the Twilio module and create a REST client
var ACCOUNT_SID = 'ACa191532f90a93e915f16da74ef789a7a';
var AUTH_TOKEN = 'e9ccd52f2d96b3801435c108ca0470ba';

var client = require('twilio')('ACa191532f90a93e915f16da74ef789a7a', 'e9ccd52f2d96b3801435c108ca0470ba');

// Uncomment below to send SMS

////Send an SMS text message
//client.sendMessage({
//
//    to:'+16513384912', // Any number Twilio can deliver to
//    from: '+16513831380', // A number you bought from Twilio and can use for outbound communication
//    body: 'Because we can can can!' // body of the SMS message
//
//}, function(err, responseData) { //this function is executed when a response is received from Twilio
//
//    if (!err) { // "err" is an error received during the request, if any
//
//        // "responseData" is a JavaScript object containing data received from Twilio.
//        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
//        // http://www.twilio.com/docs/api/rest/sending-sms#example-1
//
//        console.log(responseData.from); // outputs "+14506667788"
//        console.log(responseData.body); // outputs "word to your mother."
//
//    }
//});

module.exports = app;