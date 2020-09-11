const { register } = require('./register');
const { create } = require('./create');
const { type } = require('./type');

const parkingRoute = {};
parkingRoute.register = register;
parkingRoute.create = create;
parkingRoute.type = type;

module.exports = parkingRoute;