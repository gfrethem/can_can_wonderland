/**
 * Created by Dave on 11/10/15.
 */
var serverSettings = require('../serverSettings');
var Sequelize = require('sequelize');
var mySQLConnectionString = "mysql://" +
    serverSettings.mySQLAuth.userName + ":" +
    serverSettings.mySQLAuth.password + "@" +
    serverSettings.mySQLAuth.serverAddress + ":" +
    serverSettings.mySQLAuth.serverPort + "/" +
    serverSettings.mySQLAuth.dbName;

console.log(mySQLConnectionString);

var sequelize = new Sequelize(mySQLConnectionString, {
    define: {
        timestamps: false // true by default
    },
    engine: 'MYISAM'
});

//var sequelize = new Sequelize('mysql://gfrethem_cancan:P!nk69@jackswastedlife.org:3306/gfrethem_cancan', {
//    define: {
//        timestamps: false // true by default
//    },
//    engine: 'MYISAM'
//});

var models = [
    'Reservation',
    'Setting',
    'User'
];

models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});

module.exports.sequelize = sequelize;
