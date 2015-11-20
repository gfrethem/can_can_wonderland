var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

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
    //    freezeTableName: true // Model tableName will be the same as the model name
    //}, {
        hooks: {
            beforeCreate: function(user, options, next) {

                if(user.password == user._previousDataValues.password) return next();

                bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
                    if(err) return next(err);

                    //hash the password along with our new salt
                    bcrypt.hash(user.password, salt, function(err, hash){
                        if (err) return next(err);

                        //override the clear text password
                        user.password = hash;
                        next();
                    });
                });
            }
        }
    });
};
