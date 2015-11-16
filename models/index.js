/**
 * Created by Dave on 11/10/15.
 */
var Sequelize = require('sequelize');
var sequelize = new Sequelize('mysql://gfrethem_cancan:P!nk69@jackswastedlife.org:3306/gfrethem_cancan', {
    define: {
        timestamps: false // true by default
    },
    engine: 'MYISAM'
});

var models = [
    'Reservation',
    'Setting',
    'User'
];

models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});

//(function(m) {
//    m.Reservation.belongsTo(m.User);
//    m.User.hasMany(m.Reservation);
//})(module.exports);

module.exports.sequelize = sequelize;
