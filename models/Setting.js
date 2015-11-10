/**
 * Created by Dave on 11/10/15.
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('settings', {
        adultprice: {
            type: DataTypes.INTEGER
        },
        childprice: {
            type: DataTypes.INTEGER
        },
        walkuptimeslots: {
            type: DataTypes.INTEGER
        },
        onlinerestimeslots: {
            type: DataTypes.INTEGER
        },
        minperslot: {
            type: DataTypes.INTEGER
        },
        maxperslot: {
            type: DataTypes.INTEGER
        },
        mopen: {
            type: DataTypes.TIME
        },
        mclose: {
            type: DataTypes.TIME
        },
        tuopen: {
            type: DataTypes.TIME
        },
        tuclose: {
            type: DataTypes.TIME
        },
        wopen: {
            type: DataTypes.TIME
        },
        wclose: {
            type: DataTypes.TIME
        },
        thopen: {
            type: DataTypes.TIME
        },
        thclose: {
            type: DataTypes.TIME
        },
        fopen: {
            type: DataTypes.TIME
        },
        fclose: {
            type: DataTypes.TIME
        },
        saopen: {
            type: DataTypes.TIME
        },
        saclose: {
            type: DataTypes.TIME
        },
        suopen: {
            type: DataTypes.TIME
        },
        suclose: {
            type: DataTypes.TIME
        },
        specialmessage: {
            type: DataTypes.TEXT
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });
}

