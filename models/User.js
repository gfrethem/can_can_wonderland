module.exports = function(sequelize, DataTypes) {
    return sequelize.define('users', {
        name: {
            type: DataTypes.STRING
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
