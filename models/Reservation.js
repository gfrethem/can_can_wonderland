/**
 * Created by Dave on 11/10/15.
 */
var Sequelize = require('sequelize');

var Reservation = sequelize.define('reservations', {
    email: {
        type: Sequelize.STRING
    },
    phonenumber: {
        type: Sequelize.STRING
    },
    adultnumber: {
        type: Sequelize.INTEGER
    },
    childnumber: {
        type: Sequelize.INTEGER
    },
    noshow: {
        type: Sequelize.BOOLEAN // Defaults to True
    },
    walkup: {
        type: Sequelize.BOOLEAN // Walkup Vs. Online - Defaults to True
    },
    datetime: {
        type: Sequelize.DATE
    },
    notes: {
        type: Sequelize.TEXT
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = Reservation;