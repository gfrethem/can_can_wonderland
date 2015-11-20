module.exports = function(sequelize, DataTypes) {
        return sequelize.define('reservations', {
            name: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            },
            phonenumber: {
                type: DataTypes.INTEGER
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
            reservation: {
                type: DataTypes.BOOLEAN // Walkup Vs. In Advance - Defaults to False
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
