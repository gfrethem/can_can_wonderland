module.exports = function(sequelize, DataTypes) {
    return sequelize.define('users', {
        firstName: {
            type: DataTypes.STRING,
            field: 'fname' // Will result in an attribute that is firstName when user facing but first_name in the database
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'lname'
        },
        password: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        phonenumber: {
            type: DataTypes.STRING
        },
        facetoken: {
            type: DataTypes.STRING
        },
        faceid: {
            type: DataTypes.INTEGER
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });
};
