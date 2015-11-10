/**
 * Created by Dave on 11/10/15.
 */
var Sequelize = require('sequelize');

var User = sequelize.define('users', {
    firstName: {
        type: Sequelize.STRING,
        field: 'fname' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    lastName: {
        type: Sequelize.STRING,
        field: 'lname'
    },
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    phonenumber: {
        type: Sequelize.STRING
    },
    facetoken: {
        type: Sequelize.STRING
    },
    faceid: {
        type: Sequelize.INTEGER
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = User;