module.exports = function(sequelize, DataTypes) {
        return sequelize.define('reservations', {
            name: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            },
            phonenumber: {
                type: DataTypes.STRING
            },
            adultnumber: {
                type: DataTypes.INTEGER
            },
            childnumber: {
                type: DataTypes.INTEGER
            },
            checkedin: {
                type: DataTypes.BOOLEAN // Defaults to False
            },
            walkup: {
                type: DataTypes.BOOLEAN // Walkup Vs. Online/Phone - Defaults to False
            },
            datetime: {
                type: DataTypes.DATE
            },
            notes: {
                type: DataTypes.TEXT
            },
            numslots: {
                type: DataTypes.INTEGER
            }
        }, {
            freezeTableName: true // Model tableName will be the same as the model name
        });
    };
