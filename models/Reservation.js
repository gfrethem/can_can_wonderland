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
            noshow: {
                type: DataTypes.BOOLEAN // Defaults to True
            },
            walkup: {
                type: DataTypes.BOOLEAN // Walkup Vs. Online - Defaults to True
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
