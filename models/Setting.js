/**
 * Created by Dave on 11/10/15.
 */
var Sequelize = require('sequelize');

var Setting = sequelize.define('settings', {
    adultprice: {
        type: Sequelize.INTEGER
    },
    childprice: {
        type: Sequelize.INTEGER
    },
    walkuptimeslots: {
        type: Sequelize.INTEGER
    },
    onlinerestimeslots: {
        type: Sequelize.INTEGER
    },
    minperslot: {
        type: Sequelize.INTEGER
    },
    maxperslot: {
        type: Sequelize.INTEGER
    },
    mopen: {
        type: Sequelize.TIME
    },
    mclose: {
        type: Sequelize.TIME
    },
    tuopen: {
        type: Sequelize.TIME
    },
    tuclose: {
        type: Sequelize.TIME
    },
    wopen: {
        type: Sequelize.TIME
    },
    wclose: {
        type: Sequelize.TIME
    },
    thopen: {
        type: Sequelize.TIME
    },
    thclose: {
        type: Sequelize.TIME
    },
    fopen: {
        type: Sequelize.TIME
    },
    fclose: {
        type: Sequelize.TIME
    },
    saopen: {
        type: Sequelize.TIME
    },
    saclose: {
        type: Sequelize.TIME
    },
    suopen: {
        type: Sequelize.TIME
    },
    suclose: {
        type: Sequelize.TIME
    },
    specialmessage: {
        type: Sequelize.TEXT
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = Setting;